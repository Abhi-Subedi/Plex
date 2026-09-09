import type { Metadata } from "next";

import { CtaBand, PageHero } from "../_components/page-blocks";

export const metadata: Metadata = {
  title: "Status - Plex",
  description: "Live operational status of Plex systems and providers.",
};

const SYSTEMS: [string, string][] = [
  ["App", "Operational"],
  ["Realtime sync", "Operational"],
  ["Background workers", "Operational"],
  ["Gemini API", "Operational"],
  ["Groq API", "Operational"],
  ["OpenRouter API", "Operational"],
  ["GitHub API", "Operational"],
];

export default function StatusPage() {
  return (
    <>
      <PageHero
        eyebrow="Status"
        title="All systems go"
        body="Live status for the app, realtime sync, workers and every AI provider. Automated checks feed this board."
      />
      <section className="mx-auto max-w-3xl px-2 pb-16 md:px-3 md:pb-24">
        <div className="overflow-hidden rounded-2xl border border-zinc-800">
          {SYSTEMS.map(([name, state], i) => (
            <div
              key={name}
              className={`flex items-center justify-between px-5 py-4 text-sm ${
                i > 0 ? "border-t border-zinc-800/60" : ""
              } bg-zinc-900/50`}
            >
              <span className="text-zinc-200">{name}</span>
              <span className="inline-flex items-center gap-2 text-emerald-300">
                <span className="size-2 rounded-full bg-emerald-400" />
                {state}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-zinc-600">
          Provider quotas follow each vendor&apos;s own limits and reset on their schedules.
        </p>
      </section>
      <CtaBand title="Build on a healthy platform." />
    </>
  );
}
