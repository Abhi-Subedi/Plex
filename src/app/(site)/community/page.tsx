import type { Metadata } from "next";
import Link from "next/link";
import { Megaphone, MessagesSquare, Presentation, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CommunityBoard } from "./_components/community-board";

export const metadata: Metadata = {
  title: "Community - Plex",
  description: "Browse forum spaces, latest posts and ways to take part in the Plex community.",
};

const PARTICIPATE: { icon: typeof Users; title: string; body: string; href: string; cta: string }[] = [
  {
    icon: MessagesSquare,
    title: "Forum",
    body: "Ask questions and post answers where builders actually look.",
    href: "/forum",
    cta: "Visit Forum",
  },
  {
    icon: Presentation,
    title: "Workshop",
    body: "Join live build sessions and bring your own project idea.",
    href: "/workshop",
    cta: "Visit Workshop",
  },
  {
    icon: Users,
    title: "Showcase",
    body: "Publish your build where the whole community browses.",
    href: "/forum",
    cta: "Visit Showcase",
  },
];

const FAQS: [string, string][] = [
  [
    "How do I join the community?",
    "Sign up free, open your dashboard, then introduce yourself in the forum with what you want to build.",
  ],
  [
    "Is Plex free for community use?",
    "Yes. The Starter plan is free and GitHub import plus export carry no plan gates, so showcases cost nothing to make.",
  ],
  [
    "Do you run live sessions?",
    "Workshops run regularly as ninety-minute live builds. Sessions are announced in advance on the workshop page.",
  ],
  [
    "Forum, Showcase, or Guides: where does my post go?",
    "Questions and help go to the forum, finished work goes to the showcase, and reusable knowledge becomes a guide.",
  ],
  [
    "How do I become an Ambassador?",
    "Share builds, answer questions and write guides consistently, then introduce yourself in the forum. Ambassadors moderate spaces and run local sessions.",
  ],
  [
    "Can Plex support my hackathon?",
    "The free tier covers building and syncing, and workshops can align with your dates. Post details in the forum and we will respond.",
  ],
  [
    "Can Plex support my channel or course?",
    "Yes. Showcase student work, use the guides format for lessons, and link the docs for setup so learners start clean.",
  ],
  [
    "How do I reach the team?",
    "The forum for anything public, the help page for troubleshooting, and the changelog to see what shipped this week.",
  ],
];

export default function CommunityPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-2 pb-12 pt-14 md:px-3 md:pt-20">
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          Join the global Plex community.
        </h1>
        <p className="mt-4 max-w-xl text-zinc-400">
          Explore the forum spaces, follow the latest posts, then help run them.
        </p>
        <div className="mt-10">
          <CommunityBoard />
        </div>
      </section>

      {/* Participate */}
      <section id="participate" className="mx-auto max-w-7xl scroll-mt-20 px-2 pb-16 md:px-3 md:pb-24">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Participate
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PARTICIPATE.map((p) => (
            <div key={p.title} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <span className="flex size-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
                <p.icon className="size-4 text-zinc-300" strokeWidth={1.5} />
              </span>
              <p className="mt-3 text-sm font-semibold text-zinc-100">{p.title}</p>
              <p className="mt-1.5 text-sm text-zinc-500">{p.body}</p>
              <Link
                href={p.href}
                className="mt-3 inline-block text-sm text-zinc-200 hover:underline"
              >
                {p.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Lead */}
      <section id="lead" className="mx-auto max-w-7xl scroll-mt-20 px-2 pb-16 md:px-3 md:pb-24">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8">
            <div className="flex items-center gap-2 text-zinc-300">
              <Megaphone className="size-4" strokeWidth={1.5} />
              <p className="text-lg font-semibold tracking-tight text-zinc-50">
                Become a Plex Ambassador
              </p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Ambassadors answer questions, write the guides newcomers actually
              read and keep spaces welcoming. Consistency matters more than
              follower counts.
            </p>
            <Button variant="outline" size="sm" asChild className="mt-5">
              <Link href="/forum">Introduce yourself</Link>
            </Button>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8">
            <div className="flex items-center gap-2 text-zinc-300">
              <Users className="size-4" strokeWidth={1.5} />
              <p className="text-lg font-semibold tracking-tight text-zinc-50">
                Run a local chapter
              </p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Host build nights and study groups where you live. We provide the
              workshop format, starter prompts and a listing on this page.
            </p>
            <Button variant="outline" size="sm" asChild className="mt-5">
              <Link href="/workshop">See how sessions run</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl scroll-mt-20 px-2 pb-16 md:px-3 md:pb-24">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">FAQ</h2>
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
    </>
  );
}
