import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BlogIndex, NewsletterForm } from "./_components/blog-index";
import { Shot } from "../_components/mockups";

export const metadata: Metadata = {
  title: "Blog - Plex",
  description: "Notes on agents, fallback chains, editor craft and shipping with Plex.",
};

const PROOF: { title: string; date: string; href: string }[] = [
  { title: "How Plex AI scaffolds full apps", date: "Sep 2026", href: "/agents/plex-ai" },
  { title: "Fleets that build while you review", date: "Sep 2026", href: "/cloud-agents" },
  { title: "Workers that never block the UI", date: "Sep 2026", href: "/product/automation" },
  { title: "Shipped this month in Plex", date: "Sep 2026", href: "/changelog" },
];

const GUIDES: { title: string; body: string; href: string }[] = [
  {
    title: "Agent",
    body: "How the coding agent plans, tools and verifies.",
    href: "/product/agent",
  },
  {
    title: "Fallback chains",
    body: "Gemini, Groq and OpenRouter with per-model rotation.",
    href: "/agents/plex-ai",
  },
  {
    title: "GitHub sync",
    body: "Import any repo, export any project, free.",
    href: "/docs",
  },
  {
    title: "Editor craft",
    body: "Ghost text plus Cmd+K quick-edit.",
    href: "/product/editor",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Featured + stacked */}
      <section className="mx-auto max-w-7xl px-2 pb-16 pt-14 md:px-3 md:pt-20">
        <div className="grid gap-4 lg:grid-cols-5">
          <Link
            href="/changelog#openrouter-chain"
            className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 lg:col-span-3"
          >
            <Shot
              n={10}
              title="plex / orchestration"
              alt="Plex agent orchestration fleet: coding, testing and review agents across repositories"
              className="rounded-none border-0"
            />
            <div className="p-6 md:p-8">
              <p className="text-[11px] text-zinc-600">Sep 8, 2026 · Agents</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 group-hover:underline md:text-3xl">
                OpenRouter fallback chain across Gemini, Groq and OpenRouter
              </p>
              <p className="mt-2 max-w-xl text-sm text-zinc-500">
                Every AI request walks an ordered chain with per-model rotation
                and single-attempt slots. Plex Team · featured post.
              </p>
            </div>
          </Link>
          <div className="grid gap-4 lg:col-span-2">
            {[
              {
                n: 5,
                tag: "Sep 8, 2026 · Agents",
                title: "Path-aware file tools",
                body: "Full relative paths auto-create folders, so scaffolds land as real trees.",
                href: "/changelog#path-tools",
                alt: "Plex task execution: implementation plan, agent conversation, code view and terminal",
              },
              {
                n: 2,
                tag: "Sep 8, 2026 · Agents",
                title: "Groq fallback, quota-aware",
                body: "GPT-OSS models behind Gemini with clear quota guidance.",
                href: "/changelog#groq-fallback",
                alt: "Plex editor with AI agent conversation, task planning and terminal output",
              },
            ].map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50"
              >
                <Shot n={c.n} title="plex" alt={c.alt} className="rounded-none border-0" />
                <div className="p-5">
                  <p className="text-[11px] text-zinc-600">{c.tag}</p>
                  <p className="mt-1.5 text-lg font-semibold tracking-tight text-zinc-50 group-hover:underline">
                    {c.title}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">{c.body}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-y border-zinc-800/80 bg-zinc-900/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-2 py-8 md:flex-row md:items-center md:justify-between md:px-3">
          <p className="max-w-md text-sm text-zinc-400">
            Subscribe for release notes and original engineering content. One email per release, no noise.
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* Index */}
      <section className="mx-auto max-w-7xl px-2 py-16 md:px-3 md:py-24">
        <BlogIndex />
      </section>

      {/* Thesis band */}
      <section className="mx-auto max-w-4xl px-2 pb-16 text-center md:px-3 md:pb-24">
        <p className="text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
          “We are building toward self-building software: agents scaffold,
          verify and ship while builders decide.”
        </p>
        <Button variant="ghost" size="sm" asChild className="mt-5 px-0 text-zinc-300 hover:bg-transparent hover:text-zinc-100">
          <Link href="/agents/plex-ai">
            How the agent works <ArrowRight className="size-4" />
          </Link>
        </Button>
      </section>

      {/* Proof in product */}
      <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          See Plex at work
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROOF.map((s) => (
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

      {/* Guides */}
      <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Go deeper
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GUIDES.map((g) => (
            <Link
              key={g.title}
              href={g.href}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-600"
            >
              <p className="text-sm font-semibold text-zinc-100">{g.title}</p>
              <p className="mt-1.5 text-sm text-zinc-500">{g.body}</p>
            </Link>
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

      {/* Finale */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-2 pb-24 pt-4 text-center md:px-3 md:pb-32">
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          Get started with Plex.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild className="bg-white text-black hover:bg-zinc-200">
            <Link href="/app">Start building</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/enterprise">Contact sales</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
