"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface BlogPost {
  date: string;
  tag: string;
  title: string;
  body: string;
  href: string;
}

export const POSTS: BlogPost[] = [
  {
    date: "Sep 8, 2026",
    tag: "Agents",
    title: "OpenRouter fallback chain across Gemini, Groq and OpenRouter",
    body: "Every AI request walks an ordered chain with per-model rotation and single-attempt slots.",
    href: "/changelog#openrouter-chain",
  },
  {
    date: "Sep 8, 2026",
    tag: "Agents",
    title: "Groq fallback with quota-aware messaging",
    body: "GPT-OSS models behind Gemini, capped loops and clear quota guidance.",
    href: "/changelog#groq-fallback",
  },
  {
    date: "Sep 8, 2026",
    tag: "Company",
    title: "Plex rename everywhere",
    body: "New name across UI, agent identity and infrastructure, plus system-following theme.",
    href: "/changelog#plex-rename",
  },
  {
    date: "Sep 8, 2026",
    tag: "Product",
    title: "Import and export go free",
    body: "Plan gates removed and exports fixed for any default branch.",
    href: "/changelog#free-sync",
  },
  {
    date: "Sep 8, 2026",
    tag: "Agents",
    title: "Path-aware file tools",
    body: "Full relative paths auto-create folders, so scaffolds land as real trees.",
    href: "/changelog#path-tools",
  },
  {
    date: "Sep 2026",
    tag: "Editor",
    title: "Ghost suggestions plus Cmd+K quick-edit",
    body: "Inline completions and selection rewrites with live documentation context.",
    href: "/changelog#highlights",
  },
  {
    date: "Sep 2026",
    tag: "Product",
    title: "WebContainer preview with streaming terminal",
    body: "Boot projects in the browser with configurable commands and hot-reload.",
    href: "/changelog#highlights",
  },
  {
    date: "Sep 2026",
    tag: "Product",
    title: "Two-way GitHub import and export",
    body: "Octokit workers, binary storage and default-branch-safe commits.",
    href: "/changelog#highlights",
  },
];

const FILTERS = ["All", "Agents", "Product", "Editor", "Company"] as const;

export function BlogIndex() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter((p) => {
      if (filter !== "All" && p.tag !== filter) return false;
      if (q && !`${p.title} ${p.body}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [filter, query]);

  const visible = expanded ? rows : rows.slice(0, 6);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              filter === f
                ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-100"
            }`}
          >
            {f}
          </button>
        ))}
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts"
          className="ml-auto h-9 w-full border-zinc-800 bg-zinc-950 sm:w-52"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800">
        {visible.map((p, i) => (
          <Link
            key={p.title}
            href={p.href}
            className={`grid grid-cols-[110px_1fr] items-baseline gap-3 bg-zinc-900/50 px-4 py-3.5 transition-colors hover:bg-zinc-900 md:grid-cols-[130px_120px_1fr_110px] ${
              i > 0 ? "border-t border-zinc-800/60" : ""
            }`}
          >
            <span className="text-xs text-zinc-600">{p.date}</span>
            <span className="hidden text-xs text-zinc-500 md:block">{p.tag}</span>
            <span className="text-sm text-zinc-100">{p.title}</span>
            <span className="hidden items-center justify-end gap-1 text-xs text-zinc-500 md:inline-flex">
              Read <ArrowRight className="size-3" />
            </span>
          </Link>
        ))}
        {visible.length === 0 && (
          <p className="bg-zinc-900/50 px-4 py-8 text-center text-sm text-zinc-500">
            No posts match. Try another filter or search.
          </p>
        )}
      </div>

      {rows.length > 6 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 px-0 text-zinc-300 hover:bg-transparent hover:text-zinc-100"
        >
          {expanded ? "Show less" : `View more (${rows.length - 6} more)`}
        </Button>
      )}
    </div>
  );
}

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-2.5 text-sm text-emerald-200">
        <Check className="size-4" /> You are on the list. First issue lands soon.
      </p>
    );
  }

  return (
    <form
      className="flex w-full max-w-md gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setDone(true);
      }}
    >
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="h-10 border-zinc-800 bg-zinc-950"
      />
      <Button type="submit" variant="outline" className="h-10 shrink-0">
        Subscribe
      </Button>
    </form>
  );
}
