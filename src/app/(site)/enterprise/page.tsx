import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ModelChainMock, Shot } from "../_components/mockups";

export const metadata: Metadata = {
  title: "Enterprise - Plex",
  description:
    "Observability, per-user workspaces and secure defaults for teams shipping with Plex.",
};

const STATS: [string, string][] = [
  ["3", "AI providers in every fallback chain"],
  ["8", "File tools on every coding agent"],
  ["7", "Editor languages with AI support"],
];

const CONTROLS: { title: string; body: string; visual: React.ReactNode; link: string; cta: string }[] = [
  {
    title: "Stay in control",
    body: "Per-user workspaces, ownership checks on every call and review gates before anything merges.",
    link: "/security",
    cta: "How isolation works",
    visual: (
      <Shot
        n={4}
        title="plex / mission control"
        alt="Plex mission control grid: task planning cards, code editor, AI agent, terminal and metrics"
      />
    ),
  },
  {
    title: "Access frontier models",
    body: "One request walks Gemini, Groq and OpenRouter in order. A quota hit just reroutes to the next provider.",
    link: "/agents/plex-ai",
    cta: "View available models",
    visual: <ModelChainMock />,
  },
  {
    title: "Ship with confidence",
    body: "Parallel agents build, test and review across repositories while leads track progress per run.",
    link: "/cloud-agents",
    cta: "Learn about fleets",
    visual: (
      <Shot
        n={10}
        title="plex / orchestration"
        alt="Plex agent orchestration fleet: coding, testing and review agents across repositories"
      />
    ),
  },
];

const SECURITY: [string, string][] = [
  ["Guided onboarding", "Workshops and docs take teams from install to first scaffold in one session."],
  ["Priority support", "Faster responses on Pro and SLA-backed help on Enterprise plans."],
  ["Per-user isolation", "Every database call checks project ownership before reading or writing."],
  ["Managed auth", "Sign-in, sessions and GitHub OAuth through a dedicated auth provider."],
  ["Server-side secrets", "Provider keys live in server config only, never in client bundles."],
  ["Tracked errors", "Client, server and worker failures flow into monitored error tracking."],
];

const TEAMS: [string, string][] = [
  ["Platform teams", "Fleet orchestration with review gates, progress tracking and clean failure states."],
  ["Product engineering", "Full scaffolds plus quick-edit for fast iteration on real features."],
  ["Frontend teams", "Ghost suggestions, live preview and streaming terminal beside the code."],
  ["Automation owners", "Background workers with retries, cancellation and live status in the UI."],
  ["Maintainers", "Import any repo, export on demand, with agent comments on review."],
  ["Solo builders", "Free start, fallback chain included, no plan gates on sync."],
];

const STORIES: { title: string; date: string; href: string }[] = [
  { title: "How Plex AI scaffolds full apps", date: "Sep 2026", href: "/agents/plex-ai" },
  { title: "Fleets that build while you review", date: "Sep 2026", href: "/cloud-agents" },
  { title: "Workers that never block the UI", date: "Sep 2026", href: "/product/automation" },
  { title: "Shipped this month in Plex", date: "Sep 2026", href: "/changelog" },
];

const FAQS: [string, string][] = [
  [
    "How do provider quotas work for teams?",
    "Each AI request walks Gemini, then Groq, then OpenRouter, stopping at the first success. Quotas and billing follow each vendor's own plan and reset on their schedule.",
  ],
  [
    "How does Plex handle large repositories?",
    "Imports stream the git tree with live progress status, binaries go to managed storage, and the explorer stays responsive because files load per project over realtime subscriptions.",
  ],
  [
    "How is our code used?",
    "Prompts plus only the files a task touches are sent to your configured providers. Plex trains no models on your data; provider retention follows each vendor's API policy.",
  ],
  [
    "What security controls exist?",
    "Managed auth with GitHub OAuth, per-user project isolation checked on every call, server-side secrets, encrypted transport and monitored error tracking.",
  ],
  [
    "Do you support SSO and SCIM?",
    "Single sign-on is available through our auth provider's plans. For SCIM provisioning or custom identity needs, talk to us and we will scope it.",
  ],
  [
    "Do you support on-prem or VPC deployment?",
    "Plex is hosted only today. Teams with residency or network requirements should contact us to discuss options.",
  ],
  [
    "What admin controls are available?",
    "Per-project ownership, live import and export status with cancel and retry, plus queryable project, message and export records.",
  ],
  [
    "Can we track AI adoption?",
    "Project history, conversation threads and export records give leads a real trail of what agents built, where, and when.",
  ],
];

export default function EnterprisePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-2 pb-12 pt-14 text-center md:px-3 md:pt-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Enterprise
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          AI is changing how software is built.
        </h1>
      </section>

      {/* Real stats */}
      <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
        <div className="grid gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-3">
          {STATS.map(([n, label]) => (
            <div key={label} className="bg-zinc-950 p-6 md:p-8">
              <p className="text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
                {n}
              </p>
              <p className="mt-2 text-sm text-zinc-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Controls trio */}
      <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
        <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
          Powerful, yet customizable
        </h2>
        <p className="mt-3 max-w-xl text-zinc-400">
          Standardize the team on the same tools and best practices.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {CONTROLS.map((c) => (
            <div
              key={c.title}
              className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50"
            >
              <div className="p-5 pb-0">
                <p className="text-sm font-semibold text-zinc-100">{c.title}</p>
                <p className="mt-1.5 text-sm text-zinc-500">{c.body}</p>
                <Link
                  href={c.link}
                  className="mt-3 inline-flex items-center gap-1 text-sm text-zinc-200 hover:underline"
                >
                  {c.cta} <ArrowRight className="size-3.5" />
                </Link>
              </div>
              <div className="p-4">{c.visual}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Security */}
      <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
        <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
          Trusted by companies worldwide. Built with security and compliance at the core.
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECURITY.map(([t, b]) => (
            <div key={t} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <p className="text-sm font-semibold text-zinc-100">{t}</p>
              <p className="mt-2 text-sm text-zinc-500">{b}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-5">
          <Link href="/security" className="inline-flex items-center gap-1 text-sm text-zinc-200 hover:underline">
            Visit our Trust Center <ArrowRight className="size-4" />
          </Link>
          <Link href="/data-use" className="inline-flex items-center gap-1 text-sm text-zinc-200 hover:underline">
            Read about data use <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Teams */}
      <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
        <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
          Modern engineering teams run on Plex.
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEAMS.map(([t, b]) => (
            <div key={t} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <p className="text-sm font-semibold text-zinc-100">{t}</p>
              <p className="mt-2 text-sm text-zinc-500">{b}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild className="bg-white text-black hover:bg-zinc-200">
            <Link href="/pricing">Bring Plex to your team</Link>
          </Button>
        </div>
      </section>

      {/* Proof in product */}
      <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          See Plex at work
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STORIES.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-600"
            >
              <p className="text-sm font-semibold text-zinc-100">{s.title}</p>
              <p className="mt-2 text-[11px] text-zinc-600">{s.date}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Q&A */}
      <section className="mx-auto max-w-4xl px-2 pb-16 md:px-3 md:pb-24">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Questions and Answers
        </h2>
        <Accordion type="single" collapsible className="mt-6">
          {FAQS.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="border-zinc-800">
              <AccordionTrigger className="text-left text-sm text-zinc-100 hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-zinc-400">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Finale */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-2 pb-24 pt-4 text-center md:px-3 md:pb-32">
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          Get started with Plex Enterprise.
        </h2>
        <Button asChild className="mt-8 bg-white text-black hover:bg-zinc-200">
          <Link href="/pricing">Contact sales</Link>
        </Button>
      </section>
    </>
  );
}
