// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const localeString = v.object({ en: v.string(), nl: v.string() });

export default defineSchema({
  projects: defineTable({
    title: localeString,
    year: v.number(),
    icon: v.string(),
    categories: v.array(v.string()),
    description: localeString,
    tech_stack: v.array(v.string()),
    project_link: v.string(),
    github_link: v.optional(v.string()),
    images: v.array(v.string()),
  }),
  education: defineTable({
    image: v.string(),
    title: localeString,
    institution: localeString,
    period: localeString,
    duration: v.optional(localeString),
    grade: v.optional(v.string()),
    thesis: v.optional(
      v.object({ title: v.string(), link: v.optional(v.string()) }),
    ),
    relevant_projects: v.optional(v.array(v.string())),
    key_modules: v.optional(v.array(v.string())),
  }),

  experience: defineTable({
    image: v.string(),
    title: localeString,
    institution: localeString, // Used as Company Name
    period: localeString,
    key_outcomes: v.optional(v.array(v.string())),
    technologies: v.optional(v.array(v.string())),
  }),

  siteSettings: defineTable({
    aboutBio: v.string(),
    navbarLinks: v.array(v.object({ label: v.string(), href: v.string() })),
    resumeUrl: v.string(),
    linkedinUrl: v.string(),
    githubUrl: v.string(),
    heroTitle: v.string(),
  }),
});
