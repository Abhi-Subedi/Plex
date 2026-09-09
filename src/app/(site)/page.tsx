import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StackStrip } from "./_components/stack-strip";
import { ModelChainMock, Photo, Shot } from "./_components/mockups";

export const metadata: Metadata = {
  title: "Plex - Your coding agent for building ambitious software",
  description:
    "Plex scaffolds complete web apps, edits code with you, previews live, and syncs with GitHub. Free to start.",
};

function Section({
  eyebrow,
  title,
  body,
  link,
  linkHref = "/",
  children,
  flip,
  layout = "split",
}: {
  eyebrow?: string;
  title: string;
  body: string;
  link?: string;
  linkHref?: string;
  children: React.ReactNode;
  flip?: boolean;
  layout?: "split" | "stack";
}) {
  return (
    <div className="mx-auto my-20 w-full max-w-7xl px-2 md:my-28 md:px-3">
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 px-4 py-12 md:px-10 md:py-16">
        {layout === "split" ? (
          <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-2">
            <div className={flip ? "lg:order-2" : ""}>
              <SectionHeading eyebrow={eyebrow} title={title} body={body} link={link} linkHref={linkHref} />
            </div>
            <div className={flip ? "lg:order-1" : ""}>{children}</div>
          </div>
        ) : (
          <div>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading eyebrow={eyebrow} title={title} body={body} link={link} linkHref={linkHref} centered />
            </div>
            <div className="mt-10">{children}</div>
          </div>
        )}
      </section>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
  link,
  linkHref = "/",
  centered,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  link?: string;
  linkHref?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "text-center" : ""}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
        {title}
      </h2>
      <p className={`mt-4 text-zinc-400 ${centered ? "mx-auto max-w-xl" : "max-w-md"}`}>
        {body}
      </p>
      {link && (
        <Link
          href={linkHref}
          className="mt-4 inline-flex items-center gap-1 text-sm text-zinc-200 hover:underline"
        >
          {link} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto my-20 w-full max-w-7xl px-2 md:my-28 md:px-3">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 px-4 py-12 md:px-10 md:py-16">
        {children}
      </div>
    </div>
  );
}

function KbdRow({ items }: { items: [string, string][] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {items.map(([label, kbd]) => (
        <span
          key={label}
          className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-300"
        >
          {label}
          <kbd className="rounded border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
            {kbd}
          </kbd>
        </span>
      ))}
    </div>
  );
}

const WHY = [
  ["Ghost suggestions", "Completions appear inline as you type, in any language the editor supports."],
  ["Full project scaffolds", "package.json, configs, routes, styles and README. Never a loose component."],
  ["Live preview plus terminal", "Boot the app in a WebContainer and watch output stream, right beside the code."],
  ["Free GitHub sync", "Import any repo, export any project. No plan gates, ever."],
  ["Model fallback chain", "Gemini, Groq and OpenRouter in one chain. Quota hit? The next provider answers."],
  ["Real file tree", "Folders, renames, binaries and tabs. A project structure that actually builds."],
];

const WEEK = ["Acme Research Dashboard", "Live Telemetry Pipeline", "Zero-Downtime Deploys"];
const MONTH = ["Binary Protocol Parser", "Edge Cache Invalidation"];

const CHANGELOG: [string, string][] = [
  ["Sep 8, 2026", "OpenRouter fallback chain across Gemini, Groq and OpenRouter"],
  ["Sep 8, 2026", "Groq fallback with quota-aware messaging"],
  ["Sep 8, 2026", "Plex rename across UI, agent and infrastructure"],
  ["Sep 8, 2026", "Import and export free for everyone: plan gates removed"],
  ["Sep 8, 2026", "Path-aware file tools: nested scaffolds that build"],
];

const HIGHLIGHTS: [string, string, string][] = [
  ["Sep 2026", "Agents", "Agentic file tools with automatic folder scaffolding"],
  ["Sep 2026", "Editor", "Ghost suggestions plus Cmd+K quick-edit"],
  ["Sep 2026", "Preview", "WebContainer preview with streaming terminal"],
  ["Sep 2026", "Sync", "Two-way GitHub import and export"],
];

const PLAN = [
  "Define requirements",
  "Create MissionControlView component",
  "Update window manager",
  "Implement expose logic",
  "Add multiplayer mode",
];

export default function LandingPage() {
  return (
    <>

      {/* Hero: headline plus CTAs stay in the first viewport */}
      <section className="mx-auto max-w-7xl px-2 pb-10 pt-16 text-center md:px-3 md:pt-24">
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Plex is your coding agent for building ambitious software.
        </h1>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button asChild className="bg-white text-black hover:bg-zinc-200">
            <Link href="/app">Get started</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/app">Live demo</Link>
          </Button>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <Shot
            n={1}
            title="plex / ide"
            alt="Plex IDE on a desktop: file explorer, Python editor, AI tools and agent conversation"
          />
        </div>
      </section>

      {/* Stack strip: logo-only */}
      <section className="border-y border-zinc-800/80 bg-zinc-900/40">
        <div className="mx-auto max-w-7xl px-2 py-8 md:px-3">
          <p className="text-center text-xs uppercase tracking-widest text-zinc-600">
            Powered by world-class technology
          </p>
          <div className="mt-5">
            <StackStrip />
          </div>
        </div>
      </section>

      <Section
        eyebrow="Agent"
        title="Agents turn ideas into code"
        body="Describe the app. Plex scaffolds the full project: configs, routes, styles. Then it keeps iterating with you file by file while you make the decisions."
        link="Learn about agentic development"
        linkHref="/product/agent"
      >
        <Shot
          n={2}
          title="plex / agent"
          alt="Plex editor with AI agent conversation, task planning and terminal output"
        />
      </Section>

      <Section
        title="Command everything"
        body="Files, tasks, terminal and agents. Your entire workspace driven from one place. Memorise three shortcuts and never touch the mouse."
        link="See all shortcuts"
        linkHref="/docs"
        layout="stack"
      >
        <Shot
          n={3}
          title="plex / workspace"
          alt="Plex workspace laptop with OAuth flow code, task board and terminal"
        />
        <KbdRow
          items={[
            ["New project", "⌘J"],
            ["Import from GitHub", "⌘I"],
            ["Command palette", "⌘K"],
          ]}
        />
      </Section>

      <Section
        title="Every surface, one glance"
        body="Task cards, live editor, agent status, deploy terminal and metrics. A grid view of the whole project so you always know exactly where things stand."
        flip
      >
        <Shot
          n={4}
          title="plex / mission control"
          alt="Plex mission control grid: task planning cards, code editor, AI agent, terminal and metrics"
        />
      </Section>

      <Section
        title="From prompt to plan to code"
        body="Every task becomes an implementation plan with live progress, an agent narrating each step, and code plus terminal output updating underneath."
        layout="stack"
      >
        <Shot
          n={5}
          title="plex / task execution"
          alt="Plex task execution: implementation plan, agent conversation, code view and terminal"
        />
        <ul className="mx-auto mt-6 grid max-w-2xl gap-1.5 sm:grid-cols-2">
          {PLAN.map((p, i) => (
            <li key={p} className="flex items-center gap-2 text-sm text-zinc-400">
              <span
                className={
                  i < 2
                    ? "flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-[10px] text-emerald-300"
                    : "size-4 shrink-0 rounded-full border border-zinc-700"
                }
              >
                {i < 2 ? "✓" : ""}
              </span>
              {p}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Autonomy"
        title="Works autonomously, runs in parallel"
        body="Hand off a task and keep working. Cloud agents build, test and demo end to end: reasoning log, timeline and checklist included. They report back with a walkthrough."
        link="Learn about cloud agents"
        linkHref="/cloud-agents"
      >
        <Shot
          n={6}
          title="plex / cloud agent"
          alt="Plex cloud agent with reasoning log, execution timeline, checklist and test results"
        />
      </Section>

      <Section
        title="Agent activity, always visible"
        body="This week, this month. Every autonomous run accounted for, down to the minute. Review the walkthrough, then send a follow-up."
        flip
        layout="stack"
      >
        <Shot
          n={7}
          title="plex / activity"
          alt="Plex agent activity dashboard with weekly projects, parallel agents and monthly tasks"
        />
        <div className="mx-auto mt-6 grid max-w-2xl gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              This Week
            </p>
            {WEEK.map((t) => (
              <p key={t} className="py-0.5 text-zinc-400">• {t}</p>
            ))}
          </div>
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              This Month
            </p>
            {MONTH.map((t) => (
              <p key={t} className="py-0.5 text-zinc-400">• {t}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* Enterprise */}
      <CardShell>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Scale
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            Develop enduring software
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Deployments, error rates, language usage and live agent workload.
            Observability for every agent, every repo, every hour. Secure
            per-user workspaces that scale with your team.
          </p>
            <Button variant="outline" asChild className="mt-6">
              <Link href="/enterprise">Explore enterprise</Link>
            </Button>
        </div>
        <div className="mt-10">
          <Shot
            n={8}
            title="plex / analytics"
            alt="Plex analytics: deployment frequency, error rates, language usage and agent workload"
          />
        </div>
      </CardShell>

      <Section
        title="In every tool, at every step"
        body="Chat, dashboard, terminal, code review with agent comments, and metrics. Connected. Plex reviews PRs, flags vulnerabilities and keeps the whole loop in sync."
        flip
      >
        <Shot
          n={9}
          title="plex / collaboration"
          alt="Plex collaboration graph: team chat, dashboard, terminal, code editor, PR review and metrics"
        />
      </Section>

      {/* Frontier */}
      <CardShell>
        <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Frontier
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
              Use the best model for every task
            </h2>
            <p className="mt-4 max-w-md text-zinc-400">
              One request walks a fallback chain: Gemini, then Groq, then
              OpenRouter. A quota hit on one provider just means the next one
              answers, while fleets of agents work your repos in parallel.
            </p>
          </div>
          <ModelChainMock />
        </div>
        <div className="mt-10">
          <Shot
            n={10}
            title="plex / orchestration"
            alt="Plex agent orchestration fleet: coding, testing and review agents across repositories"
          />
        </div>
      </CardShell>

      {/* Workspace */}
      <Section
        title="Every project, one home"
        body="Dashboard, recents, active agent tasks and review states. Pick up exactly where you left off, in any project."
      >
        <Shot
          n={11}
          title="plex / repositories"
          alt="Plex repositories view with recent projects and active agent tasks"
        />
      </Section>

      {/* Why Plex */}
      <section className="mx-auto max-w-7xl px-2 py-24 md:px-3 md:py-36">
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
          The new way to build software.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map(([t, b]) => (
            <div key={t} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <p className="text-sm font-semibold text-zinc-100">{t}</p>
              <p className="mt-2 text-sm text-zinc-500">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Company: image backdrop, feathered top and bottom */}
      <section className="mx-auto my-20 w-full max-w-7xl px-2 md:my-28 md:px-3">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800">
          <Photo
            n={12}
            alt="Plex team planning autonomous agent orchestration in the office"
            className="absolute inset-0 h-full w-full rounded-none border-0 object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/55 to-zinc-950" />
          <div className="relative mx-auto max-w-2xl px-6 py-28 text-center md:py-36">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
              Plex is an applied team focused on the future of software development.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-300">
              We build the coding agent we always wanted. One that scaffolds
              whole apps, explains its work, and hands you something that runs.
            </p>
            <Button asChild className="mt-8 bg-white text-black hover:bg-zinc-200">
              <Link href="/careers">Join us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Changelog */}
      <section className="mx-auto max-w-7xl px-2 py-24 md:px-3 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Changelog</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/changelog">
              Read changelog <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-5">
          {CHANGELOG.map(([date, text]) => (
            <div key={text} className="bg-zinc-950 p-4">
              <p className="text-[11px] text-zinc-600">{date}</p>
              <p className="mt-1 text-sm text-zinc-300">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl px-2 pb-24 md:px-3 md:pb-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Recent highlights</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/changelog#highlights">
              Read more <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map(([date, tag, text]) => (
            <div key={text} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <p className="text-[11px] text-zinc-600">
                {date} · {tag}
              </p>
              <p className="mt-1 text-sm text-zinc-200">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto flex min-h-[50vh] max-w-7xl flex-col items-center justify-center px-2 text-center md:px-3">
        <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">Try Plex now.</h2>
        <p className="mt-5 max-w-xl text-zinc-400">
          Describe your app. Plex scaffolds it, edits with you, previews it live
          and syncs it to GitHub. Free to start.
        </p>
        <Button asChild className="mt-8 bg-white text-black hover:bg-zinc-200">
          <Link href="/app">
            Get started <ArrowRight className="size-4" />
          </Link>
        </Button>
      </section>
    </>
  );
}
