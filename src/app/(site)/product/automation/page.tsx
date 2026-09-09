import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand, PageHero } from "../../_components/page-blocks";
import { Shot } from "../../_components/mockups";

export const metadata: Metadata = {
  title: "Automation - Plex",
  description:
    "Inngest background workers run agent replies, GitHub import and export with retries, cancellation and live status.",
};

const CELLS: [string, string, string][] = [
  [
    "Event-driven workers",
    "Agent replies, repo imports and repo exports each run as background events with step memoization, so completed work survives retries instead of restarting.",
    "md:col-span-2",
  ],
  ["Live status", "Importing, exporting, completed, failed. The UI mirrors worker state in realtime.", ""],
  ["Cancel mid-flight", "Stop long agent runs and exports from the UI without corrupting state.", ""],
  [
    "Failure handling",
    "Every worker lands in a clean terminal state with a retry path. Failures write guidance, never stack traces, and statuses reset cleanly for the next attempt.",
    "md:col-span-2",
  ],
];

export default function AutomationPage() {
  return (
    <>
      <PageHero
        eyebrow="Product"
        title="Automation that never blocks the UI"
        body="Long work runs as background events with step memoization, retries and cancellation. The interface stays instant while workers grind."
      />

      {/* Banner */}
      <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
        <Shot
          n={10}
          title="plex / orchestration"
          alt="Plex agent orchestration fleet: coding, testing and review agents across repositories"
        />
      </section>

      {/* Asymmetric bento */}
      <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
        <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
          Built for work that outlasts a request
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {CELLS.map(([t, b, span]) => (
            <div
              key={t}
              className={`rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 md:p-6 ${span}`}
            >
              <p className="text-sm font-semibold text-zinc-100">{t}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">{b}</p>
            </div>
          ))}
        </div>
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
