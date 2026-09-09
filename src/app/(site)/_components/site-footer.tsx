import Link from "next/link";

import { Logo } from "@/components/logo";

const COLS: [string, { label: string; href: string }[]][] = [
  [
    "Product",
    [
      { label: "Agents", href: "/agents/plex-ai" },
      { label: "Chat", href: "/product/chat" },
      { label: "Editor", href: "/product/editor" },
      { label: "Automation", href: "/product/automation" },
      { label: "Pricing", href: "/pricing" },
      { label: "CLI", href: "/cli" },
      { label: "Cloud Agents", href: "/cloud-agents" },
    ],
  ],
  [
    "Resources",
    [
      { label: "Docs", href: "/docs" },
      { label: "Changelog", href: "/changelog" },
      { label: "Help", href: "/help" },
      { label: "Forum", href: "/forum" },
      { label: "Blog", href: "/blog" },
      { label: "Community", href: "/community" },
      { label: "Workshop", href: "/workshop" },
      { label: "Status", href: "/status" },
    ],
  ],
  [
    "Company",
    [
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Community", href: "/community" },
      { label: "Brand", href: "/brand" },
    ],
  ],
  [
    "Legal",
    [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Security", href: "/security" },
      { label: "Data Use", href: "/data-use" },
    ],
  ],
];

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800/80">
      <div className="mx-auto max-w-7xl px-2 pb-4 pt-10 md:px-3">
        <Logo className="h-7" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-8 px-2 py-8 sm:grid-cols-2 md:px-3 lg:grid-cols-4">
        {COLS.map(([col, items]) => (
          <div key={col}>
            <p className="text-sm font-semibold text-zinc-200">{col}</p>
            <ul className="mt-3 space-y-2">
              {items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-500 hover:text-zinc-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-zinc-800/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-2 py-4 text-xs text-zinc-600 md:px-3">
          <span>© 2026 Plex, Inc.</span>
          <span>English</span>
        </div>
      </div>
    </footer>
  );
}
