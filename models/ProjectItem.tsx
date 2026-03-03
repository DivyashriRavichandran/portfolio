import { Id } from "@/convex/_generated/dataModel";

export interface ProjectItem {
  _id?: Id<"projects">;
  title: { en: string; nl: string };
  year: number;
  icon: string;
  categories: string[];
  description: { en: string; nl: string };
  tech_stack: string[];
  project_link: string;
  github_link?: string;
  images: string[];
}
