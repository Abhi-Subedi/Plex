"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export interface Session {
  title: string;
  body: string;
  href: string;
}

const SESSIONS: Session[] = [
  {
    title: "Fallback chains, end to end",
    body: "Gemini, Groq and OpenRouter with per-model rotation and quota-aware messaging.",
    href: "/agents/plex-ai",
  },
  {
    title: "Path-aware file tools",
    body: "Full relative paths that auto-create folders, so scaffolds land as real trees.",
    href: "/changelog#path-tools",
  },
  {
    title: "Ghost text and Cmd+K",
    body: "Inline completions plus selection rewrites with live documentation context.",
    href: "/product/editor",
  },
  {
    title: "GitHub import and export",
    body: "Repo URLs in, structured projects out. New repos back out with one click.",
    href: "/docs",
  },
  {
    title: "WebContainer preview setup",
    body: "Configurable install and dev commands with hot-reload and a streaming terminal.",
    href: "/docs",
  },
  {
    title: "Shortcut mastery",
    body: "New project, import and palette flows without touching the mouse.",
    href: "/docs",
  },
  {
    title: "Quota survival guide",
    body: "Free-tier budgets, iteration caps and reading quota messages correctly.",
    href: "/help",
  },
  {
    title: "Team onboarding",
    body: "Workspaces, review gates and shared conventions for shipping groups.",
    href: "/enterprise",
  },
];

export function SessionsBrowser() {
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SESSIONS;
    return SESSIONS.filter((s) =>
      `${s.title} ${s.body}`.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          On-demand sessions
        </h2>
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter sessions"
            className="h-9 border-zinc-800 bg-zinc-950 pl-9 text-sm"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {rows.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-600"
          >
            <p className="text-sm font-semibold text-zinc-100">{s.title}</p>
            <p className="mt-1.5 text-sm text-zinc-500">{s.body}</p>
            <p className="mt-2 text-[11px] uppercase tracking-wider text-zinc-600">
              Guide
            </p>
          </Link>
        ))}
        {rows.length === 0 && (
          <p className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-8 text-center text-sm text-zinc-500 md:col-span-2">
            No sessions match. Try fewer words.
          </p>
        )}
      </div>
    </div>
  );
}
