import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand, PageHero } from "../../_components/page-blocks";
import { Shot } from "../../_components/mockups";

export const metadata: Metadata = {
  title: "Chat - Plex",
  description:
    "A conversation sidebar with history, auto titles and cancel, wired straight into the coding agent.",
};

const VALUES: [string, string][] = [
  ["Processing states", "Placeholders flip to completed content live; cancelled runs stay marked."],
  ["Auto titles", "First message earns a short descriptive title, generated once and skipped after."],
  ["Ten-message context", "Recent history rides along so follow-ups stay grounded."],
  ["Cancel anytime", "Stop a runaway reply from the sidebar or the API."],
  ["Past threads", "Reopen earlier conversations per project from the dialog."],
  ["Quota honesty", "Exhausted providers produce a clear reset message, not a raw error dump."],
];

const HIGHLIGHTS: [string, string][] = [
  ["Ghost plus Cmd+K", "Inline completions and selection rewrites in the editor."],
  ["Two-way GitHub sync", "Import any repo, export any project, free."],
];

export default function ChatPage() {
  return (
    <>
      <PageHero
        eyebrow="Product"
        title="Chat that edits your project"
        body="Every message can read and rewrite files. Replies stream into the conversation with processing states, titles and full history."
      />

      {/* Banner visual */}
      <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
        <Shot
          n={2}
          title="plex / agent"
          alt="Plex editor with AI agent conversation, task planning and terminal output"
        />
      </section>

      {/* Two-column values */}
      <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
        <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
          Made for conversation
        </h2>
        <div className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
          {VALUES.map(([t, b]) => (
            <div key={t} className="border-l border-zinc-800 pl-5">
              <p className="text-sm font-semibold text-zinc-100">{t}</p>
              <p className="mt-1.5 text-sm text-zinc-500">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights as cards */}
      <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Recent highlights
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {HIGHLIGHTS.map(([t, b]) => (
            <div key={t} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <p className="text-sm font-semibold text-zinc-100">{t}</p>
              <p className="mt-1.5 text-sm text-zinc-500">{b}</p>
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
