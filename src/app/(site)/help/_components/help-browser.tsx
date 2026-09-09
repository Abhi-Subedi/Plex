"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Topic {
  title: string;
  body: string;
  faqs: [string, string][];
}

const TOPICS: Topic[] = [
  {
    title: "Getting started",
    body: "Install Plex and set up your first project.",
    faqs: [
      [
        "What do I need installed?",
        "Node 20.09 or newer, pnpm, and accounts for Clerk, Convex and Inngest. One AI key (Google, Groq or OpenRouter) is enough to start.",
      ],
      [
        "How do I launch everything?",
        "Three terminals: convex dev for the database, pnpm dev for the app on localhost:3000, and the Inngest dev server for background workers.",
      ],
      [
        "How do I create my first project?",
        "Sign in, press New or Ctrl+J, describe the app, and the agent scaffolds the full project before redirecting you to the IDE.",
      ],
    ],
  },
  {
    title: "AI features",
    body: "Write and review code with AI agents.",
    faqs: [
      [
        "What does the coding agent do?",
        "It plans a scaffold, writes every file with eight project tools, verifies against the file tree and summarizes. Ten iterations max per reply.",
      ],
      [
        "What are ghost suggestions?",
        "Inline completions that appear as you type across seven languages, powered by a structured-output route.",
      ],
      [
        "What is quick-edit?",
        "Select code, press Cmd+K, describe the change. URLs in the instruction are scraped for live documentation context.",
      ],
    ],
  },
  {
    title: "Customization",
    body: "Teach Plex your preferences.",
    faqs: [
      [
        "Can I change install and dev commands?",
        "Yes. Every project stores its own install and dev commands in preview settings, used by the WebContainer on boot.",
      ],
      [
        "Does Plex follow my system theme?",
        "Yes. Light and dark wordmarks plus favicons switch automatically with your operating system. There is no manual toggle.",
      ],
      [
        "Can I rename projects and files?",
        "Click any project or file name to rename inline. Exports use your chosen repository name independently.",
      ],
    ],
  },
  {
    title: "Models and usage",
    body: "Configure which AI models power your agents.",
    faqs: [
      [
        "Which models run, and in what order?",
        "Gemini 3.6 Flash first, then GPT-OSS 120B and 20B on Groq, then Gemini 3.8 Flash on OpenRouter. Titles get a lighter chain ending on a lite model.",
      ],
      [
        "What counts as usage?",
        "Each agent iteration is at least one provider request. Suggestion and quick-edit calls count as one each.",
      ],
      [
        "What happens on quota exhaustion?",
        "The chain advances automatically. If every provider is out, the conversation explains the reset instead of dumping a raw error.",
      ],
    ],
  },
  {
    title: "Security and privacy",
    body: "How Plex handles your code and data.",
    faqs: [
      [
        "Who can see my projects?",
        "Only you. Every database call checks project ownership before reading or writing.",
      ],
      [
        "Where do API keys live?",
        "Server-side only, in environment config. They never ship in client bundles or public variables.",
      ],
      [
        "Is my code used for training?",
        "Plex trains no models on your data. Prompts go only to the providers you configured, under their own policies.",
      ],
    ],
  },
  {
    title: "Account and billing",
    body: "Manage your subscription, team and payments.",
    faqs: [
      [
        "Which plan do I need?",
        "Hobby is free for trying and side projects. Individual fits daily builders, Teams fits shipping groups, Enterprise fits regulated scale.",
      ],
      [
        "How does AI billing work?",
        "Plex plans are seat-based. Model usage follows each provider's own quotas and billing, separately.",
      ],
      [
        "How do I manage my account?",
        "Sign-in, profile and GitHub connections live in your Clerk profile, reachable from the user button anywhere in the app.",
      ],
    ],
  },
  {
    title: "Integrations",
    body: "Connect your dev tools and services.",
    faqs: [
      [
        "How do I connect GitHub?",
        "Open your Clerk profile from the user button and connect GitHub. Imports and exports use that OAuth token.",
      ],
      [
        "Which AI providers can I add?",
        "Google AI Studio plus Groq plus OpenRouter keys unlock the full fallback chain. Any single key works alone.",
      ],
      [
        "What runs the background jobs?",
        "Inngest workers handle agent replies plus GitHub import and export, with retries, cancellation and live status.",
      ],
    ],
  },
  {
    title: "Troubleshooting",
    body: "Common questions and fixes.",
    faqs: [
      [
        "Project creation says the internal key is not configured. Why?",
        "The dev server started before the key existed in .env.local. Restart all three terminals and hard-refresh the browser.",
      ],
      [
        "The agent never replies. What should I check?",
        "Confirm the Inngest dev server is running and the app's Inngest endpoint answers. Then check the worker terminal for the failing step.",
      ],
      [
        "Export failed. What now?",
        "Confirm GitHub is connected, the repo name is unused, and Inngest is running. The popover offers cancel and retry.",
      ],
      [
        "Generated files look flat, like src/server.tsx. What happened?",
        "That was the old flat-name bug. Current tools resolve full relative paths into real folders. Delete the broken entries and regenerate.",
      ],
    ],
  },
];

export function HelpBrowser({ middle }: { middle: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>("Getting started");

  const q = query.trim().toLowerCase();
  const topics = useMemo(() => {
    if (!q) return TOPICS.map((t) => ({ ...t, faqs: t.faqs }));
    return TOPICS.map((t) => ({
      ...t,
      faqs: t.faqs.filter(
        ([qq, aa]) =>
          qq.toLowerCase().includes(q) ||
          aa.toLowerCase().includes(q) ||
          t.title.toLowerCase().includes(q),
      ),
    })).filter((t) => t.faqs.length > 0);
  }, [q]);

  return (
    <div>
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Can Plex review my PRs?"
          className="h-12 border-zinc-800 bg-zinc-950 pl-10 text-sm"
        />
      </div>

      {middle}

      <div className="mt-10 w-full">
        <p className="mb-3 text-xs uppercase tracking-widest text-zinc-600">
          Browse by topic
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          {topics.map((t, i) => {
            const isOpen = q ? true : open === t.title;
            return (
              <div key={t.title} className={i > 0 ? "border-t border-zinc-800/60" : ""}>
                <button
                  onClick={() => setOpen(isOpen && !q ? null : t.title)}
                  className="flex w-full items-center gap-4 bg-zinc-900/50 px-5 py-4 text-left transition-colors hover:bg-zinc-900"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-zinc-100">
                      {t.title}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-zinc-400">
                      {t.body}
                    </span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-zinc-500 transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="space-y-4 bg-zinc-950 px-5 py-5">
                    {t.faqs.map(([qq, aa]) => (
                      <div key={qq}>
                        <p className="text-sm font-medium text-zinc-100">{qq}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{aa}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {topics.length === 0 && (
            <p className="bg-zinc-900/50 px-5 py-8 text-center text-sm text-zinc-500">
              Nothing matches that search. Try fewer words.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
