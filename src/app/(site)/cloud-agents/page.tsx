import type { Metadata } from "next";

import { CtaBand, FeatureGrid, PageHero, SplitBlock } from "../_components/page-blocks";
import { Shot } from "../_components/mockups";

export const metadata: Metadata = {
  title: "Cloud Agents - Plex",
  description:
    "Parallel Plex agents that build, test and demo end to end while you review.",
};

export default function CloudAgentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Cloud Agents"
        title="A fleet that works while you review"
        body="Agents take coding, testing and review lanes across repositories and report back with walkthroughs."
      />
      <FeatureGrid
        items={[
          ["Parallel lanes", "Coding, testing and review agents per repository."],
          ["Reasoning logs", "Every decision narrated as it happens."],
          ["Timelines", "Progress, duration and success tracked per run."],
          ["Checklists", "Review PRs, run tests, sync repos, set properties."],
          ["Walkthroughs", "Done means a summary you can actually review."],
          ["Review gates", "Nothing merges without approval."],
        ]}
      />
      <SplitBlock
        title="Orchestrated, not chaotic"
        body="A fleet overview tracks every agent: what it is doing, which repo it touches and whether it is coding, testing or reviewing."
        points={[
          "Live status per agent and repo",
          "Planned jobs on a shared timeline",
          "Repository connections at a glance",
        ]}
      >
        <Shot
          n={10}
          title="plex / orchestration"
          alt="Plex agent orchestration fleet: coding, testing and review agents across repositories"
        />
      </SplitBlock>
      <CtaBand title="Launch your first fleet." />
    </>
  );
}
