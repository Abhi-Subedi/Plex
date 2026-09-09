"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Space {
  name: string;
  body: string;
  href: string;
  cta: string;
  threads: { title: string; href: string }[];
}

const SPACES: Space[] = [
  {
    name: "Announcements",
    body: "Release notes and maintenance windows from the Plex team.",
    href: "/changelog",
    cta: "Open space",
    threads: [
      { title: "OpenRouter fallback chain across Gemini, Groq and OpenRouter", href: "/changelog#openrouter-chain" },
      { title: "Groq fallback with quota-aware messaging", href: "/changelog#groq-fallback" },
    ],
  },
  {
    name: "Showcase",
    body: "Finished apps with repos, prompts and lessons learned.",
    href: "/blog",
    cta: "Open space",
    threads: [
      { title: "Ghost suggestions plus Cmd+K quick-edit", href: "/changelog#highlights" },
      { title: "WebContainer preview with streaming terminal", href: "/changelog#highlights" },
    ],
  },
  {
    name: "Questions",
    body: "Setup, quotas, GitHub sync and editor quirks, answered by builders.",
    href: "/help",
    cta: "Open space",
    threads: [
      { title: "Answered questions live in Help", href: "/help" },
      { title: "Quota survival guide", href: "/help" },
    ],
  },
  {
    name: "Guides",
    body: "Community how-tos for teams, classrooms and solo builders.",
    href: "/docs",
    cta: "Open space",
    threads: [
      { title: "Two-way GitHub import and export", href: "/changelog#highlights" },
      { title: "Get running in minutes", href: "/docs" },
    ],
  },
  {
    name: "Roadmap",
    body: "What the community voted up and what ships next.",
    href: "/blog",
    cta: "Open space",
    threads: [
      { title: "Plex rename everywhere", href: "/changelog#plex-rename" },
      { title: "Import and export go free", href: "/changelog#free-sync" },
    ],
  },
  {
    name: "Events",
    body: "Ninety-minute live builds, announced in advance.",
    href: "/workshop",
    cta: "Open space",
    threads: [
      { title: "Upcoming formats and prep material", href: "/workshop" },
      { title: "On-demand session index", href: "/workshop" },
    ],
  },
];

export function ForumBrowser({ middle }: { middle: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>("Announcements");

  const q = query.trim().toLowerCase();
  const spaces = useMemo(() => {
    if (!q) return SPACES;
    return SPACES.map((s) => ({
      ...s,
      threads: s.threads.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.body.toLowerCase().includes(q),
      ),
    })).filter((s) => s.threads.length > 0);
  }, [q]);

  return (
    <div>
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search spaces and threads"
          className="h-12 border-zinc-800 bg-zinc-950 pl-10 text-sm"
        />
      </div>

      {middle}

      <div className="mt-10 w-full">
        <p className="mb-3 text-xs uppercase tracking-widest text-zinc-600">
          Browse by space
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          {spaces.map((s, i) => {
            const isOpen = q ? true : open === s.name;
            return (
              <div key={s.name} className={i > 0 ? "border-t border-zinc-800/60" : ""}>
                <button
                  onClick={() => setOpen(isOpen && !q ? null : s.name)}
                  className="flex w-full items-center gap-4 bg-zinc-900/50 px-5 py-4 text-left transition-colors hover:bg-zinc-900"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-zinc-100">
                      {s.name}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-zinc-400">
                      {s.body}
                    </span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-zinc-500 transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="space-y-3 bg-zinc-950 px-5 py-5">
                    {s.threads.map((t) => (
                    <Link
                      key={t.title}
                      href={t.href}
                      className="block text-sm leading-relaxed text-zinc-300 hover:text-zinc-100 hover:underline"
                    >
                      {t.title}
                    </Link>
                    ))}
                    <Link
                      href={s.href}
                      className="inline-block pt-1 text-xs text-zinc-500 hover:text-zinc-200"
                    >
                      {s.cta} →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
          {spaces.length === 0 && (
            <p className="bg-zinc-900/50 px-5 py-8 text-center text-sm text-zinc-500">
              Nothing matches that search. Try fewer words.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
