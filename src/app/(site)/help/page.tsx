import type { Metadata } from "next";
import Link from "next/link";

import { HelpBrowser } from "./_components/help-browser";

export const metadata: Metadata = {
  title: "Help - Plex",
  description: "Search answers across setup, AI features, models, security and troubleshooting.",
};

const CARDS: { title: string; body: string; href: string }[] = [
  { title: "Changelog", body: "See what is new in Plex", href: "/changelog" },
  { title: "Community Forum", body: "Discuss with other builders", href: "/forum" },
  { title: "Pricing", body: "Compare plans for your team", href: "/pricing" },
];

export default function HelpPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-3xl px-4 pb-16 pt-14 md:pt-20 md:pb-24">
        <h1 className="text-center text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          How can we help?
        </h1>
        <div className="mt-8">
          <HelpBrowser
            middle={
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {CARDS.map((c) => (
                  <Link
                    key={c.title}
                    href={c.href}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center transition-colors hover:border-zinc-600"
                  >
                    <p className="text-sm font-semibold text-zinc-100">{c.title}</p>
                    <p className="mt-1 text-[13px] leading-snug text-zinc-400">{c.body}</p>
                  </Link>
                ))}
              </div>
            }
          />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-zinc-800/60 pt-6 text-xs text-zinc-500">
          <span>
            Status:{" "}
            <Link href="/status" className="text-zinc-300 hover:text-zinc-100">
              All Systems Operational
            </Link>
          </span>
          <Link href="/forum" className="text-zinc-300 hover:text-zinc-100">
            Contact Support
          </Link>
        </div>
      </section>
    </>
  );
}
