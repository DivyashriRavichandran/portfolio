import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { favCard, hardware, localeString } from "./schema";

export const get = query({
  handler: async (ctx) => {
    const about = await ctx.db.query("about").first();

    if (!about) return null;

    return {
      ...about,
      imageUrl: about.image ? await ctx.storage.getUrl(about.image) : null,
    };
  },
});

export const update = mutation({
  args: {
    id: v.id("about"),
    image: v.optional(v.string()),
    bio: localeString,
    more_bio: localeString,
    favourites: v.optional(v.array(favCard)),
    hardware: v.optional(v.array(hardware)),
    spotify_playlist: v.optional(v.array(v.string())),
    linkedin: v.string(),
    github: v.string(),
    email: v.string(),
    resume: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;

    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("About document not found.");

    await ctx.db.patch(id, data);
    return id;
  },
});
