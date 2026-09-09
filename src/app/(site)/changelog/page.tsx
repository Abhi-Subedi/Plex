import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ModelChainMock, Shot } from "../_components/mockups";

export const metadata: Metadata = {
  title: "Changelog - Plex",
  description: "Every Plex release: AI fallback chains, free GitHub sync, path-aware file tools and more.",
};

const HIGHLIGHTS: { date: string; tag: string; title: string; body: string }[] = [
  {
    date: "Sep 2026",
    tag: "Agents",
    title: "Agentic file tools with automatic folder scaffolding",
    body: "Eight tools (list, read, update, batch-create, folder, rename, delete and URL scraping) let the agent reshape whole projects. Path-aware creation means TanStack routes, Next.js app trees and Vite shells land correctly nested on the first try, verified with listFiles after every run.",
  },
  {
    date: "Sep 2026",
    tag: "Editor",
    title: "Ghost suggestions plus Cmd+K quick-edit",
    body: "Completions stream in as ghost text while you type across seven languages, and Cmd+K rewrites any selection from a plain-English instruction. URLs in the instruction are scraped for live documentation context. Both ride the same provider fallback chain as chat.",
  },
  {
    date: "Sep 2026",
    tag: "Preview",
    title: "WebContainer preview with streaming terminal",
    body: "Booting user projects in the browser with configurable install and dev commands, hot-reload on every file change, and a live terminal feed.",
  },
  {
    date: "Sep 2026",
    tag: "Sync",
    title: "Two-way GitHub import and export",
    body: "Octokit workers, binary storage uploads and default-branch-safe commits, with live status and retry in the UI.",
  },
];

export default function ChangelogPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-14 md:pt-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-200"
        >
          <ArrowLeft className="size-4" /> Back to home
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
          Changelog
        </h1>
        <p className="mt-3 text-zinc-400">
          Every release, in plain language. Newest first.
        </p>

        {/* Index */}
        <nav className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900/50 p-2">
          {[
            ["OpenRouter fallback chain", "#openrouter-chain"],
            ["Groq fallback, quota-aware", "#groq-fallback"],
            ["Plex rename everywhere", "#plex-rename"],
            ["Import and export go free", "#free-sync"],
            ["Path-aware file tools", "#path-tools"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
            >
              {label}
              <span className="text-xs text-zinc-600">Sep 8, 2026</span>
            </Link>
          ))}
        </nav>

        {/* Entry 1 */}
        <article id="openrouter-chain" className="scroll-mt-24 pt-16 md:pt-20">
          <p className="text-xs text-zinc-600">Sep 8, 2026</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
            OpenRouter fallback chain across Gemini, Groq and OpenRouter
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
            Every AI request now walks an ordered chain: gemini-3.6-flash,
            then GPT-OSS 120B and 20B on Groq, then gemini-3.8-flash on
            OpenRouter. Titles get their own lightweight chain ending on
            gemini-3.5-flash-lite.
          </p>
          <h3 className="mt-8 text-lg font-semibold tracking-tight text-zinc-100">
            How the chain walks
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400 md:text-base">
            Each slot is attempted at most once and only after a retryable
            error: 429 and quota exhaustion, 5xx responses, timeouts and
            retired model IDs. Auth errors and bad requests stop the chain
            immediately, and providers without keys are skipped without a
            call. Read the full design on the agent page.
          </p>
          <div className="mt-6">
            <ModelChainMock />
          </div>
          <h3 className="mt-8 text-lg font-semibold tracking-tight text-zinc-100">
            Verified IDs only
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400 md:text-base">
            All model IDs were verified live against the provider catalogs
            before wiring. Retired IDs like gemini-2.0-flash and
            llama-3.3-70b return 404s now, so they are gone for good.{" "}
            <Link href="/product/agent" className="text-zinc-200 hover:underline">
              Learn more in the agent docs
            </Link>
            .
          </p>
        </article>

        {/* Entry 2 */}
        <article id="groq-fallback" className="scroll-mt-24 pt-16 md:pt-20">
          <p className="text-xs text-zinc-600">Sep 8, 2026</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
            Groq fallback with quota-aware messaging
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
            Added Groq with GPT-OSS models as the first fallback behind
            Gemini, so a quota hit no longer means a dead agent. The agent
            loop is capped at ten iterations so a single reply cannot burn
            through a whole day of free-tier quota.
          </p>
          <h3 className="mt-8 text-lg font-semibold tracking-tight text-zinc-100">
            Quota-aware replies
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400 md:text-base">
            When every provider is exhausted, the conversation explains what
            happened and when quota resets instead of dumping a raw provider
            error or a generic apology.
          </p>
          <div className="mt-6">
            <Shot
              n={2}
              title="plex / agent"
              alt="Plex editor with AI agent conversation, task planning and terminal output"
            />
          </div>
        </article>

        {/* Entry 3 */}
        <article id="plex-rename" className="scroll-mt-24 pt-16 md:pt-20">
          <p className="text-xs text-zinc-600">Sep 8, 2026</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
            Plex rename everywhere
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
            Polaris is now Plex across the dashboard, navbar, editor, agent
            identity, Inngest app IDs, package name and tab metadata.
          </p>
          <h3 className="mt-8 text-lg font-semibold tracking-tight text-zinc-100">
            Infrastructure follows
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400 md:text-base">
            The Convex trust key moved to its new name in code, local env and
            the Convex backend with values verified matching. The theme now
            follows the operating system, with a matching wordmark and favicon
            for dark and light modes.
          </p>
          <div className="mt-6">
            <Shot
              n={1}
              title="plex / ide"
              alt="Plex IDE on a desktop: file explorer, Python editor, AI tools and agent conversation"
            />
          </div>
        </article>

        {/* Entry 4 */}
        <article id="free-sync" className="scroll-mt-24 pt-16 md:pt-20">
          <p className="text-xs text-zinc-600">Sep 8, 2026</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
            Import and export go free
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
            Removed the plan gates from GitHub import and export, including
            every upgrade toast in the UI. Import still needs GitHub connected
            through Clerk, and both flows need the background worker running.
          </p>
          <h3 className="mt-8 text-lg font-semibold tracking-tight text-zinc-100">
            Default-branch fix
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400 md:text-base">
            Export no longer assumes your default branch is main. It reads the
            repo&apos;s actual default branch before pushing the initial
            commit, so exports land cleanly on any configuration.{" "}
            <Link href="/docs" className="text-zinc-200 hover:underline">
              Read the sync docs
            </Link>
            .
          </p>
          <div className="mt-6">
            <Shot
              n={11}
              title="plex / repositories"
              alt="Plex repositories view with recent projects and active agent tasks"
            />
          </div>
        </article>

        {/* Entry 5 */}
        <article id="path-tools" className="scroll-mt-24 pt-16 md:pt-20">
          <p className="text-xs text-zinc-600">Sep 8, 2026</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
            Path-aware file tools
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
            File creation accepts full relative paths like
            src/routes/index.tsx and auto-creates every missing folder, so
            generated projects arrive as real trees instead of flat misnamed
            files.
          </p>
          <h3 className="mt-8 text-lg font-semibold tracking-tight text-zinc-100">
            Complete shells, mandated
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400 md:text-base">
            The agent prompt now requires full paths plus a complete runnable
            shell for every app: package.json with scripts, framework config,
            entry point and README, following each stack&apos;s real
            conventions. Five React-compiler lint errors were fixed along the
            way, and server errors now surface per stage instead of generic
            toasts.
          </p>
          <div className="mt-6">
            <Shot
              n={5}
              title="plex / task execution"
              alt="Plex task execution: implementation plan, agent conversation, code view and terminal"
            />
          </div>
        </article>

        {/* Highlights */}
        <h2
          id="highlights"
          className="scroll-mt-20 pt-16 text-3xl font-semibold tracking-tight md:pt-20"
        >
          Highlights
        </h2>
        <p className="mt-3 text-zinc-400">
          The capabilities that define Plex, in more detail.
        </p>

        <div className="mt-8 space-y-4">
          {HIGHLIGHTS.map((h) => (
            <article
              key={h.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8"
            >
              <p className="text-xs text-zinc-600">
                {h.date} · {h.tag}
              </p>
              <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-zinc-50">
                {h.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{h.body}</p>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
