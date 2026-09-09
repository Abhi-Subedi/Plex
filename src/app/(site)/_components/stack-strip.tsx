"use client";

import { useState } from "react";

const BRANDS = [
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React", slug: "react" },
  { name: "Convex", slug: "convex" },
  { name: "CodeMirror", slug: "codemirror" },
  { name: "Gemini", slug: "googlegemini" },
  { name: "Groq", slug: "groq" },
  { name: "OpenRouter", slug: "openrouter" },
  { name: "WebContainers", slug: "webcontainers" },
];

function BrandMark({ name, slug }: { name: string; slug: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        aria-hidden
        className="flex size-5 items-center justify-center rounded-md border border-zinc-700 text-[11px] font-bold text-zinc-300"
      >
        {name.charAt(0)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.simpleicons.org/${slug}/white`}
      alt={name}
      loading="lazy"
      className="size-5 object-contain"
      onError={() => setFailed(true)}
    />
  );
}

/** Logo-only strip: real brand SVGs via Simple Icons, monogram fallback. */
export function StackStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
      {BRANDS.map((b) => (
        <span key={b.slug} title={b.name}>
          <BrandMark name={b.name} slug={b.slug} />
        </span>
      ))}
    </div>
  );
}
