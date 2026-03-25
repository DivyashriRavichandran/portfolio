import { StaticImageData } from "next/image";
import { IconType } from "react-icons";

export interface ProjectItemOld {
  title: string;
  description: string;
  techStack: TechStack[];
  video?: string;
  websiteLink: string;
  githubLink?: string;
  images?: StaticImageData[];
}

type TechStack = {
  name: string;
  icon: IconType;
};
