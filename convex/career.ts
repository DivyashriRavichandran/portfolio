import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const localeString = v.object({
  en: v.string(),
  nl: v.string(),
});

const localeArrString = v.object({
  en: v.array(v.string()),
  nl: v.array(v.string()),
});

const careerFields = {
  order: v.optional(v.number()),

  type: v.union(v.literal("education"), v.literal("experience")),

  title: localeString,
  organization: localeString,
  location: v.optional(localeString),

  startDate: v.string(),
  endDate: v.optional(v.string()),
  current: v.optional(v.boolean()),

  achievements: v.optional(localeArrString),

  tags: v.optional(v.array(v.string())),

  grade: v.optional(v.string()),
  category: v.optional(v.string()),

  logo: v.optional(v.string()),
  url: v.optional(v.string()),
};

const inputFields = {
  type: v.union(v.literal("education"), v.literal("experience")),

  title: localeString,
  organization: localeString,
  location: v.optional(localeString),

  startDate: v.string(),
  endDate: v.optional(v.string()),
  current: v.optional(v.boolean()),

  achievements: v.optional(localeArrString),

  tags: v.optional(v.array(v.string())),

  grade: v.optional(v.string()),
  category: v.optional(v.string()),

  logo: v.optional(v.string()),
  url: v.optional(v.string()),
};

export const list = query({
  handler: async (ctx) => {
    const careers = await ctx.db
      .query("career")
      .withIndex("by_order")
      .collect();

    return await Promise.all(
      careers.map(async (career) => ({
        ...career,
        logoUrl: career.logo ? await ctx.storage.getUrl(career.logo) : null,
      })),
    );
  },
});

export const getById = query({
  args: { id: v.id("career") },
  handler: async (ctx, args) => {
    const career = await ctx.db.get(args.id);

    if (!career) return null;

    return {
      ...career,
      logoUrl: career.logo ? await ctx.storage.getUrl(career.logo) : null,
    };
  },
});
export const create = mutation({
  args: inputFields,
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const firstItem = await ctx.db.query("career").order("asc").first();
    const currentFirstOrder = firstItem?.order ?? 0;
    const newOrder = currentFirstOrder - 1;

    return await ctx.db.insert("career", {
      ...args,
      order: newOrder,
    });
  },
});

export const update = mutation({
  args: { id: v.id("career"), ...careerFields },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    // if (!identity) throw new Error("Unauthorized");

    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { id: v.id("career") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    await ctx.db.delete(id);
  },
});

export const reorder = mutation({
  args: {
    id: v.id("career"),
    newOrder: v.number(),
  },
  handler: async (ctx, { id, newOrder }) => {
    const identity = await ctx.auth.getUserIdentity();
    // if (!identity) throw new Error("Unauthorized");

    await ctx.db.patch(id, { order: newOrder });
  },
});
