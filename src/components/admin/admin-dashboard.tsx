"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  FileText,
  PenTool,
  GitBranch,
  HelpCircle,
  MessagesSquare,
  Users,
  GraduationCap,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CONTENT_TYPES = [
  { key: "docs", title: "Docs", icon: FileText, href: "/dev/admin/docs", chip: "bg-blue-500/20 text-blue-400" },
  { key: "blog", title: "Blog", icon: PenTool, href: "/dev/admin/blog", chip: "bg-purple-500/20 text-purple-400" },
  { key: "changelog", title: "Changelog", icon: GitBranch, href: "/dev/admin/changelog", chip: "bg-emerald-500/20 text-emerald-400" },
  { key: "help", title: "Help", icon: HelpCircle, href: "/dev/admin/help", chip: "bg-amber-500/20 text-amber-400" },
  { key: "forum", title: "Forum", icon: MessagesSquare, href: "/dev/admin/forum", chip: "bg-orange-500/20 text-orange-400" },
  { key: "community", title: "Community", icon: Users, href: "/dev/admin/community", chip: "bg-pink-500/20 text-pink-400" },
  { key: "workshop", title: "Workshop", icon: GraduationCap, href: "/dev/admin/workshop", chip: "bg-indigo-500/20 text-indigo-400" },
  { key: "status", title: "Status", icon: Activity, href: "/dev/admin/status", chip: "bg-red-500/20 text-red-400" },
];

const STATUS_STYLES: Record<string, string> = {
  published: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  draft: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className={STATUS_STYLES[status] ?? STATUS_STYLES.draft}>
      {status}
    </Badge>
  );
}

export function AdminDashboard() {
  const docs = useQuery(api.cms.listDocs, { publishedOnly: false });
  const blogPosts = useQuery(api.cms.listBlogPosts, { publishedOnly: false });
  const changelogEntries = useQuery(api.cms.listChangelogEntries, { publishedOnly: false });
  const helpArticles = useQuery(api.cms.listHelpArticles, { publishedOnly: false });
  const forumThreads = useQuery(api.cms.listForumThreads, { publishedOnly: false });
  const communityPosts = useQuery(api.cms.listCommunityPosts, { publishedOnly: false });
  const workshopSessions = useQuery(api.cms.listWorkshopSessions, { publishedOnly: false });
  const statusIncidents = useQuery(api.cms.listStatusIncidents, { publishedOnly: false });

  const stats = [
    { label: "Docs", count: docs?.length ?? 0, published: docs?.filter((d) => d.published).length ?? 0, Icon: FileText, iconColor: "text-blue-400", chip: "bg-blue-500/20" },
    { label: "Blog Posts", count: blogPosts?.length ?? 0, published: blogPosts?.filter((b) => b.published).length ?? 0, Icon: PenTool, iconColor: "text-purple-400", chip: "bg-purple-500/20" },
    { label: "Changelog", count: changelogEntries?.length ?? 0, published: changelogEntries?.filter((c) => c.published).length ?? 0, Icon: GitBranch, iconColor: "text-emerald-400", chip: "bg-emerald-500/20" },
    { label: "Help Articles", count: helpArticles?.length ?? 0, published: helpArticles?.filter((h) => h.published).length ?? 0, Icon: HelpCircle, iconColor: "text-amber-400", chip: "bg-amber-500/20" },
    { label: "Forum Threads", count: forumThreads?.length ?? 0, published: forumThreads?.length ?? 0, Icon: MessagesSquare, iconColor: "text-orange-400", chip: "bg-orange-500/20" },
    { label: "Community", count: communityPosts?.length ?? 0, published: communityPosts?.filter((c) => c.published).length ?? 0, Icon: Users, iconColor: "text-pink-400", chip: "bg-pink-500/20" },
    { label: "Workshop", count: workshopSessions?.length ?? 0, published: workshopSessions?.filter((w) => w.published).length ?? 0, Icon: GraduationCap, iconColor: "text-indigo-400", chip: "bg-indigo-500/20" },
    { label: "Status", count: statusIncidents?.length ?? 0, published: statusIncidents?.filter((s) => s.status === "resolved").length ?? 0, Icon: Activity, iconColor: "text-red-400", chip: "bg-red-500/20" },
  ];

  const recent = [
    ...(docs?.slice(0, 3).map((d) => ({ type: "Doc", title: d.title, time: d.updatedAt, published: d.published })) ?? []),
    ...(blogPosts?.slice(0, 3).map((b) => ({ type: "Blog", title: b.title, time: b.updatedAt, published: b.published })) ?? []),
    ...(changelogEntries?.slice(0, 3).map((c) => ({ type: "Changelog", title: c.title, time: c.updatedAt, published: c.published })) ?? []),
  ]
    .sort((a, b) => b.time - a.time)
    .slice(0, 5);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-zinc-400">Overview of all content across the platform</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">{stat.label}</p>
                  <p className="mt-1 text-3xl font-semibold">{stat.count}</p>
                </div>
                <div className={cn("rounded-xl p-3", stat.chip)}>
                  <stat.Icon className={cn("size-6", stat.iconColor)} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
                <CheckCircle className="size-3.5 text-emerald-400" />
                <span>{stat.published} published</span>
                {stat.count > stat.published && (
                  <>
                    <span className="text-zinc-600">·</span>
                    <Clock className="size-3.5 text-amber-400" />
                    <span>{stat.count - stat.published} drafts</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid gap-3 sm:grid-cols-2">
              {CONTENT_TYPES.map((type) => (
                <Link
                  key={type.key}
                  href={type.href}
                  className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-zinc-600"
                >
                  <div className={cn("rounded-lg p-2", type.chip)}>
                    <type.icon className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium">{type.title}</p>
                    <p className="text-xs text-zinc-500">Manage content</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="max-h-96 space-y-3 overflow-y-auto">
              {recent.map((item, i) => (
                <div
                  key={`${item.type}-${item.title}-${i}`}
                  className="flex items-center justify-between border-b border-zinc-800/50 py-2 last:border-0"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="shrink-0 text-sm font-medium">{item.type}</span>
                    <span className="max-w-[200px] truncate text-sm text-zinc-300">
                      {item.title}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <StatusBadge status={item.published ? "published" : "draft"} />
                    <span className="text-xs text-zinc-500">
                      {new Date(item.time).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
              {recent.length === 0 && (
                <div className="py-8 text-center text-zinc-500">
                  <p>No content yet. Create your first entry!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
