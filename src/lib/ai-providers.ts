/**
 * Server-only AI provider configuration.
 *
 * Uses secret API keys (GROQ_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY).
 * NEVER import this module from client components.
 */

import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { gemini, openai } from "@inngest/agent-kit";

/** Primary provider model (Google AI Studio / Gemini API). */
export const GEMINI_MODEL_ID = "gemini-3.6-flash";

/** Fallback provider models (Groq, OpenAI-compatible). */
export const GROQ_MODEL_ID = "openai/gpt-oss-120b";
export const GROQ_SMALL_MODEL_ID = "openai/gpt-oss-20b";

/** Small fallback model for cheap tasks like title generation. */
export const GROQ_TITLE_MODEL_ID = "openai/gpt-oss-20b";

/** OpenRouter models (verified live against the OpenRouter catalog). */
export const OPENROUTER_CODING_MODEL_ID = "google/gemini-3.8-flash";
export const OPENROUTER_TITLE_MODEL_ID = "google/gemini-3.5-flash-lite";

/** Base URL for Groq's OpenAI-compatible API. */
export const GROQ_BASE_URL = "https://api.groq.com/openai/v1";

/** Base URL for OpenRouter's OpenAI-compatible API (used by the agent path). */
export const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

export type AiProvider = "gemini" | "groq" | "openrouter";

/** One attempt slot: a provider plus the exact model to try on it. */
export interface AiSlot {
  provider: AiProvider;
  model: string;
}

/**
 * Ordered attempt chain for coding/structured tasks. Each slot is tried
 * at most once, in order, advancing only on retryable errors.
 */
export const CODING_CHAIN: AiSlot[] = [
  { provider: "gemini", model: GEMINI_MODEL_ID },
  { provider: "groq", model: GROQ_MODEL_ID },
  { provider: "groq", model: GROQ_SMALL_MODEL_ID },
  { provider: "openrouter", model: OPENROUTER_CODING_MODEL_ID },
];

/** Ordered attempt chain for cheap tasks like title generation. */
export const TITLE_CHAIN: AiSlot[] = [
  { provider: "gemini", model: GEMINI_MODEL_ID },
  { provider: "groq", model: GROQ_TITLE_MODEL_ID },
  { provider: "openrouter", model: OPENROUTER_TITLE_MODEL_ID },
];

const RETRYABLE_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504, 529]);

/** Errors that must never trigger a provider fallback. */
const NON_RETRYABLE_PATTERN =
  /\b(401|403)\b|unauthorized|forbidden|invalid api key|invalid_api_key|\babort(ed)?\b|user abort|validation|invalid argument|invalid_argument/i;

/** Errors that mean "this provider can't serve the request right now, try the other one". */
const RETRYABLE_PATTERN =
  /\b(408|425|429|500|502|503|504|529)\b|rate.?limit|quota|resource.?exhausted|overloaded|over capacity|temporar(y|ily)|try again|timeout|timed out|fetch failed|network|socket|econn|etimedout|server error|bad gateway|service unavailable|gateway timeout|model.+not found|not found.+model|no longer available|model_not_found|unsupported model/i;

function getStatusCode(error: unknown): number | undefined {
  if (typeof error !== "object" || error === null) return undefined;
  const record = error as Record<string, unknown>;
  for (const key of ["statusCode", "status"]) {
    const value = record[key];
    if (typeof value === "number") return value;
  }
  return undefined;
}

function getMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  try {
    return String(error);
  } catch {
    return "";
  }
}

/**
 * Returns true when a failed Gemini call is worth retrying once on Groq:
 * rate limits / quota (429), overloaded / 5xx, timeouts / network issues,
 * or model-availability errors (retired model ID, 404).
 * Auth errors (401/403), bad-request errors (400 validation) and aborts
 * return false - Groq would fail the same way, or must not be called.
 */
export function isRetryableAiError(error: unknown): boolean {
  const status = getStatusCode(error);
  if (status === 401 || status === 403) return false;
  const message = getMessage(error);
  if (NON_RETRYABLE_PATTERN.test(message)) return false;
  if (status !== undefined && RETRYABLE_STATUS_CODES.has(status)) return true;
  return RETRYABLE_PATTERN.test(message);
}

/** True when the error is specifically a quota / rate-limit exhaustion. */
export function isQuotaError(error: unknown): boolean {
  return /429|quota|rate.?limit|resource.?exhausted/i.test(getMessage(error));
}

/** Resolves a Vercel AI SDK model for the given chain slot. */
export function resolveTextModel(slot: AiSlot) {
  switch (slot.provider) {
    case "gemini":
      return google(slot.model);
    case "groq":
      return groq(slot.model);
    case "openrouter":
      return createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY }).chat(
        slot.model,
      );
  }
}

/**
 * Runs `run` against each chain slot in order, starting with Gemini.
 * Advances to the next slot only on retryable errors (429/rate-limit/quota,
 * 5xx, timeout, retired model). Stops at the first success or the first
 * non-retryable error. Each slot is attempted at most once - no loops.
 *
 * Throws a clean Error (original attached as `cause`) when every slot fails.
 */
export async function withAiFallback<T>(
  run: (slot: AiSlot) => Promise<T>,
  chain: AiSlot[] = CODING_CHAIN,
): Promise<T> {
  let lastError: unknown;

  for (const slot of chain) {
    if (!isProviderConfigured(slot.provider)) {
      continue;
    }
    try {
      return await run(slot);
    } catch (error) {
      lastError = error;
      if (!isRetryableAiError(error)) {
        console.error(
          `withAiFallback: ${slot.provider}/${slot.model} failed with non-retryable error, stopping chain.`,
          error,
        );
        break;
      }
      console.warn(
        `withAiFallback: ${slot.provider}/${slot.model} failed with retryable error, trying next slot.`,
        error,
      );
    }
  }

  throw new Error("AI service temporarily unavailable. Please try again.", {
    cause: lastError,
  });
}

/**
 * Backwards-compatible single-fallback wrapper: Gemini first, Groq once.
 * Prefer withAiFallback for new code.
 */
export async function withGroqFallback<T>(
  run: (provider: AiProvider) => Promise<T>,
): Promise<T> {
  return withAiFallback(
    (slot) => run(slot.provider),
    CODING_CHAIN.filter((slot) => slot.provider !== "openrouter"),
  );
}

/** True when the provider has an API key configured. */
export function isProviderConfigured(provider: AiProvider): boolean {
  switch (provider) {
    case "gemini":
      return !!(
        process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY
      );
    case "groq":
      return !!process.env.GROQ_API_KEY;
    case "openrouter":
      return !!process.env.OPENROUTER_API_KEY;
  }
}

function geminiApiKey(): string | undefined {
  return (
    process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY
  );
}

/** Agent-kit model for the primary (Gemini) provider. */
export function buildGeminiAgentModel(params: {
  temperature: number;
  maxOutputTokens: number;
}) {
  return gemini({
    model: GEMINI_MODEL_ID,
    apiKey: geminiApiKey(),
    defaultParameters: {
      generationConfig: {
        temperature: params.temperature,
        maxOutputTokens: params.maxOutputTokens,
      },
    },
  });
}

/** Agent-kit model for the Groq fallback via its OpenAI-compatible endpoint. */
export function buildGroqAgentModel(
  modelId: string,
  params: { temperature: number; maxTokens: number },
) {
  return openai({
    model: modelId,
    baseUrl: GROQ_BASE_URL,
    apiKey: process.env.GROQ_API_KEY,
    defaultParameters: {
      temperature: params.temperature,
      max_completion_tokens: params.maxTokens,
    },
  });
}

/** Agent-kit model for the OpenRouter fallback via its OpenAI-compatible endpoint. */
export function buildOpenRouterAgentModel(
  modelId: string,
  params: { temperature: number; maxTokens: number },
) {
  return openai({
    model: modelId,
    baseUrl: OPENROUTER_BASE_URL,
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultParameters: {
      temperature: params.temperature,
      max_completion_tokens: params.maxTokens,
    },
  });
}

/** Builds an agent-kit model for any chain slot. */
export function buildAgentModel(
  slot: AiSlot,
  params: { temperature: number; maxTokens: number },
) {
  switch (slot.provider) {
    case "gemini":
      return buildGeminiAgentModel({
        temperature: params.temperature,
        maxOutputTokens: params.maxTokens,
      });
    case "groq":
      return buildGroqAgentModel(slot.model, params);
    case "openrouter":
      return buildOpenRouterAgentModel(slot.model, params);
  }
}
