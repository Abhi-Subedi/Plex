import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand, PageHero } from "../../_components/page-blocks";
import { Shot } from "../../_components/mockups";

export const metadata: Metadata = {
  title: "Agent - Plex",
  description:
    "The Plex coding agent scaffolds complete runnable web apps and iterates file by file with eight project tools.",
};

const TRIO: {
  title: string;
  body: string;
  href: string;
  shot: number;
  shotTitle: string;
  alt: string;
}[] = [
  {
    title: "Tools",
    body: "List, read, update, batch-create, folder, rename and delete. The agent works your real tree with IDs, not guesses.",
    href: "/docs",
    shot: 5,
    shotTitle: "plex / task execution",
    alt: "Plex task execution: implementation plan, agent conversation, code view and terminal",
  },
  {
    title: "Knowledge",
    body: "Ten-message history, live URL scraping and full repo awareness ride along with every reply.",
    href: "/product/chat",
    shot: 2,
    shotTitle: "plex / agent",
    alt: "Plex editor with AI agent conversation, task planning and terminal output",
  },
  {
    title: "Chains",
    body: "Gemini, then Groq, then OpenRouter with per-model rotation. A quota hit just reroutes to the next provider.",
    href: "/cloud-agents",
    shot: 10,
    shotTitle: "plex / orchestration",
    alt: "Plex agent orchestration fleet: coding, testing and review agents across repositories",
  },
];

const PROOF: [string, string][] = [
  ["Full scaffolds", "package.json with scripts, framework config, entry point, styles and README. Never a loose component."],
  ["Plan then verify", "Every run ends with a fresh file listing before the summary is written."],
  ["Stack conventions", "TanStack routes, Next.js app trees and Vite shells, each following its real layout."],
  ["History aware", "The last ten messages shape every reply, so follow-ups build on real context."],
  ["Capped loops", "Ten iterations max per reply, so one message cannot burn a day of quota."],
  ["Clean failures", "Exhausted providers produce guidance, never stack traces."],
];

const HIGHLIGHTS: [string, string, string][] = [
  ["Agentic file tools", "Automatic folder scaffolding that lands nested trees on the first try.", "Agents"],
  ["Ghost plus Cmd+K", "Inline completions and selection rewrites in the editor.", "Editor"],
  ["Two-way GitHub sync", "Import any repo, export any project, free.", "Sync"],
];

export default function AgentPage() {
  return (
    <>
      <PageHero
        eyebrow="Product"
        title="The agent that builds whole apps"
        body="Describe the app in plain language. Plex plans the scaffold, writes every file into a real folder tree, verifies the result and explains what changed."
      />

      {/* Trio */}
      <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
        <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
          Extend with tools and knowledge
        </h2>
        <p className="mt-3 max-w-xl text-zinc-400">
          Give the agent your existing context and it adds real capabilities on top.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {TRIO.map((c) => (
            <div
              key={c.title}
              className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50"
            >
              <div className="p-5 pb-0">
                <p className="text-sm font-semibold text-zinc-100">{c.title}</p>
                <p className="mt-1.5 min-h-16 text-sm text-zinc-500">{c.body}</p>
                <Link
                  href={c.href}
                  className="mt-3 inline-flex items-center gap-1 text-sm text-zinc-200 hover:underline"
                >
                  Learn more <ArrowRight className="size-3.5" />
                </Link>
              </div>
              <div className="p-4">
                <Shot n={c.shot} title={c.shotTitle} alt={c.alt} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proof grid */}
      <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
        <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
          Why builders hand it the whole job
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROOF.map(([t, b]) => (
            <div key={t} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <p className="text-sm font-semibold text-zinc-100">{t}</p>
              <p className="mt-2 text-sm text-zinc-500">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights feed */}
      <section className="mx-auto max-w-4xl px-2 pb-16 md:px-3 md:pb-24">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Recent highlights
        </h2>
        <div className="mt-6 divide-y divide-zinc-800/80 border-y border-zinc-800/80">
          {HIGHLIGHTS.map(([t, b, tag]) => (
            <div key={t} className="py-5">
              <p className="text-sm font-semibold text-zinc-100">{t}</p>
              <p className="mt-1 text-sm text-zinc-500">{b}</p>
              <p className="mt-1.5 text-[11px] text-zinc-600">{tag}</p>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" asChild className="mt-4 px-0 text-zinc-300 hover:bg-transparent hover:text-zinc-100">
          <Link href="/blog">
            View more posts <ArrowRight className="size-4" />
          </Link>
        </Button>
      </section>

      {/* Changelog strip */}
      <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">Changelog</h2>
        <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Sep 8, 2026", "OpenRouter fallback chain"],
            ["Sep 8, 2026", "Groq fallback, quota-aware"],
            ["Sep 8, 2026", "Plex rename everywhere"],
            ["Sep 8, 2026", "Path-aware file tools"],
          ].map(([date, text]) => (
            <div key={text} className="bg-zinc-950 p-4">
              <p className="text-[11px] text-zinc-600">{date}</p>
              <p className="mt-1 text-sm text-zinc-300">{text}</p>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" asChild className="mt-4 px-0 text-zinc-300 hover:bg-transparent hover:text-zinc-100">
          <Link href="/changelog">
            See what is new <ArrowRight className="size-4" />
          </Link>
        </Button>
      </section>

      <CtaBand title="Try Plex now." />
    </>
  );
}
