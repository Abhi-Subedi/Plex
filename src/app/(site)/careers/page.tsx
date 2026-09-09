import type { Metadata } from "next";

import { RolesBoard } from "./_components/roles-board";

export const metadata: Metadata = {
  title: "Careers - Plex",
  description: "Join the applied team building the future of software development.",
};

export default function CareersPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 pb-12 pt-14 md:pt-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Careers
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          Do the best work of your career.
        </h1>
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-zinc-400 md:text-lg">
          <p>
            Plex is changing how software gets built. Small applied team, real
            users, daily shipping. There is a lot of ambitious work left to do.
          </p>
          <p>
            We obsess over talent to an unusual degree and we design the company
            so self-motivated builders do the best work of their careers. The
            work demands our best.
          </p>
          <p className="text-zinc-100">
            If this sounds exciting, we would love to hear from you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-2 pb-16 md:px-3 md:pb-24">
        <RolesBoard />
      </section>
    </>
  );
}
