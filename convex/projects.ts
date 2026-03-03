import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  },
});

export const create = mutation({
  args: {
    title: v.object({ en: v.string(), nl: v.string() }),
    year: v.number(),
    icon: v.string(),
    categories: v.array(v.string()),
    description: v.object({ en: v.string(), nl: v.string() }),
    tech_stack: v.array(v.string()),
    project_link: v.string(),
    github_link: v.optional(v.string()),
    images: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const newProjectId = await ctx.db.insert("projects", args);
    return newProjectId;
  },
});

export const update = mutation({
  args: {
    id: v.id("projects"),
    title: v.object({ en: v.string(), nl: v.string() }),
    year: v.number(),
    icon: v.string(),
    categories: v.array(v.string()),
    description: v.object({ en: v.string(), nl: v.string() }),
    tech_stack: v.array(v.string()),
    project_link: v.string(),
    github_link: v.optional(v.string()),
    images: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      title: args.title,
      year: args.year,
      icon: args.icon,
      categories: args.categories,
      description: args.description,
      tech_stack: args.tech_stack,
      project_link: args.project_link,
      github_link: args.github_link,
      images: args.images,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorised");
    }
    await ctx.db.delete(args.id);
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
