"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ConvexReactClient, ConvexProvider } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import {
  Search,
  ChevronRight,
  Copy,
  Check,
  Menu,
  X,
  Zap,
  Bot,
  Blocks,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

const convex =
  process.env.NEXT_PUBLIC_CONVEX_URL
    ? new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)
    : null;

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  children?: NavItem[];
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const STATIC_NAV: NavGroup[] = [
  {
    title: "Get Started",
    items: [
      { label: "Welcome", href: "/docs", active: true },
      { label: "Quickstart", href: "/docs#quickstart" },
      {
        label: "Models & Pricing",
        href: "/pricing",
        children: [],
      },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Agent",
    items: [
      { label: "Overview", href: "/product/agent" },
      { label: "Agents Window", href: "/docs#agents-window" },
      { label: "Agent Review", href: "/docs#agent-review" },
      { label: "Planning", href: "/docs#planning" },
      { label: "Prompting", href: "/docs#prompting" },
      { label: "Debugging", href: "/docs#debugging" },
      { label: "Design Mode", href: "/docs#design-mode" },
      { label: "Tools", href: "/docs#tools", children: [] },
      { label: "Security", href: "/security", children: [] },
    ],
  },
  {
    title: "Plex Bot",
    items: [
      { label: "Overview", href: "/agents/plex-ai" },
      { label: "Get Started", href: "/docs#plex-bot-start" },
      { label: "Use Cases", href: "/docs#use-cases" },
      { label: "Work with Plex Bot", href: "/agents/plex-chat" },
      { label: "Settings", href: "/docs#bot-settings" },
      { label: "Teams and Enterprise", href: "/enterprise", children: [] },
    ],
  },
  {
    title: "Customize",
    items: [{ label: "Overview", href: "/docs#customize" }],
  },
];

const TOP_TABS = [
  { label: "Docs", href: "/docs", active: true },
  { label: "API", href: "/docs#api" },
  { label: "Learn", href: "/workshop" },
  { label: "Help", href: "/help" },
];

const TOC = [
  { label: "Start here", href: "#start-here" },
  { label: "What you can do with Plex", href: "#what-you-can-do" },
  { label: "Models", href: "#models" },
  { label: "More resources", href: "#more-resources" },
];

const START_HERE_CARDS = [
  {
    icon: Zap,
    title: "Quickstart",
    body: "Install Plex, connect a model provider, and ship your first agent-built feature in minutes.",
    href: "#quickstart",
  },
  {
    icon: Bot,
    title: "Agent overview",
    body: "Learn how the coding agent plans, edits, verifies, and reports back on every task.",
    href: "/product/agent",
  },
  {
    icon: Blocks,
    title: "Editor & automation",
    body: "Ghost suggestions, quick-edit, cloud agents, and GitHub sync working together.",
    href: "/product/editor",
  },
];

function matchesQuery(label: string, q: string) {
  return label.toLowerCase().includes(q.toLowerCase());
}

function IdeMockup() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-zinc-800 px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 hidden text-xs text-zinc-500 sm:block">
          plex / ide — composer ghost + review diff
        </span>
      </div>
      <div className="grid md:grid-cols-[180px_1fr_1.2fr]">
        <div className="hidden border-r border-zinc-800 p-3 text-xs md:block">
          <p className="px-2 py-1 font-semibold text-zinc-300">New Agent</p>
          <p className="px-2 py-1 text-zinc-500">Automations</p>
          <p className="px-2 py-1 text-zinc-500">Customize</p>
          <p className="mt-3 px-2 text-[10px] uppercase tracking-widest text-zinc-600">Plex</p>
          <p className="rounded bg-zinc-900 px-2 py-1 text-zinc-200">Composer ghost</p>
          <div className="mt-2 space-y-1 text-zinc-500">
            <p className="px-2">Sidebar reorderable</p>
            <p className="px-2">Agentic chat</p>
            <p className="px-2">Command palette</p>
            <p className="px-2">Toast notification</p>
          </div>
          <p className="mt-3 px-2 text-[10px] uppercase tracking-widest text-zinc-600">Everysphere</p>
          <div className="space-y-1 text-zinc-500">
            <p className="px-2">Unified search index</p>
            <p className="px-2">Settings & Config UI</p>
            <p className="px-2">Shared diff review flows</p>
          </div>
        </div>
        <div className="border-r border-zinc-800 p-4 text-xs leading-relaxed">
          <p className="font-mono text-[11px] text-zinc-500">Composer ghost</p>
          <p className="mt-2 text-zinc-300">
            Rewrite the ghost-text pipeline to reduce suggestion latency, add multi-line preview,
            and handle cancellation when the user keeps typing.
          </p>
          <p className="mt-3 font-mono text-[11px] text-zinc-500">Search ghost text render path</p>
          <p className="mt-1 text-zinc-400">
            On it. I&apos;ll profile the current pipeline, fix the cancellation race, and add
            multi-line ghost-text rendering with proper stale-completion cleanup.
          </p>
          <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3">
            <p className="text-[11px] font-semibold text-zinc-200">Summary</p>
            <p className="mt-1 text-zinc-400">
              Ghost-text pipeline rewritten: p50 latency down 40%, multi-line preview renders
              inline, and stale completions are cancelled on keystroke.
            </p>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[11px] text-zinc-500">
            <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-emerald-300">Review +156 −41</span>
            <span className="rounded bg-zinc-900 px-1.5 py-0.5">Commit & Push</span>
          </div>
        </div>
        <div className="bg-zinc-950 p-4 font-mono text-[11px] leading-relaxed">
          <div className="mb-2 flex items-center justify-between text-zinc-500">
            <span>PaneTabBar.tsx −6 +4</span>
            <span className="rounded bg-zinc-900 px-1.5 py-0.5">Create PR</span>
          </div>
          <p className="text-zinc-500">9&nbsp;&nbsp;return useMemo(() =&gt; {"{"}</p>
          <p className="text-zinc-500">10&nbsp;&nbsp;&nbsp;&nbsp;if (!isPinned) {"{"}</p>
          <p className="bg-red-500/15 text-red-200">13&nbsp;&nbsp;const pinnedIconSize = isCompact ? 14 : 16;</p>
          <p className="bg-emerald-500/15 text-emerald-200">14&nbsp;&nbsp;const pinnedButtonSizeClass = isCompact ? &apos;h-5 w-5&apos; : &apos;h-6 w-6&apos;;</p>
          <p className="text-zinc-500">15&nbsp;&nbsp;&nbsp;&nbsp;{"}"}</p>
          <p className="mt-3 text-zinc-500">31&nbsp;&nbsp;return (</p>
          <p className="bg-emerald-500/10 text-emerald-100">32&nbsp;&nbsp;&nbsp;&nbsp;&lt;div className=&quot;flex items-center self-stretch&quot;&gt;</p>
          <p className="mt-3 text-zinc-500">1&nbsp;&nbsp;import {"{ useEffect, useRef }"} from &apos;react&apos;;</p>
          <p className="text-zinc-400">4&nbsp;&nbsp;export function useResizeObserver({"{"} callback {"}"}) {"{"}</p>
          <p className="text-zinc-400">9&nbsp;&nbsp;&nbsp;&nbsp;callbackRef.current = callback;</p>
        </div>
      </div>
    </div>
  );
}

function DocsBody() {
  const [query, setQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([]);

  const liveDocs = useQuery(api.cms.listDocs, { publishedOnly: true });

  const nav: NavGroup[] = useMemo(() => {
    const groups = STATIC_NAV.map((g) => ({
      ...g,
      items: g.items.filter((i) => !query || matchesQuery(i.label, query)),
    })).filter((g) => g.items.length > 0);

    const live = (liveDocs ?? [])
      .filter((d) => !query || matchesQuery(d.title, query))
      .slice(0, 8)
      .map((d) => ({ label: d.title, href: `/docs` }));
    if (live.length > 0) {
      groups.push({ title: "From your workspace", items: live });
    }
    return groups;
  }, [query, liveDocs]);

  const toggleExpand = (label: string) =>
    setExpanded((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]));

  const copyPage = async () => {
    const text = `Plex Documentation\n\nPlex is a coding agent for building ambitious software. Use it to understand your codebase, plan and build features, fix bugs, review changes, and work with the tools you already use.\n\nStart here: Quickstart, Agent overview, Editor & automation.\n\nWhat you can do with Plex: scaffold full projects, iterate file by file, preview live, sync with GitHub.\n\nModels: Gemini, Groq and OpenRouter in one fallback chain.`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const sidebar = (
    <div className="space-y-7">
      {nav.map((group) => (
        <div key={group.title}>
          <p className="px-2 text-[13px] text-zinc-500">{group.title}</p>
          <ul className="mt-2 space-y-0.5">
            {group.items.map((item) => {
              const hasKids = !!item.children;
              const isOpen = expanded.includes(item.label);
              return (
                <li key={item.label}>
                  <div
                    className={cn(
                      "group flex items-center justify-between rounded-md px-2 py-1.5 text-[15px]",
                      item.active ? "bg-zinc-900 font-medium text-zinc-50" : "text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100"
                    )}
                  >
                    <Link href={item.href} className="flex-1" onClick={() => setMobileNavOpen(false)}>
                      {item.label}
                    </Link>
                    {hasKids && (
                      <button
                        aria-label={`Expand ${item.label}`}
                        onClick={() => toggleExpand(item.label)}
                        className="rounded p-0.5 text-zinc-500 hover:text-zinc-200"
                      >
                        <ChevronRight className={cn("size-3.5 transition-transform", isOpen && "rotate-90")} />
                      </button>
                    )}
                  </div>
                  {hasKids && isOpen && (
                    <p className="px-4 py-1 text-[13px] text-zinc-600">More in {item.label} →</p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      {nav.length === 0 && <p className="px-2 text-sm text-zinc-500">No results for “{query}”.</p>}
    </div>
  );

  return (
    <div className="bg-zinc-950 text-zinc-200">
      {/* Docs navbar */}
      <div className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-4 px-4 md:gap-6 md:px-6">
          <button
            className="rounded-md p-2 text-zinc-300 hover:bg-zinc-900 lg:hidden"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open docs navigation"
          >
            <Menu className="size-5" />
          </button>
          <Link href="/" aria-label="Plex home" className="shrink-0">
            <Logo className="h-6" />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {TOP_TABS.map((t) => (
              <Link
                key={t.label}
                href={t.href}
                className={cn(
                  "relative py-4 text-[15px]",
                  t.active ? "text-zinc-50" : "text-zinc-400 hover:text-zinc-100"
                )}
              >
                {t.label}
                {t.active && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-zinc-100" />}
              </Link>
            ))}
          </nav>
          <div className="mx-auto w-full max-w-md flex-1 md:mx-0">
            <label className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-400 focus-within:border-zinc-600">
              <Search className="size-4 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search docs..."
                className="w-full bg-transparent text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                aria-label="Search docs"
              />
              <kbd className="hidden shrink-0 rounded border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 font-mono text-[11px] text-zinc-400 sm:block">
                ⌘K
              </kbd>
            </label>
          </div>
          <div className="ml-auto hidden items-center gap-2 md:flex">
            <Link
              href="/app"
              className="rounded-lg border border-zinc-700 px-3.5 py-1.5 text-sm text-zinc-200 hover:bg-zinc-900"
            >
              Sign in
            </Link>
            <Link
              href="/app"
              className="rounded-lg bg-white px-3.5 py-1.5 text-sm font-medium text-black hover:bg-zinc-200"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileNavOpen(false)} aria-hidden="true" />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] overflow-y-auto border-r border-zinc-800 bg-zinc-950 p-5">
            <div className="mb-4 flex items-center justify-between">
              <Link href="/" aria-label="Plex home" onClick={() => setMobileNavOpen(false)}>
                <Logo className="h-6" />
              </Link>
              <button
                className="rounded-md p-2 text-zinc-300 hover:bg-zinc-900"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close docs navigation"
              >
                <X className="size-5" />
              </button>
            </div>
            {sidebar}
          </div>
        </div>
      )}

      {/* 3-column body */}
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-10 md:px-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_240px]">
        <aside className="hidden lg:block">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-10">{sidebar}</div>
        </aside>

        <article className="min-w-0">
          <p className="text-[15px] text-zinc-400">Get Started</p>
          <h1 className="mt-2 text-4xl font-medium tracking-tight text-zinc-50 md:text-5xl">
            Plex Documentation
          </h1>
          <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-zinc-300">
            Plex is a coding agent for building ambitious software. Use it to understand your
            codebase, plan and build features, fix bugs, review changes, and work with the tools
            you already use.
          </p>

          <div className="relative mt-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-[24px] bg-[radial-gradient(60%_80%_at_50%_20%,rgba(255,255,255,0.07),transparent),url('/8.jpg')] bg-cover bg-center opacity-40"
            />
            <div className="relative">
              <IdeMockup />
            </div>
          </div>

          <h2 id="start-here" className="mt-16 scroll-mt-32 text-2xl font-medium text-zinc-50">
            Start here
          </h2>
          <div id="quickstart" className="mt-6 grid scroll-mt-32 gap-4 md:grid-cols-3">
            {START_HERE_CARDS.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-600"
              >
                <c.icon className="size-5 text-zinc-300" />
                <p className="mt-3 flex items-center gap-1 font-medium text-zinc-50">
                  {c.title}
                  <ArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{c.body}</p>
              </Link>
            ))}
          </div>

          <h2 id="what-you-can-do" className="mt-14 scroll-mt-32 text-2xl font-medium text-zinc-50">
            What you can do with Plex
          </h2>
          <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-zinc-300">
            <p>
              Describe the app and Plex scaffolds the full project — configs, routes, styles —
              then keeps iterating with you file by file while you make the decisions.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-zinc-400">
              <li>Ghost suggestions inline as you type, plus ⌘K quick-edit on any selection.</li>
              <li>Live preview with a streaming terminal, right beside the code.</li>
              <li>Two-way GitHub import and export with no plan gates.</li>
              <li>Cloud agents that build, test, and report back with a walkthrough.</li>
            </ul>
          </div>

          <h2 id="models" className="mt-14 scroll-mt-32 text-2xl font-medium text-zinc-50">
            Models
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-zinc-400">
            One request walks a fallback chain across Gemini, Groq, and OpenRouter. A quota hit on
            one provider just means the next one answers — see{" "}
            <Link href="/pricing" className="text-zinc-100 underline decoration-zinc-600 underline-offset-4 hover:decoration-zinc-300">
              Models & Pricing
            </Link>
            .
          </p>

          <h2 id="more-resources" className="mt-14 scroll-mt-32 text-2xl font-medium text-zinc-50">
            More resources
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { label: "Changelog", href: "/changelog", body: "What shipped and when." },
              { label: "Workshop", href: "/workshop", body: "Guided sessions and deep dives." },
              { label: "Community", href: "/community", body: "Showcases, tutorials, discussions." },
              { label: "Help center", href: "/help", body: "Answers when something breaks." },
            ].map((r) => (
              <Link
                key={r.label}
                href={r.href}
                className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 hover:border-zinc-600"
              >
                <span>
                  <span className="block font-medium text-zinc-100">{r.label}</span>
                  <span className="mt-1 block text-sm text-zinc-500">{r.body}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-zinc-500 transition-colors group-hover:text-zinc-100" />
              </Link>
            ))}
          </div>
        </article>

        <aside className="hidden xl:block">
          <div className="sticky top-20 space-y-1">
            {TOC.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="block rounded-md px-2 py-1.5 text-[14px] text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
              >
                {t.label}
              </Link>
            ))}
            <div className="my-3 border-t border-zinc-800" />
            <button
              onClick={copyPage}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[14px] text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
            >
              {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
              {copied ? "Copied!" : "Copy page"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function DocsExperience() {
  if (!convex) {
    return (
      <div className="bg-zinc-950 p-10 text-center text-sm text-zinc-400">
        Docs search needs NEXT_PUBLIC_CONVEX_URL to load workspace content.
      </div>
    );
  }
  return (
    <ConvexProvider client={convex}>
      <DocsBody />
    </ConvexProvider>
  );
}
