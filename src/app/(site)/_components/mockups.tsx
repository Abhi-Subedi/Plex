import Image from "next/image";

import { cn } from "@/lib/utils";

/* ---------- black-div window chrome around real screenshots ---------- */

export function Window({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-zinc-800/80 bg-zinc-900/60 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="ml-3 truncate text-xs text-zinc-500">{title}</span>
      </div>
      {children}
    </div>
  );
}

const DIMS: Record<number, [number, number]> = {
  1: [1408, 768],
  2: [1376, 768],
  3: [1376, 768],
  4: [1408, 768],
  5: [1408, 768],
  6: [1376, 768],
  7: [1408, 768],
  8: [1408, 768],
  9: [1376, 768],
  10: [1376, 768],
  11: [1376, 768],
  12: [1376, 768],
};

export function Shot({
  n,
  title,
  alt,
  className,
}: {
  n: number;
  title: string;
  alt: string;
  className?: string;
}) {
  const [w, h] = DIMS[n];
  return (
    <Window title={title} className={className}>
      <Image
        src={`/${n}.jpg`}
        alt={alt}
        width={w}
        height={h}
        sizes="(max-width: 768px) 100vw, 80vw"
        className="h-auto w-full"
      />
    </Window>
  );
}

export function Photo({
  n,
  alt,
  className,
}: {
  n: number;
  alt: string;
  className?: string;
}) {
  const [w, h] = DIMS[n];
  return (
    <Image
      src={`/${n}.jpg`}
      alt={alt}
      width={w}
      height={h}
      sizes="(max-width: 768px) 100vw, 80vw"
      className={cn("h-auto w-full rounded-xl border border-zinc-800", className)}
    />
  );
}

export function ModelChainMock() {
  const chain = [
    ["Gemini 3.6", "primary", true],
    ["GPT-OSS 120B · Groq", "fallback", true],
    ["GPT-OSS 20B · Groq", "fallback", false],
    ["Gemini 3.8 · OpenRouter", "fallback", false],
  ] as const;
  return (
    <Window title="plex / providers">
      <div className="space-y-2 p-4 text-xs">
        {chain.map(([name, tag, on], i) => (
          <div key={name}>
            <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5">
              <span className={cn("size-2 rounded-full", on ? "bg-emerald-400" : "bg-zinc-700")} />
              <span className="flex-1 text-zinc-200">{name}</span>
              <span className="rounded border border-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-500">
                {tag}
              </span>
            </div>
            {i < chain.length - 1 && (
              <div className="flex justify-center py-0.5 text-[10px] text-zinc-600">
                ↓ <span className="ml-1">on 429 / quota / 5xx</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Window>
  );
}
