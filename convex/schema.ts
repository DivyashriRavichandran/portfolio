import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Multilingual support
export const localeString = v.object({ en: v.string(), nl: v.string() });
export const localeArrString = v.object({
  en: v.array(v.string()),
  nl: v.array(v.string()),
});

export default defineSchema({
  projects: defineTable({
    order: v.optional(v.number()),
    title: localeString,
    year: v.number(),
    description: localeString,
    motivation: v.optional(localeString),
    execution: v.optional(localeString),
    result: v.optional(localeString),
    challenge: v.optional(localeString),
    solution: v.optional(localeString),
    categories: v.object({
      en: v.array(v.string()),
      nl: v.array(v.string()),
    }),
    tech_stack: v.array(v.string()),
    features: v.optional(
      v.object({
        en: v.array(v.string()),
        nl: v.array(v.string()),
      }),
    ),
    project_link: v.string(),
    github_link: v.optional(v.string()),
    mockup: v.optional(v.string()), // StorageID
    images: v.array(v.string()), // Array of StorageIDs
    architecture: v.optional(v.string()),
  }).index("by_order", ["order"]),

  about: defineTable({
    menu_items: v.array(v.object({ label: localeString, href: v.string() })),
    about: localeString,
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
  }),

  career: defineTable({
    type: v.union(v.literal("education"), v.literal("experience")),
    logo: v.optional(v.string()),
    title: localeString, // Job title or degree
    organization: localeString, // Company or university
    location: v.optional(localeString),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    current: v.optional(v.boolean()),
    achievements: v.optional(localeArrString),
    tags: v.optional(v.array(v.string())),
    grade: v.optional(v.string()),
    category: v.optional(v.string()),
    url: v.optional(v.string()),
    order: v.optional(v.number()),
  }).index("by_order", ["order"]),
});
