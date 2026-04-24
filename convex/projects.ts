import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { metricCard, localeString } from "./schema";

const categoriesSchema = v.object({
  en: v.array(v.string()),
  nl: v.array(v.string()),
});

const impactSchema = v.object({
  en: v.array(metricCard),
  nl: v.array(metricCard),
});

// 2. Define the core fields once
const coreProjectFields = {
  title: localeString,
  slug: v.optional(v.string()),
  description: localeString,
  year: v.number(),

  // Case study fields
  motivation: v.optional(localeString),
  execution: v.optional(localeString),
  impact: v.optional(impactSchema),
  challenge: v.optional(localeString),
  learning: v.optional(localeString),
  future: v.optional(localeString),

  // Fields marked for deletion/legacy
  solution: v.optional(localeString),
  result: v.optional(localeString),
  features: v.optional(categoriesSchema),

  // Technical info
  categories: categoriesSchema,
  tech_stack: v.array(v.string()),
  project_link: v.string(),
  github_link: v.optional(v.string()),

  // Assets
  mockup: v.optional(v.string()),
  architecture: v.optional(v.string()),
  images: v.array(v.string()),
};

// mutation args for 'update' (includes ID and order)
const projectFields = {
  ...coreProjectFields,
  order: v.optional(v.number()),
};

// mutation args for 'create'
const inputFields = {
  ...coreProjectFields,
};

// --- Queries ---
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

// --- Mutations ---
export const create = mutation({
  args: inputFields,
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // Auto-increment order logic (placing new projects at the start)
    const firstProject = await ctx.db
      .query("projects")
      .withIndex("by_order")
      .first();
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
