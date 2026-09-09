import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SessionsBrowser } from "./_components/sessions-browser";

export const metadata: Metadata = {
  title: "Workshop - Plex",
  description: "Live Plex build sessions plus on-demand guides for agents, fallbacks and shipping.",
};

const UPCOMING = [
  {
    title: "Prompt an app",
    body: "Watch a full TanStack scaffold appear from one message, narrated live with Q&A throughout.",
    href: "/product/agent",
  },
  {
    title: "Wire fallbacks",
    body: "Add a provider chain with quota-aware messaging to a real project, step by step.",
    href: "/agents/plex-ai",
  },
  {
    title: "Ship it",
    body: "Preview in WebContainer, export to GitHub, and take the repo home before the session ends.",
    href: "/docs",
  },
];

export default function WorkshopPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-2 pb-12 pt-14 md:px-3 md:pt-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Workshop
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          Transform how your team builds software.
        </h1>
        <Button asChild className="mt-7 bg-white text-black hover:bg-zinc-200">
          <Link href="/forum">Request team training</Link>
        </Button>
      </section>

      <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Upcoming events
        </h2>
        <p className="mt-2 max-w-xl text-sm text-zinc-500">
          Ninety-minute live builds. New dates are announced on the blog and in
          the newsletter first.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {UPCOMING.map((u) => (
            <div
              key={u.title}
              className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
            >
              <span className="w-fit rounded border border-emerald-400/30 px-1.5 py-0.5 text-[11px] text-emerald-300">
                Live · 90 min
              </span>
              <p className="mt-3 text-sm font-semibold text-zinc-100">{u.title}</p>
              <p className="mt-1.5 flex-1 text-sm text-zinc-500">{u.body}</p>
              <Link
                href={u.href}
                className="mt-4 text-sm text-zinc-200 hover:underline"
              >
                Prep material →
              </Link>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" asChild className="mt-5 px-0 text-zinc-300 hover:bg-transparent hover:text-zinc-100">
          <Link href="/blog">View all announcements</Link>
        </Button>
      </section>

      <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
        <SessionsBrowser />
      </section>
    </>
  );
}
