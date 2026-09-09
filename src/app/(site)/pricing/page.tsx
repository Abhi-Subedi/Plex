import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StackStrip } from "../_components/stack-strip";
import { PricingTable } from "./_components/pricing-table";

export const metadata: Metadata = {
  title: "Pricing - Plex",
  description: "Simple pricing: start free, upgrade when your team and quotas grow.",
};

const FAQS: [string, string][] = [
  [
    "What is the right plan for me?",
    "Solo builders start on Hobby and move to Individual when daily shipping needs priority routing and higher caps. Teams take Teams. Regulated or large-scale orgs take Enterprise.",
  ],
  [
    "What are payment options?",
    "Major credit cards, billed monthly or yearly. Yearly billing saves twenty percent on Individual and Teams.",
  ],
  [
    "How does usage-based pricing work?",
    "Plex plans are seat-based, not metered. Model usage is separate and follows each AI provider's own quotas and billing: Google, Groq and OpenRouter.",
  ],
  [
    "Are prices inclusive of taxes?",
    "No. Taxes are calculated at checkout based on your billing region.",
  ],
  [
    "How do I manage usage in my organization?",
    "The dashboard shows every project with history, and message plus export records give leads a real trail of agent activity to review.",
  ],
  [
    "How does Plex use my data?",
    "Prompts plus only the files a task touches go to your configured providers. Plex trains no models on your data. The full policy lives on the Data Use page.",
  ],
  [
    "Can I buy from a reseller or third party?",
    "Not today. All plans are sold direct, and Enterprise agreements go through our team.",
  ],
  [
    "Where can I ask more questions?",
    "The Help page covers quotas and setup, the Forum reaches builders, and Enterprise questions go through the Enterprise page.",
  ],
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-2 pb-10 pt-14 text-center md:px-3 md:pt-20">
        <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          Pricing
        </h1>
        <div className="mx-auto mt-10 max-w-7xl text-left">
          <PricingTable />
        </div>
      </section>

      {/* Stack strip */}
      <section className="border-y border-zinc-800/80 bg-zinc-900/40">
        <div className="mx-auto max-w-7xl px-2 py-8 md:px-3">
          <p className="text-center text-xs uppercase tracking-widest text-zinc-600">
            Built on technology teams already trust
          </p>
          <div className="mt-5">
            <StackStrip />
          </div>
        </div>
      </section>

      {/* Q&A */}
      <section className="mx-auto max-w-4xl px-2 py-16 md:px-3 md:py-24">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Questions and Answers
        </h2>
        <Accordion type="single" collapsible className="mt-6">
          {FAQS.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="border-zinc-800">
              <AccordionTrigger className="text-left text-sm text-zinc-100 hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-zinc-400">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Finale */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-2 pb-24 pt-4 text-center md:px-3 md:pb-32">
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          Get started with Plex.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild className="bg-white text-black hover:bg-zinc-200">
            <Link href="/app">Start building</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/enterprise">Contact sales</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
