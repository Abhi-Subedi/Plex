import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    name: v.string(),
    ownerId: v.string(),
    updatedAt: v.number(),
    importStatus: v.optional(
      v.union(
        v.literal("importing"),
        v.literal("completed"),
        v.literal("failed"),
      ),
    ),
    exportStatus: v.optional(
      v.union(
        v.literal("exporting"),
        v.literal("completed"),
        v.literal("failed"),
        v.literal("cancelled"),
      ),
    ),
    exportRepoUrl: v.optional(v.string()),
    settings: v.optional(
      v.object({
        installCommand: v.optional(v.string()),
        devCommand: v.optional(v.string()),
      })
    ),
  }).index("by_owner", ["ownerId"]),

  files: defineTable({
    projectId: v.id("projects"),
    parentId: v.optional(v.id("files")),
    name: v.string(),
    type: v.union(v.literal("file"), v.literal("folder")),
    content: v.optional(v.string()), // Text files only
    storageId: v.optional(v.id("_storage")), // Binary files only
    updatedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_parent", ["parentId"])
    .index("by_project_parent", ["projectId", "parentId"]),

  conversations: defineTable({
    projectId: v.id("projects"),
    title: v.string(),
    updatedAt: v.number(),
  }).index("by_project", ["projectId"]),

  messages: defineTable({
    conversationId: v.id("conversations"),
    projectId: v.id("projects"),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    status: v.optional(
      v.union(
        v.literal("processing"),
        v.literal("completed"),
        v.literal("cancelled")
      )
    ),
  })
    .index("by_conversation", ["conversationId"])
    .index("by_project_status", ["projectId", "status"]),

  docs: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    category: v.optional(v.string()),
    order: v.number(),
    published: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_published", ["published"]),

  blogPosts: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.string(),
    coverImage: v.optional(v.string()),
    author: v.string(),
    tags: v.array(v.string()),
    published: v.boolean(),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["published"])
    .index("by_publishedAt", ["publishedAt"]),

  changelogEntries: defineTable({
    version: v.string(),
    title: v.string(),
    content: v.string(),
    highlights: v.array(v.string()),
    published: v.boolean(),
    publishedAt: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_published", ["published"])
    .index("by_publishedAt", ["publishedAt"]),

  helpArticles: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    category: v.string(),
    tags: v.array(v.string()),
    order: v.number(),
    published: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_published", ["published"]),

  forumThreads: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    pinned: v.boolean(),
    locked: v.boolean(),
    viewCount: v.number(),
    replyCount: v.number(),
    lastReplyAt: v.optional(v.number()),
    lastReplyBy: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_lastReplyAt", ["lastReplyAt"]),

  forumReplies: defineTable({
    threadId: v.id("forumThreads"),
    content: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_thread", ["threadId"]),

  communityPosts: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    type: v.union(v.literal("announcement"), v.literal("showcase"), v.literal("discussion"), v.literal("tutorial")),
    tags: v.array(v.string()),
    published: v.boolean(),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_type", ["type"])
    .index("by_published", ["published"]),

  workshopSessions: defineTable({
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.string(),
    coverImage: v.optional(v.string()),
    presenter: v.string(),
    presenterBio: v.optional(v.string()),
    duration: v.string(),
    level: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
    tags: v.array(v.string()),
    published: v.boolean(),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["published"])
    .index("by_publishedAt", ["publishedAt"]),

  statusIncidents: defineTable({
    title: v.string(),
    slug: v.string(),
    status: v.union(v.literal("investigating"), v.literal("identified"), v.literal("monitoring"), v.literal("resolved")),
    severity: v.union(v.literal("minor"), v.literal("major"), v.literal("critical"), v.literal("maintenance")),
    content: v.string(),
    components: v.array(v.string()),
    startedAt: v.number(),
    resolvedAt: v.optional(v.number()),
    updates: v.array(v.object({
      timestamp: v.number(),
      status: v.union(v.literal("investigating"), v.literal("identified"), v.literal("monitoring"), v.literal("resolved")),
      message: v.string(),
    })),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_startedAt", ["startedAt"]),

  adminUsers: defineTable({
    username: v.string(),
    passwordHash: v.string(),
    email: v.optional(v.string()),
    role: v.union(v.literal("super_admin"), v.literal("admin"), v.literal("editor")),
    lastLoginAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_username", ["username"]),

  adminSessions: defineTable({
    adminId: v.id("adminUsers"),
    token: v.string(),
    expiresAt: v.number(),
    createdAt: v.number(),
  })
    .index("by_token", ["token"])
    .index("by_admin", ["adminId"]),

  passwordResetTokens: defineTable({
    adminId: v.id("adminUsers"),
    token: v.string(),
    keyword: v.string(),
    expiresAt: v.number(),
    used: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_token", ["token"])
    .index("by_admin", ["adminId"]),
});
