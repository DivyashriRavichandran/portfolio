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
