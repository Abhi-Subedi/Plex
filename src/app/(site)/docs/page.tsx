import type { Metadata } from "next";

import { DocsExperience } from "./_components/docs-experience";

export const metadata: Metadata = {
  title: "Plex Documentation - Get Started",
  description:
    "Plex is a coding agent for building ambitious software. Understand your codebase, plan and build features, fix bugs, and review changes.",
};

export default function DocsPage() {
  return <DocsExperience />;
}
