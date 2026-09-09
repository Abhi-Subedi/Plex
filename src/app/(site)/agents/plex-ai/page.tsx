import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ModelChainMock, Shot } from "../../_components/mockups";

export const metadata: Metadata = {
  title: "Plex AI - Plex",
  description:
    "The flagship Plex coding agent: full scaffolds, eight file tools, fallback chain and real published model specs.",
};

const NAV = [
  ["Overview", "#overview"],
  ["Models", "#models"],
  ["Tools", "#tools"],
  ["Surfaces", "#surfaces"],
  ["FAQ", "#faq"],
] as [string, string][];

// Figures are vendor-published (Groq model catalog). Gemini and OpenRouter
// limits follow their own plans; check provider docs for current numbers.
const MODEL_ROWS: [string, string, string, string][] = [
  ["gemini-3.6-flash", "Google AI", "Free tier, daily reset", "Primary"],
  ["openai/gpt-oss-120b", "Groq", "131K context · 65K out · ~500 tok/s", "Fallback"],
  ["openai/gpt-oss-20b", "Groq", "131K context · 65K out · ~1000 tok/s", "Fallback"],
  ["google/gemini-3.8-flash", "OpenRouter", "Per-model billing", "Fallback"],
];

const TOOLS: [string, string][] = [
  ["listFiles", "Full project tree with IDs, types and parents."],
  ["readFiles", "Targeted file reads before any edit."],
  ["updateFile", "Surgical rewrites of existing files."],
  ["createFiles", "Batch creation with full relative paths; folders auto-created."],
  ["createFolder", "Explicit empty folders and nested paths."],
  ["renameFile", "Renames with collision checks against siblings."],
  ["deleteFiles", "Recursive removal of files and folders."],
  ["scrapeUrls", "Live documentation pulled into context."],
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
    title: "IDE",
    body: "The full studio: explorer, tabs, ghost suggestions and the agent panel side by side.",
    href: "/product/editor",
    cta: "Open the editor",
    shot: 3,
    shotTitle: "plex / workspace",
    alt: "Plex workspace laptop with OAuth flow code, task board and terminal",
  },
  {
    title: "Chat",
    body: "The sidebar companion for questions, explanations and guided edits with shared history.",
    href: "/product/chat",
    cta: "Start chatting",
    shot: 2,
    shotTitle: "plex / agent",
    alt: "Plex editor with AI agent conversation, task planning and terminal output",
  },
  {
    title: "Cloud agents",
    body: "Parallel fleets that build, test and review across repositories while you review.",
    href: "/cloud-agents",
    cta: "Launch a fleet",
    shot: 10,
    shotTitle: "plex / orchestration",
    alt: "Plex agent orchestration fleet: coding, testing and review agents across repositories",
  },
  {
    title: "GitHub",
    body: "Import any repo to start from real code, export any project when it is ready to ship.",
    href: "/docs",
    cta: "Read the sync docs",
    shot: 11,
    shotTitle: "plex / repositories",
    alt: "Plex repositories view with recent projects and active agent tasks",
  },
];

const FAQS: [string, string][] = [
  [
    "What is Plex AI?",
    "The flagship coding agent inside Plex. You describe an app, it scaffolds the complete runnable project, then keeps editing file by file as you direct it.",
  ],
  [
    "Where can I use Plex AI?",
    "In the IDE agent panel, the chat sidebar, cloud fleets and anywhere the fallback chain runs: suggestions, quick-edit and background workers.",
  ],
  [
    "Which models power it?",
    "Gemini 3.6 Flash first, then GPT-OSS 120B and 20B on Groq, then Gemini 3.8 Flash on OpenRouter. Every ID was verified live before wiring.",
  ],
  [
    "What happens when quota runs out?",
    "The request walks to the next provider automatically. If every provider is exhausted, the conversation says so plainly with reset guidance instead of a raw error.",
  ],
  [
    "How much does Plex AI cost?",
    "Plex itself starts free. Model usage follows each provider's own quotas and billing: Google and Groq free tiers, OpenRouter per-model billing.",
  ],
];

export default function PlexAiPage() {
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
                Plex AI
              </h1>
              <p className="mt-4 max-w-2xl text-zinc-400">
                The flagship coding agent. Prompt it with an idea and get back a
                runnable project with configs, routes, styles and README. Then
                keep directing it file by file. Ten iterations max per reply,
                verified against the tree before every summary.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild className="bg-white text-black hover:bg-zinc-200">
                  <Link href="/app">Try Plex AI now</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/docs">Read the docs</Link>
                </Button>
              </div>
            </section>

            {/* Models */}
            <section id="models" className="scroll-mt-20 pt-16 md:pt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
                One agent, four models
              </h2>
              <p className="mt-3 max-w-2xl text-zinc-400">
                Each request tries the chain in order and advances only on
                retryable errors. Figures below are vendor-published; provider
                plans decide your real limits.
              </p>
              <div className="mt-8 overflow-hidden rounded-xl border border-zinc-800">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-zinc-900/60 text-[11px] uppercase tracking-wider text-zinc-500">
                        <th className="px-4 py-3 font-medium">Model</th>
                        <th className="px-4 py-3 font-medium">Provider</th>
                        <th className="px-4 py-3 font-medium">Capacity</th>
                        <th className="px-4 py-3 font-medium">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MODEL_ROWS.map(([model, provider, capacity, role]) => (
                        <tr
                          key={model}
                          className="border-b border-zinc-800/60 text-zinc-300 last:border-0"
                        >
                          <td className="px-4 py-3 font-mono text-[13px] text-zinc-100">
                            {model}
                          </td>
                          <td className="px-4 py-3">{provider}</td>
                          <td className="px-4 py-3 text-zinc-400">{capacity}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`rounded border px-1.5 py-0.5 text-[11px] ${
                                role === "Primary"
                                  ? "border-emerald-400/30 text-emerald-300"
                                  : "border-zinc-700 text-zinc-400"
                              }`}
                            >
                              {role}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-6">
                <ModelChainMock />
              </div>
            </section>

            {/* Tools */}
            <section id="tools" className="scroll-mt-20 pt-16 md:pt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
                Eight tools, one tree
              </h2>
              <p className="mt-3 max-w-2xl text-zinc-400">
                Everything the agent can touch, with collision checks and
                path-aware creation baked in.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {TOOLS.map(([name, body]) => (
                  <div
                    key={name}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
                  >
                    <p className="font-mono text-sm text-zinc-100">{name}</p>
                    <p className="mt-1.5 text-sm text-zinc-500">{body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Surfaces */}
            <section id="surfaces" className="scroll-mt-20 pt-16 md:pt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
                Available everywhere you work
              </h2>
              <p className="mt-3 max-w-2xl text-zinc-400">
                The same agent, surfaced wherever the work happens.
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
          Try Plex AI now.
        </h2>
        <Button asChild className="mt-8 bg-white text-black hover:bg-zinc-200">
          <Link href="/app">Get started</Link>
        </Button>
      </section>
    </>
  );
}
