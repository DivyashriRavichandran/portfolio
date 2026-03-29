import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { localeArrString, localeString } from "./schema";

export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query("about").first();
  },
});

export const update = mutation({
  args: {
    id: v.id("about"),
    about: localeString,
    menu_items: v.array(v.object({ label: localeString, href: v.string() })),
    tech_stack: v.array(v.string()),
    spotify_playlist: v.optional(v.array(v.string())),
    hardware: v.optional(localeArrString),
    interests: v.optional(
      v.array(
        v.object({
          title: localeString,
          description: localeString,
        }),
      ),
    ),
    resume: v.optional(v.string()), // storageId
    linkedin: v.string(),
    github: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;

    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("About document not found.");

    await ctx.db.patch(id, data);
    return id;
  },
});
