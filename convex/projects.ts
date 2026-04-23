import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const localeString = v.object({ en: v.string(), nl: v.string() });

const categoriesSchema = v.object({
  en: v.array(v.string()),
  nl: v.array(v.string()),
});

const projectFields = {
  order: v.optional(v.number()),
  title: localeString,
  slug: v.optional(v.string()),
  description: localeString,
  year: v.number(),

  motivation: v.optional(localeString),
  execution: v.optional(localeString),
  result: v.optional(localeString),
  challenge: v.optional(localeString),
  solution: v.optional(localeString),

  categories: categoriesSchema,
  tech_stack: v.array(v.string()),
  features: categoriesSchema,

  project_link: v.string(),
  github_link: v.optional(v.string()),

  mockup: v.optional(v.string()),
  architecture: v.optional(v.string()),
  images: v.array(v.string()),
};
const inputFields = {
  title: localeString,
  description: localeString,
  slug: v.optional(v.string()),
  year: v.number(),

  motivation: v.optional(localeString),
  execution: v.optional(localeString),
  result: v.optional(localeString),
  challenge: v.optional(localeString),
  solution: v.optional(localeString),

  categories: categoriesSchema,
  tech_stack: v.array(v.string()),
  features: categoriesSchema,

  project_link: v.string(),
  github_link: v.optional(v.string()),

  mockup: v.optional(v.string()),
  architecture: v.optional(v.string()),
  images: v.array(v.string()),
};

export const list = query({
  handler: async (ctx) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_order")
      .collect();

    return await Promise.all(
      projects.map(async (project) => ({
        ...project,
        mockupUrl: project.mockup
          ? await ctx.storage.getUrl(project.mockup)
          : null,

        architectureUrl: project.architecture
          ? await ctx.storage.getUrl(project.architecture)
          : null,

        imageUrls: await Promise.all(
          project.images.map((img) => ctx.storage.getUrl(img)),
        ),
      })),
    );
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const project = await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (!project) return null;

    return {
      ...project,
      mockupUrl: project.mockup
        ? await ctx.storage.getUrl(project.mockup)
        : null,

      architectureUrl: project.architecture
        ? await ctx.storage.getUrl(project.architecture)
        : null,

      imageUrls: await Promise.all(
        project.images.map((img) => ctx.storage.getUrl(img)),
      ),
    };
  },
});
export const create = mutation({
  args: inputFields,
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const firstProject = await ctx.db.query("projects").order("asc").first();
    const currentFirstOrder = firstProject?.order ?? 0;
    const newOrder = currentFirstOrder - 1;

    return await ctx.db.insert("projects", {
      ...args,
      order: newOrder,
    });
  },
});

export const update = mutation({
  args: { id: v.id("projects"), ...projectFields },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized: Access Denied");

    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized: Access Denied");

    await ctx.db.delete(id);
  },
});

export const reorder = mutation({
  args: {
    id: v.id("projects"),
    newOrder: v.number(),
  },
  handler: async (ctx, { id, newOrder }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    await ctx.db.patch(id, { order: newOrder });
  },
});
