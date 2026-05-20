import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const get = query({
  handler: async (ctx) => {
    const projects = await ctx.db.query("blogs").order("desc").collect();

    return await Promise.all(
      projects.map(async (project) => ({
        ...project,
        imageUrl: project.coverImage
          ? await ctx.storage.getUrl(project.coverImage)
          : null,
      })),
    );
  },
});

export const create = mutation({
  args: {
    slug: v.string(),
    title: v.object({
      en: v.string(),
      nl: v.string(),
    }),
    description: v.object({
      en: v.string(),
      nl: v.string(),
    }),
    content: v.object({
      en: v.string(),
      nl: v.string(),
    }),
    coverImage: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    timeToRead: v.optional(v.number()),
    publishedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const projectId = await ctx.db.insert("blogs", {
      ...args,
    });
    return projectId;
  },
});

export const getById = query({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);

    if (!project) return null;

    return project;
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const blog = await ctx.db
      .query("blogs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (!blog) return null;

    return {
      ...blog,
      coverImageUrl: blog.coverImage
        ? await ctx.storage.getUrl(blog.coverImage)
        : null,
    };
  },
});

export const update = mutation({
  args: {
    id: v.id("blogs"),
    slug: v.string(),
    title: v.object({
      en: v.string(),
      nl: v.string(),
    }),
    description: v.object({
      en: v.string(),
      nl: v.string(),
    }),
    content: v.object({
      en: v.string(),
      nl: v.string(),
    }),
    coverImage: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    timeToRead: v.optional(v.number()),
    publishedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized: Access Denied");

    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { id: v.id("blogs") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized: Access Denied");

    await ctx.db.delete(id);
  },
});
