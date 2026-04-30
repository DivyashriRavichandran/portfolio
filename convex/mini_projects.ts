import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const get = query({
  handler: async (ctx) => {
    const projects = await ctx.db.query("mini_projects").collect();

    return await Promise.all(
      projects.map(async (project) => ({
        ...project,
        imageUrl: project.image
          ? await ctx.storage.getUrl(project.image)
          : null,
      })),
    );
  },
});

export const create = mutation({
  args: {
    title: v.object({
      en: v.string(),
      nl: v.string(),
    }),
    description: v.object({
      en: v.string(),
      nl: v.string(),
    }),
    image: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    url: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const projectId = await ctx.db.insert("mini_projects", {
      title: args.title,
      description: args.description,
      image: args.image,
      tags: args.tags,
      url: args.url,
    });
    return projectId;
  },
});

export const getById = query({
  args: { id: v.id("mini_projects") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);

    if (!project) return null;

    return project;
  },
});

export const update = mutation({
  args: {
    id: v.id("mini_projects"),
    title: v.object({
      en: v.string(),
      nl: v.string(),
    }),
    description: v.object({
      en: v.string(),
      nl: v.string(),
    }),
    image: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    url: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized: Access Denied");

    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { id: v.id("mini_projects") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized: Access Denied");

    await ctx.db.delete(id);
  },
});
