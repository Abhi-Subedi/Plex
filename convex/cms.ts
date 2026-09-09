import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ============================================================
// CRYPTO HELPERS
// Uses Web Crypto API instead of Node.js "crypto".
// This works in Convex's default runtime.
// ============================================================

const hashPassword = async (password: string): Promise<string> => {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

const generateToken = (): string => {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);

  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

// ============================================================
// ADMIN AUTHENTICATION
// ============================================================

export const adminLogin = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },

  handler: async (ctx, args) => {
    const admin = await ctx.db
      .query("adminUsers")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .unique();

    if (!admin) {
      throw new Error("Invalid credentials");
    }

    const passwordHash = await hashPassword(args.password);

    if (admin.passwordHash !== passwordHash) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken();
    const now = Date.now();
    const expiresAt = now + 7 * 24 * 60 * 60 * 1000;

    await ctx.db.insert("adminSessions", {
      adminId: admin._id,
      token,
      expiresAt,
      createdAt: now,
    });

    await ctx.db.patch(admin._id, {
      lastLoginAt: now,
    });

    return {
      token,
      admin: {
        username: admin.username,
        role: admin.role,
      },
    };
  },
});

// ============================================================
// ADMIN LOGOUT
// ============================================================

export const adminLogout = mutation({
  args: {
    token: v.string(),
  },

  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();

    if (session) {
      await ctx.db.delete(session._id);
    }
  },
});

// ============================================================
// VERIFY ADMIN SESSION
// ============================================================

export const verifyAdminSession = query({
  args: {
    token: v.string(),
  },

  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();

    if (!session || session.expiresAt < Date.now()) {
      // NOTE:
      // Queries cannot modify the database in Convex.
      // Expired sessions are therefore simply treated as invalid.
      return null;
    }

    const admin = await ctx.db.get(session.adminId);

    if (!admin) {
      return null;
    }

    return {
      username: admin.username,
      role: admin.role,
      adminId: admin._id,
    };
  },
});

// ============================================================
// REQUEST PASSWORD RESET
// ============================================================

export const requestPasswordReset = mutation({
  args: {
    username: v.string(),
    keyword: v.string(),
  },

  handler: async (ctx, args) => {
    const admin = await ctx.db
      .query("adminUsers")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .unique();

    if (!admin) {
      throw new Error("Admin not found");
    }

    if (args.keyword !== "prabhat") {
      throw new Error("Invalid reset keyword");
    }

    const token = generateToken();
    const now = Date.now();
    const expiresAt = now + 60 * 60 * 1000;

    await ctx.db.insert("passwordResetTokens", {
      adminId: admin._id,
      token,
      keyword: args.keyword,
      expiresAt,
      used: false,
      createdAt: now,
    });

    return {
      token,
    };
  },
});

// ============================================================
// RESET PASSWORD
// ============================================================

export const resetPassword = mutation({
  args: {
    token: v.string(),
    newPassword: v.string(),
  },

  handler: async (ctx, args) => {
    const resetToken = await ctx.db
      .query("passwordResetTokens")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();

    if (
      !resetToken ||
      resetToken.used ||
      resetToken.expiresAt < Date.now()
    ) {
      throw new Error("Invalid or expired reset token");
    }

    const passwordHash = await hashPassword(args.newPassword);

    await ctx.db.patch(resetToken.adminId, {
      passwordHash,
    });

    await ctx.db.patch(resetToken._id, {
      used: true,
    });

    // Invalidate all sessions for this admin.
    const sessions = await ctx.db
      .query("adminSessions")
      .withIndex("by_admin", (q) => q.eq("adminId", resetToken.adminId))
      .collect();

    for (const session of sessions) {
      await ctx.db.delete(session._id);
    }

    return {
      success: true,
    };
  },
});

// ============================================================
// CHANGE PASSWORD
// ============================================================

export const changePassword = mutation({
  args: {
    token: v.string(),
    currentPassword: v.string(),
    newPassword: v.string(),
  },

  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();

    if (!session || session.expiresAt < Date.now()) {
      throw new Error("Invalid session");
    }

    const admin = await ctx.db.get(session.adminId);

    if (!admin) {
      throw new Error("Admin not found");
    }

    const currentPasswordHash = await hashPassword(args.currentPassword);

    if (admin.passwordHash !== currentPasswordHash) {
      throw new Error("Current password is incorrect");
    }

    const newPasswordHash = await hashPassword(args.newPassword);

    await ctx.db.patch(admin._id, {
      passwordHash: newPasswordHash,
      updatedAt: Date.now(),
    });

    return {
      success: true,
    };
  },
});

// ============================================================
// CONTENT CRUD
// Explicit per-table functions. A generic helper cannot be
// type-safe here because tables have different indexes and
// required fields (e.g. forumThreads and statusIncidents have
// no "published" field, changelogEntries has no slug).
// ============================================================

// ---------- Docs ----------

export const listDocs = query({
  args: {
    publishedOnly: v.optional(v.boolean()),
  },

  handler: async (ctx, args) => {
    if (args.publishedOnly) {
      return await ctx.db
        .query("docs")
        .withIndex("by_published", (q) => q.eq("published", true))
        .order("desc")
        .collect();
    }

    return await ctx.db.query("docs").order("desc").collect();
  },
});

export const getDocBySlug = query({
  args: {
    slug: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("docs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const createDoc = mutation({
  args: {
    data: v.any(),
  },

  handler: async (ctx, args) => {
    const timestamp = Date.now();

    return await ctx.db.insert("docs", {
      title: args.data.title,
      slug: args.data.slug,
      content: args.data.content,
      excerpt: args.data.excerpt,
      category: args.data.category,
      order: args.data.order ?? 0,
      published: args.data.published ?? false,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

export const updateDoc = mutation({
  args: {
    id: v.id("docs"),
    data: v.any(),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      ...args.data,
      updatedAt: Date.now(),
    });
  },
});

export const deleteDoc = mutation({
  args: {
    id: v.id("docs"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// ---------- Blog ----------

export const listBlogPosts = query({
  args: {
    publishedOnly: v.optional(v.boolean()),
  },

  handler: async (ctx, args) => {
    if (args.publishedOnly) {
      return await ctx.db
        .query("blogPosts")
        .withIndex("by_published", (q) => q.eq("published", true))
        .order("desc")
        .collect();
    }

    return await ctx.db.query("blogPosts").order("desc").collect();
  },
});

export const getBlogPostBySlug = query({
  args: {
    slug: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const createBlogPost = mutation({
  args: {
    data: v.any(),
  },

  handler: async (ctx, args) => {
    const timestamp = Date.now();
    const published = args.data.published ?? false;

    return await ctx.db.insert("blogPosts", {
      title: args.data.title,
      slug: args.data.slug,
      content: args.data.content,
      excerpt: args.data.excerpt,
      coverImage: args.data.coverImage,
      author: args.data.author,
      tags: args.data.tags ?? [],
      published,
      publishedAt: published ? timestamp : undefined,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

export const updateBlogPost = mutation({
  args: {
    id: v.id("blogPosts"),
    data: v.any(),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      ...args.data,
      updatedAt: Date.now(),
    });
  },
});

export const deleteBlogPost = mutation({
  args: {
    id: v.id("blogPosts"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// ---------- Changelog ----------

export const listChangelogEntries = query({
  args: {
    publishedOnly: v.optional(v.boolean()),
  },

  handler: async (ctx, args) => {
    if (args.publishedOnly) {
      return await ctx.db
        .query("changelogEntries")
        .withIndex("by_published", (q) => q.eq("published", true))
        .order("desc")
        .collect();
    }

    return await ctx.db.query("changelogEntries").order("desc").collect();
  },
});

export const getChangelogEntry = query({
  args: {
    id: v.id("changelogEntries"),
  },

  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createChangelogEntry = mutation({
  args: {
    data: v.any(),
  },

  handler: async (ctx, args) => {
    const timestamp = Date.now();

    return await ctx.db.insert("changelogEntries", {
      version: args.data.version,
      title: args.data.title,
      content: args.data.content,
      highlights: args.data.highlights ?? [],
      published: args.data.published ?? false,
      publishedAt: timestamp,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

export const updateChangelogEntry = mutation({
  args: {
    id: v.id("changelogEntries"),
    data: v.any(),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      ...args.data,
      updatedAt: Date.now(),
    });
  },
});

export const deleteChangelogEntry = mutation({
  args: {
    id: v.id("changelogEntries"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// ---------- Help ----------

export const listHelpArticles = query({
  args: {
    publishedOnly: v.optional(v.boolean()),
  },

  handler: async (ctx, args) => {
    if (args.publishedOnly) {
      return await ctx.db
        .query("helpArticles")
        .withIndex("by_published", (q) => q.eq("published", true))
        .order("desc")
        .collect();
    }

    return await ctx.db.query("helpArticles").order("desc").collect();
  },
});

export const getHelpArticleBySlug = query({
  args: {
    slug: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("helpArticles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const createHelpArticle = mutation({
  args: {
    data: v.any(),
  },

  handler: async (ctx, args) => {
    const timestamp = Date.now();

    return await ctx.db.insert("helpArticles", {
      title: args.data.title,
      slug: args.data.slug,
      content: args.data.content,
      excerpt: args.data.excerpt,
      category: args.data.category,
      tags: args.data.tags ?? [],
      order: args.data.order ?? 0,
      published: args.data.published ?? false,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

export const updateHelpArticle = mutation({
  args: {
    id: v.id("helpArticles"),
    data: v.any(),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      ...args.data,
      updatedAt: Date.now(),
    });
  },
});

export const deleteHelpArticle = mutation({
  args: {
    id: v.id("helpArticles"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// ---------- Forum threads ----------

export const listForumThreads = query({
  args: {
    publishedOnly: v.optional(v.boolean()),
  },

  handler: async (ctx) => {
    return await ctx.db.query("forumThreads").order("desc").collect();
  },
});

export const getForumThreadBySlug = query({
  args: {
    slug: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("forumThreads")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const createForumThread = mutation({
  args: {
    data: v.any(),
  },

  handler: async (ctx, args) => {
    const timestamp = Date.now();

    return await ctx.db.insert("forumThreads", {
      title: args.data.title,
      slug: args.data.slug,
      content: args.data.content,
      authorId: args.data.authorId ?? "admin",
      authorName: args.data.authorName ?? "plex-admin",
      category: args.data.category,
      tags: args.data.tags ?? [],
      pinned: args.data.pinned ?? false,
      locked: args.data.locked ?? false,
      viewCount: 0,
      replyCount: 0,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

export const updateForumThread = mutation({
  args: {
    id: v.id("forumThreads"),
    data: v.any(),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      ...args.data,
      updatedAt: Date.now(),
    });
  },
});

export const deleteForumThread = mutation({
  args: {
    id: v.id("forumThreads"),
  },

  handler: async (ctx, args) => {
    const replies = await ctx.db
      .query("forumReplies")
      .withIndex("by_thread", (q) => q.eq("threadId", args.id))
      .collect();

    for (const reply of replies) {
      await ctx.db.delete(reply._id);
    }

    await ctx.db.delete(args.id);
  },
});

// ---------- Forum replies ----------

export const listForumReplies = query({
  args: {
    threadId: v.id("forumThreads"),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("forumReplies")
      .withIndex("by_thread", (q) => q.eq("threadId", args.threadId))
      .order("desc")
      .collect();
  },
});

export const createForumReply = mutation({
  args: {
    data: v.object({
      threadId: v.id("forumThreads"),
      content: v.string(),
      authorId: v.optional(v.string()),
      authorName: v.optional(v.string()),
    }),
  },

  handler: async (ctx, args) => {
    const timestamp = Date.now();

    const replyId = await ctx.db.insert("forumReplies", {
      threadId: args.data.threadId,
      content: args.data.content,
      authorId: args.data.authorId ?? "admin",
      authorName: args.data.authorName ?? "plex-admin",
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    const thread = await ctx.db.get(args.data.threadId);

    if (thread) {
      await ctx.db.patch(thread._id, {
        replyCount: thread.replyCount + 1,
        lastReplyAt: timestamp,
        lastReplyBy: args.data.authorName ?? "plex-admin",
        updatedAt: timestamp,
      });
    }

    return replyId;
  },
});

export const updateForumReply = mutation({
  args: {
    id: v.id("forumReplies"),
    data: v.any(),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      ...args.data,
      updatedAt: Date.now(),
    });
  },
});

export const deleteForumReply = mutation({
  args: {
    id: v.id("forumReplies"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// ---------- Community ----------

export const listCommunityPosts = query({
  args: {
    publishedOnly: v.optional(v.boolean()),
  },

  handler: async (ctx, args) => {
    if (args.publishedOnly) {
      return await ctx.db
        .query("communityPosts")
        .withIndex("by_published", (q) => q.eq("published", true))
        .order("desc")
        .collect();
    }

    return await ctx.db.query("communityPosts").order("desc").collect();
  },
});

export const getCommunityPostBySlug = query({
  args: {
    slug: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("communityPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const createCommunityPost = mutation({
  args: {
    data: v.any(),
  },

  handler: async (ctx, args) => {
    const timestamp = Date.now();
    const published = args.data.published ?? false;

    return await ctx.db.insert("communityPosts", {
      title: args.data.title,
      slug: args.data.slug,
      content: args.data.content,
      excerpt: args.data.excerpt,
      authorId: args.data.authorId ?? "admin",
      authorName: args.data.authorName ?? "plex-admin",
      type: args.data.type,
      tags: args.data.tags ?? [],
      published,
      publishedAt: published ? timestamp : undefined,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

export const updateCommunityPost = mutation({
  args: {
    id: v.id("communityPosts"),
    data: v.any(),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      ...args.data,
      updatedAt: Date.now(),
    });
  },
});

export const deleteCommunityPost = mutation({
  args: {
    id: v.id("communityPosts"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// ---------- Workshop ----------

export const listWorkshopSessions = query({
  args: {
    publishedOnly: v.optional(v.boolean()),
  },

  handler: async (ctx, args) => {
    if (args.publishedOnly) {
      return await ctx.db
        .query("workshopSessions")
        .withIndex("by_published", (q) => q.eq("published", true))
        .order("desc")
        .collect();
    }

    return await ctx.db.query("workshopSessions").order("desc").collect();
  },
});

export const getWorkshopSessionBySlug = query({
  args: {
    slug: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("workshopSessions")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const createWorkshopSession = mutation({
  args: {
    data: v.any(),
  },

  handler: async (ctx, args) => {
    const timestamp = Date.now();
    const published = args.data.published ?? false;

    return await ctx.db.insert("workshopSessions", {
      title: args.data.title,
      slug: args.data.slug,
      description: args.data.description,
      content: args.data.content,
      coverImage: args.data.coverImage,
      presenter: args.data.presenter,
      presenterBio: args.data.presenterBio,
      duration: args.data.duration ?? "",
      level: args.data.level,
      tags: args.data.tags ?? [],
      published,
      publishedAt: published ? timestamp : undefined,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

export const updateWorkshopSession = mutation({
  args: {
    id: v.id("workshopSessions"),
    data: v.any(),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      ...args.data,
      updatedAt: Date.now(),
    });
  },
});

export const deleteWorkshopSession = mutation({
  args: {
    id: v.id("workshopSessions"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// ---------- Status ----------

export const listStatusIncidents = query({
  args: {
    publishedOnly: v.optional(v.boolean()),
  },

  handler: async (ctx) => {
    return await ctx.db.query("statusIncidents").order("desc").collect();
  },
});

export const getStatusIncidentBySlug = query({
  args: {
    slug: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("statusIncidents")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const createStatusIncident = mutation({
  args: {
    data: v.any(),
  },

  handler: async (ctx, args) => {
    const timestamp = Date.now();

    return await ctx.db.insert("statusIncidents", {
      title: args.data.title,
      slug: args.data.slug,
      status: args.data.status ?? "investigating",
      severity: args.data.severity ?? "minor",
      content: args.data.content,
      components: args.data.components ?? [],
      startedAt: timestamp,
      updates: args.data.updates ?? [],
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

export const updateStatusIncident = mutation({
  args: {
    id: v.id("statusIncidents"),
    data: v.any(),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      ...args.data,
      updatedAt: Date.now(),
    });
  },
});

export const deleteStatusIncident = mutation({
  args: {
    id: v.id("statusIncidents"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// ============================================================
// ADMIN USERS MANAGEMENT
// ============================================================

export const listAdminUsers = query({
  handler: async (ctx) => {
    return ctx.db.query("adminUsers").order("desc").collect();
  },
});

export const createAdminUser = mutation({
  args: {
    username: v.string(),
    password: v.string(),
    email: v.optional(v.string()),
    role: v.union(
      v.literal("super_admin"),
      v.literal("admin"),
      v.literal("editor")
    ),
  },

  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("adminUsers")
      .withIndex("by_username", (q) =>
        q.eq("username", args.username)
      )
      .unique();

    if (existing) {
      throw new Error("Username already exists");
    }

    const now = Date.now();
    const passwordHash = await hashPassword(args.password);

    return ctx.db.insert("adminUsers", {
      username: args.username,
      passwordHash,
      email: args.email,
      role: args.role,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateAdminUser = mutation({
  args: {
    id: v.id("adminUsers"),

    data: v.object({
      username: v.optional(v.string()),
      email: v.optional(v.string()),
      role: v.optional(
        v.union(
          v.literal("super_admin"),
          v.literal("admin"),
          v.literal("editor")
        )
      ),
    }),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      ...args.data,
      updatedAt: Date.now(),
    });
  },
});

export const deleteAdminUser = mutation({
  args: {
    id: v.id("adminUsers"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// ============================================================
// SEED INITIAL ADMIN USER
// ============================================================

export const seedAdminUser = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("adminUsers")
      .withIndex("by_username", (q) =>
        q.eq("username", "plex-admin")
      )
      .unique();

    if (!existing) {
      const passwordHash = await hashPassword(
        "974232573320660512@@BHi.PLEX"
      );

      await ctx.db.insert("adminUsers", {
        username: "plex-admin",
        passwordHash,
        role: "super_admin",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    return {
      success: true,
    };
  },
});
