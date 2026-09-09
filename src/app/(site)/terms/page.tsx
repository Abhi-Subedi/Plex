import type { Metadata } from "next";

import { CtaBand, PageHero } from "../_components/page-blocks";

export const metadata: Metadata = {
  title: "Terms of Service - Plex",
  description: "The terms governing use of Plex.",
};

const SECTIONS: [string, string][] = [
  [
    "The service",
    "Plex provides an AI-assisted development environment: project scaffolding, code editing, live previews and GitHub sync. Features evolve and the changelog records what changed.",
  ],
  [
    "Accounts",
    "Sign-in runs through our auth provider. You are responsible for activity under your account and for keeping your credentials safe.",
  ],
  [
    "Acceptable use",
    "Do not abuse shared systems: no scraping the service itself, no circumventing quotas, no unlawful or harmful content, no infringing material in projects you import or publish.",
  ],
  [
    "Your content",
    "Your projects and prompts remain yours. You grant Plex only the rights needed to operate the service, like storing files and sending prompts to the AI providers you configured.",
  ],
  [
    "AI output",
    "Generated code may be imperfect. Review it before shipping, especially for security-sensitive paths. Provider quotas and billing follow each vendor's own terms.",
  ],
  [
    "Liability",
    "The service is provided as-is to the maximum extent permitted by law. Our liability is limited to the fees you paid in the preceding twelve months.",
  ],
  [
    "Changes",
    "Material changes to these terms will be announced in the changelog before they take effect. Continued use means acceptance.",
  ],
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        body="Plain-language terms for using Plex. Last updated September 2026."
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
      <CtaBand title="Agree and build." />
    </>
  );
}
