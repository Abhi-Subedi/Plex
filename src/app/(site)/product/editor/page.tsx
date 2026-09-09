import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Command, Languages, Layers, Map, Sparkles, SquareTerminal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand, PageHero } from "../../_components/page-blocks";
import { Shot } from "../../_components/mockups";

export const metadata: Metadata = {
  title: "Editor - Plex",
  description:
    "CodeMirror IDE with ghost suggestions, Cmd+K quick-edit, minimap, tabs and seven language modes.",
};

const ROWS: { icon: typeof Sparkles; title: string; body: string; href: string }[] = [  {
    icon: Sparkles,
    title: "Ghost suggestions",
    body: "Inline completions across seven languages, debounced so they stay out of the typist's way.",
    href: "/docs",
  },
  {
    icon: Command,
    title: "Cmd+K quick-edit",
    body: "Select code, describe the change in plain language, get the rewrite. URLs become scraped docs.",
    href: "/docs",
  },
  {
    icon: Languages,
    title: "Seven language modes",
    body: "JavaScript, TypeScript, CSS, HTML, JSON, Markdown and Python with folding and bracket matching.",
    href: "/product/editor",
  },
  {
    icon: Map,
    title: "Minimap and guides",
    body: "Code overview plus indentation guides for navigating deep files without getting lost.",
    href: "/product/editor",
  },
  {
    icon: Layers,
    title: "Tabs and breadcrumbs",
    body: "Multi-file editing with auto-save and a full navigation trail back to the project root.",
    href: "/product/editor",
  },
  {
    icon: SquareTerminal,
    title: "Terminal beside code",
    body: "A streaming xterm feed runs installs and dev servers right next to the file being edited.",
    href: "/product/automation",
  },
];

export default function EditorPage() {
  return (
    <>
      <PageHero
        eyebrow="Product"
        title="An editor that writes with you"
        body="CodeMirror power with an AI layer: ghost completions as you type and natural-language rewrites of any selection."
      />

      {/* Split intro */}
      <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
        <div className="grid items-center gap-10 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-4 py-12 md:px-10 md:py-16 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
              AI inside the keystroke loop
            </h2>
            <p className="mt-3 max-w-md text-zinc-400">
              Suggestions and quick-edits ride the same provider fallback chain
              as chat, returning structured results the editor applies directly.
            </p>
          </div>
          <Shot
            n={3}
            title="plex / workspace"
            alt="Plex workspace laptop with OAuth flow code, task board and terminal"
          />
        </div>
      </section>

      {/* Stacked icon rows */}
      <section className="mx-auto max-w-4xl px-2 pb-16 md:px-3 md:pb-24">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Everything within reach
        </h2>
        <div className="mt-6">
          {ROWS.map((row) => (
            <div
              key={row.title}
              className="flex items-start gap-4 border-t border-zinc-800/80 py-5 last:border-b"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60">
                <row.icon className="size-4 text-zinc-300" strokeWidth={1.5} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-zinc-100">{row.title}</p>
                <p className="mt-1 text-sm text-zinc-500">{row.body}</p>
              </div>
              <Link
                href={row.href}
                className="mt-0.5 inline-flex shrink-0 items-center gap-1 text-sm text-zinc-300 hover:text-zinc-100"
              >
                Learn more <ArrowRight className="size-3.5" />
              </Link>
            </div>
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

      <CtaBand title="Try Plex now." />
    </>
  );
}
