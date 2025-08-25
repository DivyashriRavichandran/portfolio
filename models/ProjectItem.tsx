import { IconType } from "react-icons";

export interface ProjectItem {
  title: string;
  description: string;
  techStack: {
    name: string;
    icon: IconType;
  }[];
  video?: string;
  githubLink?: string;
  websiteLink?: string;
}
