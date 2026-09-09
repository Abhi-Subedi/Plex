import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shot } from "../../_components/mockups";

export const metadata: Metadata = {
  title: "Plex Chat - Plex",
  description:
    "Plex Chat is the conversational companion: questions, explanations and small edits without a full agent run.",
};

const NAV = [
  ["Overview", "#overview"],
  ["Capabilities", "#capabilities"],
  ["Surfaces", "#surfaces"],
  ["FAQ", "#faq"],
] as [string, string][];

const CAPABILITIES: [string, string, string][] = [
  ["Threads", "One conversation per project, reopenable anytime", "Included"],
  ["History", "Last ten messages ride along for grounded follow-ups", "Included"],
  ["Titles", "Auto-generated once from the first message", "Included"],
  ["Cancel", "Stop any reply mid-stream from sidebar or API", "Included"],
  ["Fallback chain", "Gemini, Groq and OpenRouter coverage included", "Included"],
  ["Quota honesty", "Clear reset guidance instead of raw error dumps", "Included"],
];

const SURFACES: {
  title: string;
  body: string;
  href: string;
  cta: string;
  shot: number;
  shotTitle: string;
  alt: string;
}[] = [
  {
    title: "Sidebar",
    body: "The docked companion next to editor and preview, with processing states on every reply.",
    href: "/product/chat",
    cta: "See the sidebar",
    shot: 2,
    shotTitle: "plex / agent",
    alt: "Plex editor with AI agent conversation, task planning and terminal output",
  },
  {
    title: "Threads",
    body: "Past conversations per project, reopened from the dialog exactly where they stopped.",
    href: "/product/chat",
    cta: "Browse threads",
    shot: 11,
    shotTitle: "plex / repositories",
    alt: "Plex repositories view with recent projects and active agent tasks",
  },
  {
    title: "Editor handoff",
    body: "Start in chat for direction, hand off to Plex AI when files need to change. History carries over.",
    href: "/product/editor",
    cta: "Open the editor",
    shot: 3,
    shotTitle: "plex / workspace",
    alt: "Plex workspace laptop with OAuth flow code, task board and terminal",
  },
  {
    title: "Review",
    body: "Walkthroughs land back in the thread when background work finishes, ready for follow-ups.",
    href: "/cloud-agents",
    cta: "See cloud agents",
    shot: 6,
    shotTitle: "plex / cloud agent",
    alt: "Plex cloud agent with reasoning log, execution timeline, checklist and test results",
  },
];

const FAQS: [string, string][] = [
  [
    "What is Plex Chat?",
    "The lighter companion to Plex AI for questions, code explanations and quick guidance, living in the same sidebar as the full agent.",
  ],
  [
    "How is it different from Plex AI?",
    "Plex Chat answers and explains without scaffolding overhead. Plex AI takes file-changing jobs with the full tool loop. They share history, so handoffs lose nothing.",
  ],
  [
    "Does chat remember my project?",
    "Yes. Each project keeps its own threads, and the last ten messages shape every reply.",
  ],
  [
    "Can I stop a reply?",
    "Anytime, from the sidebar or the API. Cancelled runs stay marked so the thread stays honest.",
  ],
  [
    "What happens on quota exhaustion?",
    "The fallback chain tries Gemini, Groq and OpenRouter in order. If all are out, you get reset guidance instead of a raw error.",
  ],
];

export default function PlexChatPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-2 md:px-3">
        <div className="grid gap-10 py-14 md:py-20 lg:grid-cols-[200px_1fr]">
          {/* Docs sidebar */}
          <aside className="hidden lg:block">
            <nav className="sticky top-20 space-y-1">
              {NAV.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="block rounded-md px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/changelog"
                className="block rounded-md px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100"
              >
                Changelog
              </Link>
            </nav>
          </aside>

          <div className="min-w-0">
            {/* Overview */}
            <section id="overview" className="scroll-mt-20">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Agents
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-50 md:text-6xl">
                Plex Chat
              </h1>
              <p className="mt-4 max-w-2xl text-zinc-400">
                Plex Chat thinks with you. Questions, explanations and small
                guidance without the overhead of a full agent run, in the same
                sidebar where Plex AI does the building.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild className="bg-white text-black hover:bg-zinc-200">
                  <Link href="/app">Try Plex Chat now</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/docs">Read the docs</Link>
                </Button>
              </div>
            </section>

            {/* Capabilities */}
            <section id="capabilities" className="scroll-mt-20 pt-16 md:pt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
                What chat handles
              </h2>
              <p className="mt-3 max-w-2xl text-zinc-400">
                Everything below ships in the free product. No tiers, no gates.
              </p>
              <div className="mt-8 overflow-hidden rounded-xl border border-zinc-800">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-zinc-900/60 text-[11px] uppercase tracking-wider text-zinc-500">
                        <th className="px-4 py-3 font-medium">Capability</th>
                        <th className="px-4 py-3 font-medium">Detail</th>
                        <th className="px-4 py-3 font-medium">Plan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CAPABILITIES.map(([name, detail, plan]) => (
                        <tr
                          key={name}
                          className="border-b border-zinc-800/60 text-zinc-300 last:border-0"
                        >
                          <td className="px-4 py-3 font-mono text-[13px] text-zinc-100">
                            {name}
                          </td>
                          <td className="px-4 py-3 text-zinc-400">{detail}</td>
                          <td className="px-4 py-3">
                            <span className="rounded border border-emerald-400/30 px-1.5 py-0.5 text-[11px] text-emerald-300">
                              {plan}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Surfaces */}
            <section id="surfaces" className="scroll-mt-20 pt-16 md:pt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
                Available everywhere you chat
              </h2>
              <p className="mt-3 max-w-2xl text-zinc-400">
                The same thread, surfaced wherever the work happens.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {SURFACES.map((s) => (
                  <div
                    key={s.title}
                    className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50"
                  >
                    <div className="p-5 pb-0">
                      <p className="text-sm font-semibold text-zinc-100">{s.title}</p>
                      <p className="mt-1.5 text-sm text-zinc-500">{s.body}</p>
                      <Link
                        href={s.href}
                        className="mt-3 inline-block text-sm text-zinc-200 hover:underline"
                      >
                        {s.cta} →
                      </Link>
                    </div>
                    <div className="p-4">
                      <Shot n={s.shot} title={s.shotTitle} alt={s.alt} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-20 pt-16 md:pt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
                FAQ
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
          </div>
        </div>
      </div>

      {/* Finale */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-2 pb-24 pt-8 text-center md:px-3 md:pb-32">
        <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
          Try Plex Chat now.
        </h2>
        <Button asChild className="mt-8 bg-white text-black hover:bg-zinc-200">
          <Link href="/app">Get started</Link>
        </Button>
      </section>
    </>
  );
}
