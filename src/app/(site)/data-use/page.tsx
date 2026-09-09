import type { Metadata } from "next";

import { CtaBand, PageHero } from "../_components/page-blocks";

export const metadata: Metadata = {
  title: "Data Use - Plex",
  description: "How Plex uses prompts, files and telemetry across AI providers.",
};

const SECTIONS: [string, string][] = [
  [
    "Prompts and files",
    "To answer, the agent sends your message plus relevant project context to the active AI provider. Only files the task touches are included.",
  ],
  [
    "Provider routing",
    "Requests walk the fallback chain only when the previous provider fails with a retryable error. Successful calls never touch a second provider.",
  ],
  [
    "Training",
    "Plex does not train models on your data. Provider-side retention follows each vendor's own policy for API traffic.",
  ],
  [
    "Telemetry",
    "Anonymous reliability telemetry (error rates, latencies) guides capacity and fallback tuning. No prompt content in metrics.",
  ],
  [
    "Retention",
    "Conversations persist so threads keep context. Delete a project and its threads go with it.",
  ],
];

export default function DataUsePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Data Use"
        body="Exactly what flows where when the agent answers. Last updated September 2026."
        primary="Back to building"
      />
      <section className="mx-auto max-w-3xl px-2 pb-16 md:px-3 md:pb-24">
        <div className="space-y-3">
          {SECTIONS.map(([t, b]) => (
            <div key={t} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 md:p-6">
              <p className="text-sm font-semibold text-zinc-100">{t}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{b}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="Your data, your call." />
    </>
  );
}
