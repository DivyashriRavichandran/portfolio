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
    features: v.optional(v.array(v.string())),
    project_link: v.string(),
    github_link: v.optional(v.string()),
    mockup: v.optional(v.string()), // StorageID
    images: v.array(v.string()), // Array of StorageIDs
    architecture: v.optional(v.string()),
  }),
  education: defineTable({
    image: v.string(),
    title: localeString,
    institution: localeString,
    period: localeString,
    duration: v.optional(localeString),
    grade: v.optional(v.string()),
    thesis: v.optional(
      v.object({ title: localeString, link: v.optional(v.string()) }),
    ),
    relevant_projects: v.optional(v.array(v.string())),
    key_modules: v.optional(localeArrString),
  }),

  experience: defineTable({
    image: v.string(),
    title: localeString,
    institution: localeString,
    duration: localeString,
    period: localeString,
    key_outcomes: v.optional(localeArrString),
    technologies: v.optional(v.array(v.string())),
  }),

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
});
