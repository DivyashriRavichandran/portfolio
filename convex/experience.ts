import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { localeString, localeArrString } from "./schema";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("experience").collect();
  },
});

export const create = mutation({
  args: {
    image: v.string(),
    title: localeString,
    institution: localeString,
    duration: localeString,
    period: localeString,
    key_outcomes: v.optional(localeArrString),
    technologies: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorised: Terminal access restricted.");

    return await ctx.db.insert("experience", args);
  },
});

export const remove = mutation({
  args: { id: v.id("experience") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorised");
    await ctx.db.delete(args.id);
  },
});
