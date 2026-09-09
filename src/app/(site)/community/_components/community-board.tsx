"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  Image as ImageIcon,
  Megaphone,
  MessagesSquare,
  Rocket,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { POSTS } from "../../blog/_components/blog-index";
import { Shot } from "../../_components/mockups";

const CATEGORIES: {
  name: string;
  body: string;
  href: string;
  icon: typeof Megaphone;
  latest: number;
}[] = [
  {
    name: "Announcements",
    body: "Release notes and maintenance windows from the Plex team.",
    href: "/changelog",
    icon: Megaphone,
    latest: 0,
  },
  {
    name: "Showcase",
    body: "Finished apps with repos, prompts and lessons learned.",
    href: "/forum",
    icon: ImageIcon,
    latest: 5,
  },
  {
    name: "Questions",
    body: "Setup, quotas, GitHub sync and editor quirks, answered by builders.",
    href: "/forum",
    icon: MessagesSquare,
    latest: 1,
  },
  {
    name: "Guides",
    body: "Community how-tos for teams, classrooms and solo builders.",
    href: "/docs",
    icon: BookOpen,
    latest: 6,
  },
  {
    name: "Roadmap",
    body: "What the community voted up and what ships next.",
    href: "/blog",
    icon: Rocket,
    latest: 7,
  },
  {
    name: "Events",
    body: "Ninety-minute live builds, announced in advance.",
    href: "/workshop",
    icon: CalendarDays,
    latest: 2,
  },
];

const TAGS = ["All", "Agents", "Product", "Editor", "Company"] as const;

type Tab = "Categories" | "Tags" | "Latest";

export function CommunityBoard() {
  const [tab, setTab] = useState<Tab>("Categories");
  const [tag, setTag] = useState<(typeof TAGS)[number]>("All");

  const latest = useMemo(() => POSTS.slice(0, 6), []);
  const tagged = useMemo(
    () => POSTS.filter((p) => tag === "All" || p.tag === tag),
    [tag],
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[180px_minmax(0,1fr)_300px]">
      {/* Anchor nav */}
      <aside className="hidden lg:block">
        <nav className="sticky top-20 space-y-1">
          {[
            ["Featured", "#featured"],
            ["Categories", "#categories"],
            ["Latest", "#latest"],
            ["Participate", "#participate"],
            ["Lead", "#lead"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="block rounded-md px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100"
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main column */}
      <div className="min-w-0">
        <section id="featured" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
            Featured Posts
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { post: 0, shot: 10, alt: "Plex agent orchestration fleet" },
              { post: 4, shot: 5, alt: "Plex task execution view" },
              { post: 5, shot: 2, alt: "Plex editor with agent conversation" },
            ].map(({ post, shot, alt }) => {
              const p = POSTS[post];
              return (
                <Link
                  key={p.title}
                  href={p.href}
                  className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50"
                >
                  <Shot n={shot} title="plex" alt={alt} className="rounded-none border-0" />
                  <div className="p-4">
                    <p className="text-[11px] text-zinc-600">
                      {p.date} · {p.tag}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-zinc-100 group-hover:underline">
                      {p.title}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="mt-10 flex gap-1 border-b border-zinc-800">
          {(["Categories", "Tags", "Latest"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-4 py-2.5 text-sm transition-colors",
                tab === t
                  ? "border-b-2 border-zinc-100 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-200",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Categories" && (
          <div id="categories" className="scroll-mt-20 divide-y divide-zinc-800/60">
            {CATEGORIES.map((c) => {
              const post = POSTS[c.latest];
              return (
                <div key={c.name} className="flex items-start gap-4 py-5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60">
                    <c.icon className="size-4 text-zinc-300" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={c.href}
                      className="text-sm font-semibold text-zinc-100 hover:underline"
                    >
                      {c.name}
                    </Link>
                    <p className="mt-0.5 text-sm text-zinc-500">{c.body}</p>
                    <Link
                      href={post.href}
                      className="mt-1.5 block truncate text-xs text-zinc-600 hover:text-zinc-300"
                    >
                      Latest: {post.title}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "Tags" && (
          <div className="py-6">
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                    tag === t
                      ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                      : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-100",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="mt-4 divide-y divide-zinc-800/60 border-y border-zinc-800/60">
              {tagged.map((p) => (
                <Link
                  key={p.title}
                  href={p.href}
                  className="flex items-baseline justify-between gap-3 py-3 text-sm"
                >
                  <span className="truncate text-zinc-200">{p.title}</span>
                  <span className="shrink-0 text-xs text-zinc-600">{p.date}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {tab === "Latest" && (
          <div className="divide-y divide-zinc-800/60 border-b border-zinc-800/60">
            {POSTS.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="flex items-baseline justify-between gap-3 py-3.5 text-sm"
              >
                <span>
                  <span className="block truncate text-zinc-100">{p.title}</span>
                  <span className="mt-0.5 block text-xs text-zinc-600">
                    {p.tag} · {p.date}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Latest rail */}
      <aside id="latest" className="scroll-mt-20">
        <div className="lg:sticky lg:top-20">
          <h3 className="text-sm font-semibold text-zinc-200">Latest</h3>
          <div className="mt-4 space-y-4">
            {latest.map((p) => (
              <Link key={p.title} href={p.href} className="group block">
                <p className="text-sm leading-snug text-zinc-300 group-hover:text-zinc-100 group-hover:underline">
                  {p.title}
                </p>
                <p className="mt-1 text-[11px] text-zinc-600">
                  {p.tag} · {p.date}
                </p>
              </Link>
            ))}
          </div>
          <Link
            href="/blog"
            className="mt-5 inline-block rounded-md border border-zinc-800 px-3 py-1.5 text-xs text-zinc-300 hover:border-zinc-600 hover:text-zinc-100"
          >
            More
          </Link>
        </div>
      </aside>
    </div>
  );
}
