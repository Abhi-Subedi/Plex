import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PageHero({
  eyebrow,
  title,
  body,
  primary = "Get started",
}: {
  eyebrow: string;
  title: string;
  body: string;
  primary?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-2 pb-12 pt-14 text-center md:px-3 md:pt-20">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
        {eyebrow}
      </p>
      <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
        {title}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-zinc-400">{body}</p>
      <Button asChild className="mt-7 bg-white text-black hover:bg-zinc-200">
        <Link href="/app">
          {primary} <ArrowRight className="size-4" />
        </Link>
      </Button>
    </section>
  );
}

export function FeatureGrid({ items }: { items: [string, string][] }) {
  return (
    <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([t, b]) => (
          <div key={t} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <p className="text-sm font-semibold text-zinc-100">{t}</p>
            <p className="mt-2 text-sm text-zinc-500">{b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SplitBlock({
  title,
  body,
  points,
  children,
  flip,
}: {
  title: string;
  body: string;
  points?: string[];
  children: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
      <div className="grid items-center gap-10 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-4 py-12 md:px-10 md:py-16 lg:grid-cols-2">
        <div className={flip ? "lg:order-2" : ""}>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
            {title}
          </h2>
          <p className="mt-3 max-w-md text-zinc-400">{body}</p>
          {points && (
            <ul className="mt-5 space-y-1.5">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-zinc-400">
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-[10px] text-emerald-300">
                    ✓
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={flip ? "lg:order-1" : ""}>{children}</div>
      </div>
    </section>
  );
}

export function StepsBlock({ steps }: { steps: [string, string][] }) {
  return (
    <section className="mx-auto max-w-7xl px-2 pb-16 md:px-3 md:pb-24">
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map(([t, b], i) => (
          <div key={t} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <p className="font-mono text-xs text-zinc-600">0{i + 1}</p>
            <p className="mt-2 text-sm font-semibold text-zinc-100">{t}</p>
            <p className="mt-2 text-sm text-zinc-500">{b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CtaBand({ title }: { title: string }) {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-2 pb-24 pt-4 text-center md:px-3 md:pb-32">
      <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
        {title}
      </h2>
      <Button asChild className="mt-7 bg-white text-black hover:bg-zinc-200">
        <Link href="/app">
          Get started <ArrowRight className="size-4" />
        </Link>
      </Button>
    </section>
  );
}
