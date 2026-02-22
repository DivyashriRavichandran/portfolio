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

export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    // Only you (the admin) can delete
    if (!identity) {
      throw new Error("Unauthorised");
    }
    await ctx.db.delete(args.id);
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
