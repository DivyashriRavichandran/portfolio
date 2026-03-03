import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query("education").collect();
  },
});

export const create = mutation({
  args: {
    image: v.string(),
    title: v.object({ en: v.string(), nl: v.string() }),
    institution: v.object({ en: v.string(), nl: v.string() }),
    period: v.object({ en: v.string(), nl: v.string() }),
    duration: v.optional(v.object({ en: v.string(), nl: v.string() })),
    grade: v.optional(v.string()),
    thesis: v.optional(
      v.object({
        title: v.string(),
        link: v.optional(v.string()),
      }),
    ),
    relevant_projects: v.optional(v.array(v.string())),
    key_modules: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorised: System access denied.");
    }

    return await ctx.db.insert("education", args);
  },
});

export const remove = mutation({
  args: { id: v.id("education") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || identity.email !== "your-email@example.com") {
      throw new Error("Unauthorised");
    }
    await ctx.db.delete(args.id);
  },
});
