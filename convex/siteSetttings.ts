import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("siteSettings").first();
  },
});

export const update = mutation({
  args: {
    id: v.id("siteSettings"),
    aboutBio: v.string(),
    heroTitle: v.string(),
    linkedinUrl: v.string(),
    githubUrl: v.string(),
    resumeUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...settings } = args;
    await ctx.db.patch(id, settings);
  },
});
