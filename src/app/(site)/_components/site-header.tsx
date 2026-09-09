"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

const MENUS: { label: string; href?: string; items?: { label: string; href: string }[]; cols?: 1 | 2 }[] = [
  {
    label: "Product",
    items: [
      { label: "Agent", href: "/product/agent" },
      { label: "Chat", href: "/product/chat" },
      { label: "Editor", href: "/product/editor" },
      { label: "Automation", href: "/product/automation" },
    ],
  },
  {
    label: "Agents",
    items: [
      { label: "Plex AI", href: "/agents/plex-ai" },
      { label: "Plex Chat", href: "/agents/plex-chat" },
    ],
  },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    cols: 2,
    items: [
      { label: "Changelog", href: "/changelog" },
      { label: "Docs", href: "/docs" },
      { label: "Help", href: "/help" },
      { label: "Forum", href: "/forum" },
      { label: "Blog", href: "/blog" },
      { label: "Community", href: "/community" },
      { label: "Workshop", href: "/workshop" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Docs renders its own dedicated navbar with logo.
  if (pathname === "/docs" || pathname.startsWith("/docs/")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-2 md:px-3">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-6" />
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {MENUS.map((m) => (
            <div key={m.label} className="group relative">
              {m.href ? (
                <Link
                  href={m.href}
                  className="block rounded-md px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                >
                  {m.label}
                </Link>
              ) : (
                <button className="rounded-md px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100">
                  {m.label}
                </button>
              )}
              {m.items && (
                <div
                  className={
                    m.cols === 2
                      ? "invisible absolute left-0 top-full grid w-72 translate-y-1 grid-cols-2 rounded-lg border border-zinc-800 bg-zinc-950 p-1 opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                      : "invisible absolute left-0 top-full w-44 translate-y-1 rounded-lg border border-zinc-800 bg-zinc-950 p-1 opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                  }
                >
                  {m.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="sm" asChild className="text-zinc-300">
            <Link href="/app">Sign in</Link>
          </Button>
          <Button size="sm" asChild className="bg-white text-black hover:bg-zinc-200">
            <Link href="/app">
              Get started <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>

        <button
          className="ml-auto rounded-md p-2 text-zinc-300 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-zinc-800/80 bg-black px-4 py-3 lg:hidden">
          {MENUS.map((m) => (
            <div key={m.label} className="py-1">
              {m.href ? (
                <Link
                  href={m.href}
                  className="block px-2 py-1.5 text-sm font-medium text-zinc-200"
                >
                  {m.label}
                </Link>
              ) : (
                <p className="px-2 py-1.5 text-sm font-medium text-zinc-200">{m.label}</p>
              )}
              {m.items?.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-1.5 text-sm text-zinc-500"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="mt-2 flex gap-2">
            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link href="/app">Sign in</Link>
            </Button>
            <Button size="sm" asChild className="flex-1 bg-white text-black hover:bg-zinc-200">
              <Link href="/app">Get started</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
