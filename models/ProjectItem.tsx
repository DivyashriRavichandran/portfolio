import { StaticImageData } from "next/image";
import { IconType } from "react-icons";

export interface ProjectItem {
  title: string;
  description: string;
  techStack: {
    name: string;
    icon: IconType;
  }[];
  images?: StaticImageData[];
  video?: string;
  githubLink?: string;
  websiteLink?: string;
}
