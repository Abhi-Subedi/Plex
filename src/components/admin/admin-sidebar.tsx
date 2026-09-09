"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PanelLeftClose,
  PanelLeftOpen,
  LayoutDashboard,
  FileText,
  PenTool,
  GitBranch,
  HelpCircle,
  MessagesSquare,
  Users,
  GraduationCap,
  Activity,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { title: "Dashboard", href: "/dev/admin", icon: LayoutDashboard },
  { title: "Docs", href: "/dev/admin/docs", icon: FileText },
  { title: "Blog", href: "/dev/admin/blog", icon: PenTool },
  { title: "Changelog", href: "/dev/admin/changelog", icon: GitBranch },
  { title: "Help", href: "/dev/admin/help", icon: HelpCircle },
  { title: "Forum", href: "/dev/admin/forum", icon: MessagesSquare },
  { title: "Community", href: "/dev/admin/community", icon: Users },
  { title: "Workshop", href: "/dev/admin/workshop", icon: GraduationCap },
  { title: "Status", href: "/dev/admin/status", icon: Activity },
  { title: "Settings", href: "/dev/admin/settings", icon: Settings },
];

export function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dev/admin")
      return pathname === "/dev/admin" || pathname === "/dev/admin/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <button
        className="fixed left-4 top-4 z-50 rounded-md border border-zinc-800 bg-zinc-900 p-2 text-zinc-100 lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-screen flex-col border-r border-zinc-800 bg-zinc-950 transition-all duration-200",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-4">
          <Link href="/dev/admin" className="flex items-center gap-2">
            <span
              className={cn(
                "font-semibold text-zinc-100 transition-opacity",
                collapsed && "lg:opacity-0"
              )}
            >
              Plex Admin
            </span>
          </Link>
          <button
            className="rounded p-1 text-zinc-400 hover:text-zinc-100 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav
          className="flex-1 space-y-1 overflow-y-auto p-3"
          role="navigation"
          aria-label="Admin navigation"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-zinc-800 text-zinc-100"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100",
                  collapsed && "lg:justify-center"
                )}
                title={collapsed ? item.title : undefined}
              >
                <item.icon className="size-5 shrink-0" aria-hidden="true" />
                <span className={cn(collapsed && "lg:hidden")}>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-zinc-800 p-3">
          <button
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100",
              collapsed && "lg:justify-center"
            )}
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="size-5 shrink-0" aria-hidden="true" />
            ) : (
              <PanelLeftClose className="size-5 shrink-0" aria-hidden="true" />
            )}
            <span className={cn(collapsed && "lg:hidden")}>Collapse</span>
          </button>
          <button
            onClick={onLogout}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-red-400",
              collapsed && "lg:justify-center"
            )}
          >
            <LogOut className="size-5 shrink-0" aria-hidden="true" />
            <span className={cn(collapsed && "lg:hidden")}>Sign Out</span>
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
