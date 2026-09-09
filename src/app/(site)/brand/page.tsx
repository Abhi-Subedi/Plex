import type { Metadata } from "next";

import { CtaBand, PageHero } from "../_components/page-blocks";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Brand - Plex",
  description: "The Plex wordmark, favicon set and color usage.",
};

export default function BrandPage() {
  return (
    <>
      <PageHero
        eyebrow="Brand"
        title="One mark, two modes"
        body="The Plex wordmark follows the system theme. Dark wordmark for light mode, light wordmark for dark mode."
      />
      <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-10">
            <Logo className="h-12" />
            <p className="text-xs text-zinc-600">Auto-switches with the theme</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-10">
            <p className="text-sm font-semibold text-zinc-100">Color</p>
            <div className="mt-4 flex gap-3">
              {[
                ["zinc-950", "bg-zinc-950"],
                ["zinc-900", "bg-zinc-900"],
                ["zinc-100", "bg-zinc-100"],
                ["emerald", "bg-emerald-400"],
              ].map(([name, cls]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <span className={`size-12 rounded-xl border border-zinc-800 ${cls}`} />
                  <span className="text-[11px] text-zinc-500">{name}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              Zinc neutrals, white type, one emerald reserved for live status.
            </p>
          </div>
        </div>
      </section>
      <CtaBand title="Make it yours." />
    </>
  );
}
