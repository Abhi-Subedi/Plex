import type { Metadata } from "next";

import { CtaBand, PageHero } from "../_components/page-blocks";

export const metadata: Metadata = {
  title: "Privacy Policy - Plex",
  description: "What Plex collects, why, and how it is protected.",
};

const SECTIONS: [string, string][] = [
  [
    "What we collect",
    "Account identity from our auth provider, project files you create or import, conversation content needed to run the agent, and operational logs for reliability.",
  ],
  [
    "How it is used",
    "To operate the service: storing projects, running the editor and preview, routing prompts to your configured AI providers, and keeping the lights on.",
  ],
  [
    "AI providers",
    "Prompts and referenced files are sent to the providers you configured (Google, Groq, OpenRouter). Their handling follows each vendor's own policy.",
  ],
  [
    "Storage",
    "Project data lives in our realtime database with per-user access checks on every call. Binary assets use managed object storage.",
  ],
  [
    "What we never do",
    "No sale of personal data, no advertising profiles, no API keys in client bundles. Secrets stay server-side.",
  ],
  [
    "Your rights",
    "Export or delete your projects anytime from the dashboard. Account deletion removes associated data subject to legal retention.",
  ],
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        body="What we collect, why we collect it, and the rights you keep. Last updated September 2026."
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
      <CtaBand title="Private by default." />
    </>
  );
}
