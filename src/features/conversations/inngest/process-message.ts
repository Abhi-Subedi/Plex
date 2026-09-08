import { createAgent, createNetwork } from "@inngest/agent-kit";

import { inngest } from "@/inngest/client";
import {
  CODING_CHAIN,
  TITLE_CHAIN,
  buildAgentModel,
  isProviderConfigured,
  isQuotaError,
  isRetryableAiError,
  type AiSlot,
} from "@/lib/ai-providers";
import { Id } from "../../../../convex/_generated/dataModel";
import { NonRetriableError } from "inngest";
import { convex } from "@/lib/convex-client";
import { api } from "../../../../convex/_generated/api";
import {
  CODING_AGENT_SYSTEM_PROMPT,
  TITLE_GENERATOR_SYSTEM_PROMPT,
} from "./constants";
import { DEFAULT_CONVERSATION_TITLE } from "../constants";
import { createReadFilesTool } from "./tools/read-files";
import { createListFilesTool } from "./tools/list-files";
import { createUpdateFileTool } from "./tools/update-file";
import { createCreateFilesTool } from "./tools/create-files";
import { createCreateFolderTool } from "./tools/create-folder";
import { createRenameFileTool } from "./tools/rename-file";
import { createDeleteFilesTool } from "./tools/delete-files";
import { createScrapeUrlsTool } from "./tools/scrape-urls";

interface MessageEvent {
  messageId: Id<"messages">;
  conversationId: Id<"conversations">;
  projectId: Id<"projects">;
  message: string;
}

export const processMessage = inngest.createFunction(
  {
    id: "process-message",
    cancelOn: [
      {
        event: "message/cancel",
        if: "event.data.messageId == async.data.messageId",
      },
    ],
    onFailure: async ({ event, step }) => {
      const { messageId } = event.data.event.data as MessageEvent;
      const internalKey = process.env.PLEX_CONVEX_INTERNAL_KEY;

      // Update the message with error content
      if (internalKey) {
        await step.run("update-message-on-failure", async () => {
          await convex.mutation(api.system.updateMessageContent, {
            internalKey,
            messageId,
            content:
              "My apologies, I encountered an error while processing your request. Let me know if you need anything else!",
          });
        });
      }
    },
  },
  {
    event: "message/sent",
  },
  async ({ event, step }) => {
    const { messageId, conversationId, projectId, message } =
      event.data as MessageEvent;

    const internalKey = process.env.PLEX_CONVEX_INTERNAL_KEY;

    if (!internalKey) {
      throw new NonRetriableError(
        "PLEX_CONVEX_INTERNAL_KEY is not configured",
      );
    }

    // TODO: Check if this is needed
    await step.sleep("wait-for-db-sync", "1s");

    // Get conversation for title generation check
    const conversation = await step.run("get-conversation", async () => {
      return await convex.query(api.system.getConversationById, {
        internalKey,
        conversationId,
      });
    });

    if (!conversation) {
      throw new NonRetriableError("Conversation not found");
    }

    // Fetch recent messages for conversation context
    const recentMessages = await step.run("get-recent-messages", async () => {
      return await convex.query(api.system.getRecentMessages, {
        internalKey,
        conversationId,
        limit: 10,
      });
    });

    // Build system prompt with conversation history (exclude the current processing message)
    let systemPrompt = CODING_AGENT_SYSTEM_PROMPT;

    // Filter out the current processing message and empty messages
    const contextMessages = recentMessages.filter(
      (msg) => msg._id !== messageId && msg.content.trim() !== "",
    );

    if (contextMessages.length > 0) {
      const historyText = contextMessages
        .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`)
        .join("\n\n");

      systemPrompt += `\n\n## Previous Conversation (for context only - do NOT repeat these responses):\n${historyText}\n\n## Current Request:\nRespond ONLY to the user's new message below. Do not repeat or reference your previous responses.`;
    }

    // Generate conversation title if it's still the default
    const shouldGenerateTitle =
      conversation.title === DEFAULT_CONVERSATION_TITLE;

    const runTitleAgent = async (slot: AiSlot) => {
      const titleAgent = createAgent({
        name: "title-generator",
        system: TITLE_GENERATOR_SYSTEM_PROMPT,
        model: buildAgentModel(slot, { temperature: 0, maxTokens: 50 }),
      });

      const { output } = await titleAgent.run(message, { step });

      const textMessage = output.find(
        (m) => m.type === "text" && m.role === "assistant",
      );

      if (textMessage?.type === "text") {
        const title =
          typeof textMessage.content === "string"
            ? textMessage.content.trim()
            : textMessage.content
                .map((c) => c.text)
                .join("")
                .trim();

        if (title) {
          await step.run("update-conversation-title", async () => {
            await convex.mutation(api.system.updateConversationTitle, {
              internalKey,
              conversationId,
              title,
            });
          });
        }
      }
    };

    if (shouldGenerateTitle) {
      // Title is cosmetic - walk the chain, skipping providers with no key,
      // and never let a title failure kill the whole reply.
      let titled = false;
      for (const slot of TITLE_CHAIN) {
        if (!isProviderConfigured(slot.provider)) continue;
        try {
          await runTitleAgent(slot);
          titled = true;
          break;
        } catch (error) {
          if (!isRetryableAiError(error)) break;
          console.warn(
            `Title via ${slot.provider}/${slot.model} failed with retryable error, trying next slot.`,
            error,
          );
        }
      }
      if (!titled) {
        console.warn("Title generation skipped: no provider succeeded.");
      }
    }

    // Runs the coding agent on the given chain slot and returns its text.
    const runCodingNetwork = async (slot: AiSlot): Promise<string> => {
      const codingAgent = createAgent({
        name: "plex",
        description: "An expert AI coding assistant",
        system: systemPrompt,
        model: buildAgentModel(slot, { temperature: 0.3, maxTokens: 8192 }),
        tools: [
          createListFilesTool({ internalKey, projectId }),
          createReadFilesTool({ internalKey }),
          createUpdateFileTool({ internalKey }),
          createCreateFilesTool({ projectId, internalKey }),
          createCreateFolderTool({ projectId, internalKey }),
          createRenameFileTool({ internalKey }),
          createDeleteFilesTool({ internalKey }),
          createScrapeUrlsTool(),
        ],
      });

      // NOTE: free-tier Gemini allows ~20 requests/day, and each iteration
      // costs at least one. Keep maxIter low so one reply can't eat the day.
      const network = createNetwork({
        name: "plex-network",
        agents: [codingAgent],
        maxIter: 10,
        router: ({ network }) => {
          const lastResult = network.state.results.at(-1);
          const hasTextResponse = lastResult?.output.some(
            (m) => m.type === "text" && m.role === "assistant",
          );
          const hasToolCalls = lastResult?.output.some(
            (m) => m.type === "tool_call",
          );

          // Models may output text AND tool calls together.
          // Only stop if there's text WITHOUT tool calls (final response)
          if (hasTextResponse && !hasToolCalls) {
            return undefined;
          }
          return codingAgent;
        },
      });

      const result = await network.run(message);

      // Extract the assistant's text response from the last agent result
      const lastResult = result.state.results.at(-1);
      const textMessage = lastResult?.output.find(
        (m) => m.type === "text" && m.role === "assistant",
      );

      if (textMessage?.type === "text") {
        return typeof textMessage.content === "string"
          ? textMessage.content
          : textMessage.content.map((c) => c.text).join("");
      }

      return "I processed your request. Let me know if you need anything else!";
    };

    // Walk the chain: Gemini first, then Groq models, then OpenRouter.
    // Each slot is attempted at most once, advancing only on retryable
    // errors. Unconfigured providers (no API key) are skipped without a call.
    let assistantResponse: string | undefined;
    let lastError: unknown;
    let sawQuota = false;

    for (const slot of CODING_CHAIN) {
      if (!isProviderConfigured(slot.provider)) continue;
      try {
        assistantResponse = await runCodingNetwork(slot);
        break;
      } catch (error) {
        lastError = error;
        if (isQuotaError(error)) sawQuota = true;
        if (!isRetryableAiError(error)) break;
        console.warn(
          `Coding via ${slot.provider}/${slot.model} failed with retryable error, trying next slot.`,
          error,
        );
      }
    }

    if (assistantResponse === undefined) {
      if (sawQuota) {
        assistantResponse =
          "All AI providers are unavailable right now (Gemini is out of its daily free quota and the Groq/OpenRouter fallbacks also failed). " +
          "Usage resets daily - check https://ai.dev/rate-limit - or add billing for higher limits. " +
          "Your project and files are safe; just send your message again later.";
      } else {
        throw lastError;
      }
    }

    // Update the assistant message with the response (this also sets status to completed)
    await step.run("update-assistant-message", async () => {
      await convex.mutation(api.system.updateMessageContent, {
        internalKey,
        messageId,
        content: assistantResponse,
      });
    });

    return { success: true, messageId, conversationId };
  },
);
