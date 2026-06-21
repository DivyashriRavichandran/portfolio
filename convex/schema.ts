import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Multilingual support
export const localeString = v.object({ en: v.string(), nl: v.string() });
export const localeArrString = v.object({
  en: v.array(v.string()),
  nl: v.array(v.string()),
});

export const hardware = v.object({
  icon: v.string(),
  title: localeString,
  product: v.string(),
});

export const favCard = v.object({
  icon: v.string(),
  title: v.string(),
  desc: v.string(),
});

export const metricCard = v.object({
  title: v.string(),
  sub: v.string(),
  desc: v.string(),
});

export default defineSchema({
  projects: defineTable({
    // Basic info
    order: v.optional(v.number()),
    title: localeString,
    slug: v.optional(v.string()),
    year: v.number(),
    description: localeString,
    tech_stack: v.array(v.string()),
    categories: v.object({
      en: v.array(v.string()),
      nl: v.array(v.string()),
    }),

    // Case study
    motivation: v.optional(localeString), // why
    execution: v.optional(localeString), // how
    impact: v.optional(
      v.object({
        en: v.array(metricCard),
        nl: v.array(metricCard),
      }),
    ), // impact/metrics
    challenge: v.optional(localeString), // challenge + solution
    learning: v.optional(localeString), // key learnings
    future: v.optional(localeString), // future

    solution: v.optional(localeString), // delete later

    result: v.optional(localeString), // delete later
    features: v.optional(
      v.object({
        en: v.array(v.string()),
        nl: v.array(v.string()),
      }),
    ), // delete later

    // Links
    project_link: v.string(),
    github_link: v.optional(v.string()),

    // Images
    mockup: v.optional(v.string()), // StorageID
    images: v.array(v.string()), // Array of StorageIDs
    architecture: v.optional(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_order", ["order"]),

  about: defineTable({
    image: v.optional(v.string()),
    bio: localeString,
    more_bio: localeString,
    favourites: v.optional(v.array(favCard)),
    hardware: v.optional(v.array(hardware)),
    spotify_playlist: v.optional(v.array(v.string())),
    linkedin: v.string(),
    github: v.string(),
    email: v.string(),
    resume: v.optional(v.string()), // storageId
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
    achievements: v.optional(localeArrString), //delete
    contributions: v.optional(localeString),
    tags: v.optional(v.array(v.string())),
    grade: v.optional(v.string()),
    category: v.optional(v.string()),
    url: v.optional(v.string()),
    websites: v.optional(v.array(v.string())),
    order: v.optional(v.number()),
  }).index("by_order", ["order"]),

  mini_projects: defineTable({
    image: v.optional(v.string()),
    title: localeString,
    description: localeString,
    tags: v.optional(v.array(v.string())),
    url: v.optional(v.string()),
  }),

  blogs: defineTable({
    slug: v.string(),
    coverImage: v.optional(v.string()),
    title: localeString,
    description: localeString,
    content: localeString, // Markdown
    tags: v.optional(v.array(v.string())),
    timeToRead: v.optional(v.number()), // in minutes
    publishedAt: v.optional(v.number()),
  }).index("by_slug", ["slug"]),
});
