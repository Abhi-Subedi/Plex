"use client";

import { useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import type { FunctionReference } from "convex/server";
import { api } from "../../../convex/_generated/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyListQuery = FunctionReference<"query", "public", { publishedOnly?: boolean }, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyCreateMutation = FunctionReference<"mutation", "public", { data: any }, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyUpdateMutation = FunctionReference<"mutation", "public", { id: any; data: any }, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyDeleteMutation = FunctionReference<"mutation", "public", { id: any }, any>;
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  Search,
  Table as TableIcon,
  LayoutGrid,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type FieldType = "text" | "textarea" | "select" | "switch" | "tags" | "slug" | "number";

interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  rows?: number;
}

interface ContentConfig {
  key: string;
  title: string;
  singular: string;
  viewBase: string;
  listQuery: AnyListQuery;
  createMutation: AnyCreateMutation;
  updateMutation: AnyUpdateMutation;
  deleteMutation: AnyDeleteMutation;
  fields: FieldConfig[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Item = Record<string, any> & { _id: string; title?: string; slug?: string };

const CONTENT_CONFIGS: Record<string, ContentConfig> = {
  docs: {
    key: "docs",
    title: "Documentation",
    singular: "Doc",
    viewBase: "/docs",
    listQuery: api.cms.listDocs,
    createMutation: api.cms.createDoc,
    updateMutation: api.cms.updateDoc,
    deleteMutation: api.cms.deleteDoc,
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "Slug", type: "slug", required: true },
      {
        key: "category",
        label: "Category",
        type: "select",
        options: [
          { value: "getting-started", label: "Getting Started" },
          { value: "guides", label: "Guides" },
          { value: "reference", label: "Reference" },
          { value: "api", label: "API Reference" },
          { value: "examples", label: "Examples" },
        ],
      },
      { key: "excerpt", label: "Excerpt", type: "textarea", rows: 3 },
      { key: "content", label: "Content (Markdown)", type: "textarea", required: true, rows: 12 },
      { key: "order", label: "Order", type: "number" },
      { key: "published", label: "Published", type: "switch" },
    ],
  },
  blog: {
    key: "blogPosts",
    title: "Blog",
    singular: "Post",
    viewBase: "/blog",
    listQuery: api.cms.listBlogPosts,
    createMutation: api.cms.createBlogPost,
    updateMutation: api.cms.updateBlogPost,
    deleteMutation: api.cms.deleteBlogPost,
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "Slug", type: "slug", required: true },
      { key: "excerpt", label: "Excerpt", type: "textarea", required: true, rows: 3 },
      { key: "coverImage", label: "Cover Image URL", type: "text" },
      { key: "author", label: "Author", type: "text", required: true },
      { key: "tags", label: "Tags", type: "tags" },
      { key: "content", label: "Content (Markdown)", type: "textarea", required: true, rows: 12 },
      { key: "published", label: "Published", type: "switch" },
    ],
  },
  changelog: {
    key: "changelogEntries",
    title: "Changelog",
    singular: "Entry",
    viewBase: "/changelog",
    listQuery: api.cms.listChangelogEntries,
    createMutation: api.cms.createChangelogEntry,
    updateMutation: api.cms.updateChangelogEntry,
    deleteMutation: api.cms.deleteChangelogEntry,
    fields: [
      { key: "version", label: "Version", type: "text", required: true },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "content", label: "Content (Markdown)", type: "textarea", required: true, rows: 10 },
      { key: "highlights", label: "Highlights (one per line)", type: "tags" },
      { key: "published", label: "Published", type: "switch" },
    ],
  },
  help: {
    key: "helpArticles",
    title: "Help Center",
    singular: "Article",
    viewBase: "/help",
    listQuery: api.cms.listHelpArticles,
    createMutation: api.cms.createHelpArticle,
    updateMutation: api.cms.updateHelpArticle,
    deleteMutation: api.cms.deleteHelpArticle,
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "Slug", type: "slug", required: true },
      {
        key: "category",
        label: "Category",
        type: "select",
        required: true,
        options: [
          { value: "getting-started", label: "Getting Started" },
          { value: "billing", label: "Billing" },
          { value: "technical", label: "Technical Issues" },
          { value: "account", label: "Account" },
          { value: "features", label: "Features" },
        ],
      },
      { key: "excerpt", label: "Excerpt", type: "textarea", rows: 3 },
      { key: "tags", label: "Tags", type: "tags" },
      { key: "content", label: "Content (Markdown)", type: "textarea", required: true, rows: 12 },
      { key: "order", label: "Order", type: "number" },
      { key: "published", label: "Published", type: "switch" },
    ],
  },
  forum: {
    key: "forumThreads",
    title: "Forum",
    singular: "Thread",
    viewBase: "/forum",
    listQuery: api.cms.listForumThreads,
    createMutation: api.cms.createForumThread,
    updateMutation: api.cms.updateForumThread,
    deleteMutation: api.cms.deleteForumThread,
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "Slug", type: "slug", required: true },
      {
        key: "category",
        label: "Category",
        type: "select",
        required: true,
        options: [
          { value: "general", label: "General Discussion" },
          { value: "help", label: "Help & Support" },
          { value: "feedback", label: "Feedback" },
          { value: "showcase", label: "Showcase" },
          { value: "announcements", label: "Announcements" },
        ],
      },
      { key: "tags", label: "Tags", type: "tags" },
      { key: "content", label: "Content (Markdown)", type: "textarea", required: true, rows: 10 },
      { key: "pinned", label: "Pinned", type: "switch" },
      { key: "locked", label: "Locked", type: "switch" },
    ],
  },
  community: {
    key: "communityPosts",
    title: "Community",
    singular: "Post",
    viewBase: "/community",
    listQuery: api.cms.listCommunityPosts,
    createMutation: api.cms.createCommunityPost,
    updateMutation: api.cms.updateCommunityPost,
    deleteMutation: api.cms.deleteCommunityPost,
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "Slug", type: "slug", required: true },
      {
        key: "type",
        label: "Type",
        type: "select",
        required: true,
        options: [
          { value: "announcement", label: "Announcement" },
          { value: "showcase", label: "Showcase" },
          { value: "discussion", label: "Discussion" },
          { value: "tutorial", label: "Tutorial" },
        ],
      },
      { key: "excerpt", label: "Excerpt", type: "textarea", required: true, rows: 3 },
      { key: "tags", label: "Tags", type: "tags" },
      { key: "content", label: "Content (Markdown)", type: "textarea", required: true, rows: 12 },
      { key: "authorName", label: "Author Name", type: "text", required: true },
      { key: "published", label: "Published", type: "switch" },
    ],
  },
  workshop: {
    key: "workshopSessions",
    title: "Workshop",
    singular: "Session",
    viewBase: "/workshop",
    listQuery: api.cms.listWorkshopSessions,
    createMutation: api.cms.createWorkshopSession,
    updateMutation: api.cms.updateWorkshopSession,
    deleteMutation: api.cms.deleteWorkshopSession,
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "Slug", type: "slug", required: true },
      { key: "description", label: "Description", type: "textarea", required: true, rows: 3 },
      { key: "coverImage", label: "Cover Image URL", type: "text" },
      { key: "presenter", label: "Presenter", type: "text", required: true },
      { key: "presenterBio", label: "Presenter Bio", type: "textarea", rows: 3 },
      { key: "duration", label: "Duration (e.g., 45 min)", type: "text" },
      {
        key: "level",
        label: "Level",
        type: "select",
        required: true,
        options: [
          { value: "beginner", label: "Beginner" },
          { value: "intermediate", label: "Intermediate" },
          { value: "advanced", label: "Advanced" },
        ],
      },
      { key: "tags", label: "Tags", type: "tags" },
      { key: "content", label: "Content (Markdown)", type: "textarea", required: true, rows: 12 },
      { key: "published", label: "Published", type: "switch" },
    ],
  },
  status: {
    key: "statusIncidents",
    title: "Status Page",
    singular: "Incident",
    viewBase: "/status",
    listQuery: api.cms.listStatusIncidents,
    createMutation: api.cms.createStatusIncident,
    updateMutation: api.cms.updateStatusIncident,
    deleteMutation: api.cms.deleteStatusIncident,
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "Slug", type: "slug", required: true },
      {
        key: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { value: "investigating", label: "Investigating" },
          { value: "identified", label: "Identified" },
          { value: "monitoring", label: "Monitoring" },
          { value: "resolved", label: "Resolved" },
        ],
      },
      {
        key: "severity",
        label: "Severity",
        type: "select",
        required: true,
        options: [
          { value: "minor", label: "Minor" },
          { value: "major", label: "Major" },
          { value: "critical", label: "Critical" },
          { value: "maintenance", label: "Maintenance" },
        ],
      },
      { key: "content", label: "Content (Markdown)", type: "textarea", required: true, rows: 10 },
      { key: "components", label: "Affected Components (one per line)", type: "tags" },
    ],
  },
};

function toTagsInput(value: unknown): string {
  return Array.isArray(value) ? value.join("\n") : typeof value === "string" ? value : "";
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    investigating: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    identified: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    monitoring: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    resolved: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    published: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    draft: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
  };
  return (
    <Badge variant="outline" className={variants[status] ?? variants.draft}>
      {status}
    </Badge>
  );
}

export function AdminContentManager({ contentKey: contentKeyProp }: { contentKey?: string }) {
  const router = useRouter();
  const params = useParams();
  const paramSection = typeof params?.section === "string" ? params.section : undefined;
  const contentKey = contentKeyProp ?? paramSection ?? "";
  const config = CONTENT_CONFIGS[contentKey];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Item>({ _id: "" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [saving, setSaving] = useState(false);

  // Hooks must run unconditionally — pass "skip" when there is no config.
  const items = useQuery(
    config?.listQuery ?? api.cms.listDocs,
    { publishedOnly: false }
  ) as Item[] | undefined;
  const createItem = useMutation(
    config?.createMutation ?? api.cms.createDoc
  );
  const updateItem = useMutation(
    config?.updateMutation ?? api.cms.updateDoc
  );
  const deleteItem = useMutation(
    config?.deleteMutation ?? api.cms.deleteDoc
  );

  const filteredItems = useMemo(() => {
    if (!config) return [];
    const q = search.toLowerCase();
    return (items ?? []).filter((item) => {
      const matchesSearch =
        !q ||
        item.title?.toLowerCase().includes(q) ||
        item.slug?.toLowerCase().includes(q);
      const status =
        item.published !== undefined
          ? item.published
            ? "published"
            : "draft"
          : item.status;
      const matchesFilter = filter === "all" || filter === status;
      return matchesSearch && matchesFilter;
    });
  }, [config, items, search, filter]);

  if (!config) {
    return (
      <div className="p-6 lg:p-8">
        <h1 className="text-2xl font-semibold">Unknown section</h1>
        <p className="mt-2 text-zinc-400">
          No content configuration found for “{contentKey || "missing"}”.
        </p>
      </div>
    );
  }

  const blankForm = (): Item => {
    const base: Item = { _id: "" };
    for (const f of config.fields) {
      if (f.type === "switch") base[f.key] = false;
      else if (f.type === "number") base[f.key] = 0;
      else if (f.type === "tags") base[f.key] = [];
      else base[f.key] = "";
    }
    return base;
  };

  const handleNew = () => {
    setFormData(blankForm());
    setEditingId(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: Item) => {
    setFormData({ ...item });
    setEditingId(item._id);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await deleteItem({ id: id as any });
      toast.success("Item deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload = { ...formData } as any;
      delete payload._id;
      delete payload._creationTime;
      if (editingId) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await updateItem({ id: editingId as any, data: payload });
        toast.success("Item updated");
      } else {
        await createItem({ data: payload });
        toast.success("Item created");
      }
      setDialogOpen(false);
      setEditingId(null);
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleFieldChange = (key: string, value: string | boolean) => {
    const field = config.fields.find((f) => f.key === key);
    if (!field) return;
    if (field.type === "tags") {
      const arr = String(value)
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      setFormData((prev) => ({ ...prev, [key]: arr }));
    } else if (field.type === "number") {
      setFormData((prev) => ({ ...prev, [key]: parseInt(String(value), 10) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const statusOf = (item: Item): string =>
    item.published !== undefined
      ? item.published
        ? "published"
        : "draft"
      : String(item.status ?? "draft");

  const canSave =
    config.key === "changelogEntries"
      ? Boolean(formData.title)
      : Boolean(formData.title && (formData.slug || config.key === "changelogEntries"));

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{config.title}</h1>
          <p className="mt-1 text-zinc-400">Manage {config.title.toLowerCase()} content</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNew}>
              <Plus className="mr-2 size-4" />
              New {config.singular}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-zinc-800 bg-zinc-900">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit" : "Create"} {config.singular}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4 p-1"
            >
              {config.fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key}>
                    {field.label}{" "}
                    {field.required && <span className="text-red-400">*</span>}
                  </Label>
                  {field.type === "text" && (
                    <Input
                      id={field.key}
                      value={String(formData[field.key] ?? "")}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  )}
                  {field.type === "slug" && (
                    <Input
                      id={field.key}
                      value={String(formData[field.key] ?? "")}
                      onChange={(e) =>
                        handleFieldChange(
                          field.key,
                          e.target.value.toLowerCase().replace(/\s+/g, "-")
                        )
                      }
                      placeholder={field.placeholder || "auto-generated-from-title"}
                      required={field.required}
                    />
                  )}
                  {field.type === "textarea" && (
                    <Textarea
                      id={field.key}
                      value={String(formData[field.key] ?? "")}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      rows={field.rows || 4}
                      required={field.required}
                      className="font-mono text-sm"
                    />
                  )}
                  {field.type === "select" && (
                    <Select
                      value={String(formData[field.key] ?? "")}
                      onValueChange={(v) => handleFieldChange(field.key, v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {field.type === "switch" && (
                    <div className="flex items-center gap-2">
                      <Switch
                        id={field.key}
                        checked={Boolean(formData[field.key])}
                        onCheckedChange={(checked) => handleFieldChange(field.key, checked)}
                      />
                      <Label htmlFor={field.key} className="mb-0 cursor-pointer">
                        {field.label}
                      </Label>
                    </div>
                  )}
                  {field.type === "tags" && (
                    <div>
                      <Textarea
                        id={field.key}
                        value={toTagsInput(formData[field.key])}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        placeholder="One value per line"
                        rows={3}
                        className="font-mono text-sm"
                      />
                      <p className="text-xs text-zinc-500">One value per line</p>
                    </div>
                  )}
                  {field.type === "number" && (
                    <Input
                      id={field.key}
                      type="number"
                      value={Number(formData[field.key] ?? 0)}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      className="w-24"
                    />
                  )}
                </div>
              ))}
              <DialogFooter className="border-t border-zinc-800 pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!canSave || saving}>
                  <Save className="mr-2 size-4" />
                  {saving ? "Saving..." : editingId ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4 flex flex-col gap-4 sm:flex-row">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("table")}
            className={viewMode === "table" ? "bg-zinc-800" : ""}
            aria-label="Table view"
          >
            <TableIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("cards")}
            className={viewMode === "cards" ? "bg-zinc-800" : ""}
            aria-label="Cards view"
          >
            <LayoutGrid className="size-4" />
          </Button>
        </div>
      </div>

      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardContent className="p-0">
          {items === undefined ? (
            <p className="p-8 text-center text-sm text-zinc-500">Loading…</p>
          ) : viewMode === "table" ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Title</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Slug</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Updated</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-zinc-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item._id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50">
                      <td className="px-4 py-3">
                        <span className="block max-w-xs truncate font-medium">{item.title}</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-sm text-zinc-500">{item.slug ?? "—"}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={statusOf(item)} />
                      </td>
                      <td className="px-4 py-3 text-sm text-zinc-500">
                        {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : "-"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-900">
                            <DropdownMenuItem onClick={() => handleEdit(item)} className="flex items-center gap-2">
                              <Edit className="size-4" /> Edit
                            </DropdownMenuItem>
                            {item.slug && (
                              <DropdownMenuItem
                                onClick={() => router.push(config.viewBase)}
                                className="flex items-center gap-2"
                              >
                                <Eye className="size-4" /> View
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleDelete(item._id)}
                              className="flex items-center gap-2 text-red-400"
                            >
                              <Trash2 className="size-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                  {filteredItems.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                        No {config.title.toLowerCase()} found. Create your first one!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="line-clamp-1 text-sm font-medium">{item.title}</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="p-1 text-zinc-400 hover:text-zinc-100">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-900">
                        <DropdownMenuItem onClick={() => handleEdit(item)} className="flex items-center gap-2">
                          <Edit className="size-4" /> Edit
                        </DropdownMenuItem>
                        {item.slug && (
                          <DropdownMenuItem
                            onClick={() => router.push(config.viewBase)}
                            className="flex items-center gap-2"
                          >
                            <Eye className="size-4" /> View
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleDelete(item._id)}
                          className="flex items-center gap-2 text-red-400"
                        >
                          <Trash2 className="size-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="mb-2 font-mono text-xs text-zinc-500">{item.slug ?? "—"}</p>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={statusOf(item)} />
                    <span className="text-xs text-zinc-500">
                      {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : "-"}
                    </span>
                  </div>
                </div>
              ))}
              {filteredItems.length === 0 && (
                <div className="col-span-full py-12 text-center text-zinc-500">
                  <p>No {config.title.toLowerCase()} found. Create your first one!</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export { CONTENT_CONFIGS };
export type { ContentConfig };
