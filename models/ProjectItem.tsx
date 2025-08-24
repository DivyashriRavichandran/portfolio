import { StaticImageData } from "next/image";
import { IconType } from "react-icons";

export interface ProjectItem {
  title: string;
  type: string;
  year: string;
  description: string;
  detailedDescription?: string;
  features?: string[];
  techStack: {
    name: string;
    icon: IconType;
  }[];
  images: StaticImageData[];
  video?: string;
  githubLink?: string;
  websiteLink?: string;
}
