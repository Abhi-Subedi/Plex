import type { Metadata } from "next";
import Link from "next/link";

import { ForumBrowser } from "./_components/forum-browser";

export const metadata: Metadata = {
  title: "Forum - Plex",
  description: "Browse forum spaces, search real threads and learn the posting guidelines.",
};

const CARDS: { title: string; body: string; href: string }[] = [
  { title: "Showcase a build", body: "Post finished apps with repos", href: "/blog" },
  { title: "Read the guidelines", body: "How good threads work here", href: "#guidelines" },
  { title: "Get unstuck", body: "Answered questions live here", href: "/help" },
];

const GUIDELINES: [string, string][] = [
  ["Search first", "The answer exists more often than not. Search spaces and threads before posting."],
  ["Share code", "Repo links, prompts and error lines beat descriptions. Recreate, don't narrate."],
  ["One topic per thread", "Keep threads focused so answers stay findable for the next builder."],
  ["Be kind", "Critique work, never people. Moderated daily, no exceptions."],
];

export default function ForumPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-3xl px-4 pb-4 pt-14 md:pt-20">
        <h1 className="text-center text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          Where builders talk.
        </h1>
        <div className="mt-8">
          <ForumBrowser
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
      </section>

      <section id="guidelines" className="mx-auto w-full max-w-3xl scroll-mt-20 px-4 pb-16 pt-12 md:pb-24">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-zinc-50">
          Posting guidelines
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {GUIDELINES.map(([t, b]) => (
            <div key={t} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <p className="text-sm font-semibold text-zinc-100">{t}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{b}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-zinc-800/60 pt-6 text-xs text-zinc-500">
          <span>
            Status:{" "}
            <Link href="/status" className="text-zinc-300 hover:text-zinc-100">
              All Systems Operational
            </Link>
          </span>
          <Link href="/help" className="text-zinc-300 hover:text-zinc-100">
            Contact Support
          </Link>
        </div>
      </section>
    </>
  );
}
