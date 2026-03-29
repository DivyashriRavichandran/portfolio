import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Common schema for localized fields
const localeString = v.object({ en: v.string(), nl: v.string() });
const categoriesSchema = v.object({
  en: v.array(v.string()),
  nl: v.array(v.string()),
});

const projectFields = {
  title: localeString,
  year: v.number(),
  categories: categoriesSchema,
  description: localeString,
  tech_stack: v.array(v.string()),
  project_link: v.string(),
  github_link: v.optional(v.string()),
  images: v.array(v.string()),
  mockup: v.string(),
};

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  },
});

export const create = mutation({
  args: projectFields,
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", args);
  },
});

export const update = mutation({
  args: { id: v.id("projects"), ...projectFields },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    await ctx.db.delete(id);
  },
});
