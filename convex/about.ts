import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Renamed to 'get' as it returns a single object, not a list
export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query("about").first();
  },
});

// ADD THIS: Needed to turn Storage IDs into viewable URLs
export const getUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

// Add this to your mutations file
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const update = mutation({
  args: {
    id: v.id("about"),
    heroTitle: v.string(),
    biography: v.string(),
    navbarLinks: v.array(
      v.object({
        label: v.string(),
        href: v.string(),
      }),
    ),
    techStack: v.array(v.string()),
    spotify_playlist: v.optional(v.array(v.string())),
    hardware_setup: v.optional(v.array(v.string())),
    // Update your existing 'update' mutation interests object:
    interests: v.optional(
      v.array(
        v.object({
          title: v.string(),
          description: v.string(),
          image: v.string(), // This will store the Convex Storage ID
        }),
      ),
    ),
    resumeUrl: v.string(),
    linkedinUrl: v.string(),
    githubUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...settings } = args;

    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error("About configuration document not found.");
    }

    await ctx.db.patch(id, settings);
    return id;
  },
});
