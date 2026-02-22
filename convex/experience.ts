import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// 1. FETCH ALL EXPERIENCE ENTRIES
export const get = query({
  handler: async (ctx) => {
    // We sort by 'order' or default to newest first if you add a 'current' field
    return await ctx.db.query("experience").collect();
  },
});

// 2. LOG NEW WORK HISTORY
export const create = mutation({
  args: {
    image: v.string(),
    title: v.object({ en: v.string(), nl: v.string() }),
    institution: v.object({ en: v.string(), nl: v.string() }), // The Company Name
    period: v.object({ en: v.string(), nl: v.string() }),
    key_outcomes: v.optional(v.array(v.string())),
    technologies: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity || identity.email !== "your-email@example.com") {
      throw new Error("Unauthorised: Terminal access restricted.");
    }

    return await ctx.db.insert("experience", args);
  },
});

// 3. PURGE FROM HISTORY
export const remove = mutation({
  args: { id: v.id("experience") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || identity.email !== "your-email@example.com") {
      throw new Error("Unauthorised");
    }
    await ctx.db.delete(args.id);
  },
});
