"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface Role {
  title: string;
  team: string;
  type: string;
  location: string;
}

const ROLES: Role[] = [
  { title: "Frontend Engineer", team: "Engineering", type: "Full-time", location: "Remote" },
  { title: "AI Engineer", team: "Engineering", type: "Full-time", location: "Remote" },
  { title: "DX Engineer", team: "Engineering", type: "Full-time", location: "Remote" },
  { title: "Security Engineer", team: "Engineering", type: "Full-time", location: "Remote" },
  { title: "Engineering Manager", team: "Engineering", type: "Full-time", location: "Remote" },
  { title: "Product Designer", team: "Design", type: "Full-time", location: "Remote" },
  { title: "Design Engineer", team: "Design", type: "Full-time", location: "Remote" },
  { title: "Technical Writer", team: "Design", type: "Full-time", location: "Remote" },
  { title: "Developer Relations", team: "Community", type: "Full-time", location: "Remote" },
  { title: "Support Engineer", team: "Operations", type: "Full-time", location: "Remote" },
];

const TEAMS = ["All teams", "Engineering", "Design", "Community", "Operations"];
const LOCATIONS = ["All locations", "Remote"];

function Select({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  label: string;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-zinc-400">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-sm text-zinc-200 outline-none focus:border-zinc-600"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function RolesBoard() {
  const [team, setTeam] = useState(TEAMS[0]);
  const [location, setLocation] = useState(LOCATIONS[0]);

  const rows = useMemo(
    () =>
      ROLES.filter(
        (r) =>
          (team === TEAMS[0] || r.team === team) &&
          (location === LOCATIONS[0] || r.location === location),
      ),
    [team, location],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-zinc-400">
          Open roles{" "}
          <span className="text-zinc-600">
            ({rows.length} of {ROLES.length})
          </span>
        </p>
        <div className="flex gap-2">
          <Select value={team} onChange={setTeam} options={TEAMS} label="Filter by team" />
          <Select
            value={location}
            onChange={setLocation}
            options={LOCATIONS}
            label="Filter by location"
          />
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800">
        {rows.map((r, i) => (
          <div
            key={r.title}
            className={`flex items-center gap-4 bg-zinc-900/50 px-4 py-4 transition-colors hover:bg-zinc-900 md:px-5 ${
              i > 0 ? "border-t border-zinc-800/60" : ""
            }`}
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-zinc-100">{r.title}</p>
              <p className="mt-0.5 truncate text-xs text-zinc-500">
                {r.team} · {r.type} · {r.location}
              </p>
            </div>
            <Link
              href="/forum"
              className="inline-flex shrink-0 items-center gap-1 rounded-md border border-zinc-800 px-3 py-1.5 text-xs text-zinc-300 hover:border-zinc-600 hover:text-zinc-100"
            >
              Apply <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="bg-zinc-900/50 px-5 py-8 text-center text-sm text-zinc-500">
            No roles match those filters. Try widening them.
          </p>
        )}
      </div>
      <p className="mt-4 text-xs text-zinc-600">
        Applications start with an introduction in the forum. Tell us what you built and what you want to own.
      </p>
    </div>
  );
}
