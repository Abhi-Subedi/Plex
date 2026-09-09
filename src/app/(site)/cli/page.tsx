import type { Metadata } from "next";

import { CtaBand, FeatureGrid, PageHero } from "../_components/page-blocks";

export const metadata: Metadata = {
  title: "CLI - Plex",
  description: "Every Plex workflow from the terminal: dev, build, database and workers.",
};

const COMMANDS: [string, string][] = [
  ["pnpm install", "Install every dependency in the monorepo."],
  ["pnpm dev", "Start the Next.js app on localhost:3000."],
  ["npx convex dev", "Sync the database and backend functions."],
  ["pnpm dlx inngest-cli@latest dev", "Run background workers locally."],
  ["pnpm build", "Typecheck plus production build."],
  ["pnpm lint", "ESLint across the project."],
];

export default function CliPage() {
  return (
    <>
      <PageHero
        eyebrow="CLI"
        title="The whole studio, scriptable"
        body="Three terminals run everything: the app, the realtime database and the background workers."
      />
      <section className="mx-auto max-w-4xl px-2 pb-16 md:px-3 md:pb-24">
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-1.5 border-b border-zinc-800/80 bg-zinc-900/60 px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-zinc-700" />
            <span className="size-2.5 rounded-full bg-zinc-700" />
            <span className="size-2.5 rounded-full bg-zinc-700" />
            <span className="ml-3 text-xs text-zinc-500">terminal</span>
          </div>
          <div className="space-y-4 p-5 font-mono text-sm md:p-6">
            {COMMANDS.map(([cmd, desc]) => (
              <div key={cmd}>
                <p className="text-zinc-200">
                  <span className="mr-2 text-zinc-600">$</span>
                  {cmd}
                </p>
                <p className="mt-1 font-sans text-xs text-zinc-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FeatureGrid
        items={[
          ["Three processes", "App, database and workers stay independent and restartable."],
          ["Env at boot", "Servers read .env.local once at startup, then hot-reload code."],
          ["Same commands in CI", "Build, lint and typecheck run identically everywhere."],
        ]}
      />
      <CtaBand title="Open a terminal." />
    </>
  );
}
