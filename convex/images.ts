import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const getUrls = query({
  args: { storageIds: v.array(v.string()) },
  handler: async (ctx, args) => {
    return Promise.all(args.storageIds.map((id) => ctx.storage.getUrl(id)));
  },
});

export const deleteUnusedFiles = mutation({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();

    const usedStorageIds = new Set<string>();

    for (const project of projects) {
      if (project.mockup) {
        usedStorageIds.add(project.mockup);
      }
      // if (project.architecture) {
      //   usedStorageIds.add(project.architecture);
      // }
      // if (project.images) {
      //   project.images.forEach((image) => usedStorageIds.add(image));
      // }
      // If you have multiple file fields per row, add them here:
      // if (project.avatarId) usedStorageIds.add(project.avatarId);
    }

    const allFiles = await ctx.db.system.query("_storage").collect();

    let deletedCount = 0;

    for (const file of allFiles) {
      if (!usedStorageIds.has(file._id)) {
        await ctx.storage.delete(file._id);
        deletedCount++;
      }
    }

    return `Cleanup complete. Deleted ${deletedCount} unused files.`;
  },
});
