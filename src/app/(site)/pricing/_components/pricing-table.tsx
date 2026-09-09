"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Cycle = "monthly" | "yearly";

const TIERS: {
  name: string;
  blurb: string;
  monthly: string;
  yearly: string;
  note: string;
  cta: string;
  href: string;
  featured?: boolean;
  features: string[];
}[] = [
  {
    name: "Hobby",
    blurb: "For trying Plex and side projects.",
    monthly: "Free",
    yearly: "Free",
    note: "Free forever",
    cta: "Try Plex",
    href: "/app",
    features: [
      "Unlimited projects",
      "Full IDE with ghost suggestions",
      "Agent on provider free tiers",
      "GitHub import and export",
      "Community support",
    ],
  },
  {
    name: "Individual",
    blurb: "For builders shipping daily.",
    monthly: "$20",
    yearly: "$16",
    note: "per seat, per month",
    cta: "Get Pro",
    href: "/app",
    featured: true,
    features: [
      "Everything in Hobby",
      "Priority provider routing",
      "Higher agent iteration caps",
      "Faster previews",
      "Priority support",
    ],
  },
  {
    name: "Teams",
    blurb: "For teams that ship together.",
    monthly: "$40",
    yearly: "$32",
    note: "per seat, per month",
    cta: "Get Teams",
    href: "/app",
    features: [
      "Everything in Individual",
      "Shared workspaces",
      "Review-gated agent fleets",
      "Team usage overview",
      "Onboarding help",
    ],
  },
  {
    name: "Enterprise",
    blurb: "For organizations with scale needs.",
    monthly: "Custom",
    yearly: "Custom",
    note: "annual agreement",
    cta: "Contact sales",
    href: "/enterprise",
    features: [
      "Everything in Teams",
      "SSO-ready authentication",
      "Audit trails",
      "Dedicated quotas",
      "SLA support",
    ],
  },
];

export function PricingTable() {
  const [cycle, setCycle] = useState<Cycle>("monthly");

  return (
    <div>
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-zinc-800 bg-zinc-900/60 p-1">
          {(["monthly", "yearly"] as Cycle[]).map((c) => (
            <button
              key={c}
              onClick={() => setCycle(c)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm capitalize transition-colors",
                cycle === c
                  ? "bg-zinc-100 text-zinc-950"
                  : "text-zinc-400 hover:text-zinc-100",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-4">
        {TIERS.map((t) => (
          <div
            key={t.name}
            className={`flex flex-col rounded-2xl border p-6 ${
              t.featured
                ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                : "border-zinc-800 bg-zinc-900/50"
            }`}
          >
            <p className={`text-sm font-semibold ${t.featured ? "text-zinc-900" : "text-zinc-100"}`}>
              {t.name}
            </p>
            <p className={`mt-1 text-xs ${t.featured ? "text-zinc-600" : "text-zinc-500"}`}>
              {t.blurb}
            </p>
            <p className="mt-4 text-4xl font-semibold tracking-tight">
              {cycle === "monthly" ? t.monthly : t.yearly}
            </p>
            <p className={`mt-1 text-xs ${t.featured ? "text-zinc-600" : "text-zinc-500"}`}>
              {t.name === "Hobby"
                ? t.note
                : cycle === "yearly" && t.name !== "Enterprise"
                  ? `${t.note}, billed yearly`
                  : t.note}
            </p>
            <Button
              asChild
              className={`mt-6 w-full ${
                t.featured
                  ? "bg-zinc-950 text-white hover:bg-zinc-800"
                  : "bg-white text-black hover:bg-zinc-200"
              }`}
            >
              <Link href={t.href}>{t.cta}</Link>
            </Button>
            <ul className="mt-6 space-y-2.5">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check
                    className={`mt-0.5 size-4 shrink-0 ${
                      t.featured ? "text-zinc-900" : "text-emerald-300"
                    }`}
                  />
                  <span className={t.featured ? "text-zinc-700" : "text-zinc-400"}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-zinc-600">
        Model usage follows each AI provider&apos;s own quotas and billing. Prices in USD, taxes calculated at checkout.
      </p>
    </div>
  );
}
