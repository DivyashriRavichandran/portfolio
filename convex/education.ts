import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { localeString, localeArrString } from "./schema";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("education").collect();
  },
});

export const create = mutation({
  args: {
    image: v.string(),
    title: localeString,
    institution: localeString,
    period: localeString,
    duration: v.optional(localeString),
    grade: v.optional(v.string()),
    thesis: v.optional(
      v.object({ title: localeString, link: v.optional(v.string()) }),
    ),
    relevant_projects: v.optional(v.array(v.string())),
    key_modules: v.optional(localeArrString),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorised: System access denied.");

    return await ctx.db.insert("education", args);
  },
});

export const remove = mutation({
  args: { id: v.id("education") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorised");
    await ctx.db.delete(args.id);
  },
});
