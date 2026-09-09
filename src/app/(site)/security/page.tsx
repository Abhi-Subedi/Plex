import type { Metadata } from "next";

import { CtaBand, FeatureGrid, PageHero } from "../_components/page-blocks";

export const metadata: Metadata = {
  title: "Security - Plex",
  description: "How Plex protects accounts, projects and secrets.",
};

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Security without the theater"
        body="Managed auth, per-user isolation and server-side secrets. The practices, stated plainly."
      />
      <FeatureGrid
        items={[
          ["Managed auth", "Sign-in and sessions through a dedicated auth provider with GitHub OAuth."],
          ["Per-user isolation", "Every database call checks ownership before reading or writing."],
          ["Server-side secrets", "Provider keys never ship in client bundles or public variables."],
          ["Encrypted transport", "Everything moves over HTTPS; database connections are encrypted."],
          ["Tracked errors", "Client, server and worker errors flow into monitored tracking."],
          ["Responsible disclosure", "Found something? Report it and we will respond within two business days."],
        ]}
      />
      <CtaBand title="Build on solid ground." />
    </>
  );
}
