import React from "react";
import { FaJava } from "react-icons/fa";
import ScrollAnimation from "../custom/ScrollAnimation";
import {
  SiKeras,
  SiMongodb,
  SiNextdotjs,
  SiPytest,
  SiSpringboot,
  SiTailwindcss,
  SiTensorflow,
} from "react-icons/si";
import { IconType } from "react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image, { StaticImageData } from "next/image";

import image1 from "@/assets/images/1.jpg";
import image2 from "@/assets/images/2.jpg";
import image3 from "@/assets/images/3.jpg";
import P1_image1 from "@/assets/images/cinedb-1.png";
import P1_image2 from "@/assets/images/cinedb-2.png";
import P1_image3 from "@/assets/images/cinedb-3.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import ActionButton from "../ActionButton";
import Heading from "../Heading";

type ProjectProps = {
  title: string;
  type: string;
  year: string;
  description: string;
  techStack: {
    name: string;
    icon: IconType;
  }[];
  images?: StaticImageData[];
  githubLink?: string;
  websiteLink?: string;
};

const ProjectsSection = () => {
  const Projects: ProjectProps[] = [
    {
      title: "CINEDB",
      type: "Frontend",
      year: "2025",
      description: "Movie database application using TMDB API",
      techStack: [
        { name: "Next.js", icon: SiNextdotjs },
        { name: "Tailwind CSS", icon: SiTailwindcss },
      ],
      images: [P1_image1, P1_image2, P1_image3],
      githubLink: "https://github.com/DivyashriRavichandran/cine-db",
      websiteLink: "https://cinedb-web.vercel.app",
    },
    {
      title: "PAYGEZ",
      type: "Frontend",
      year: "2025",
      description: "Social media e-commerce platform developed at KP Platforms",
      techStack: [
        { name: "Next.js", icon: SiNextdotjs },
        { name: "Tailwind CSS", icon: SiTailwindcss },
      ],
      images: [image1, image2, image3],
      websiteLink: "https://paygez.com",
    },
    {
      title: "RecipeDash",
      type: "Backend",
      year: "2025",
      description: "Simple CRUD application for managing recipes",
      techStack: [
        { name: "Java", icon: FaJava },
        { name: "Spring Boot", icon: SiSpringboot },
        { name: "MongoDB", icon: SiMongodb },
      ],
      images: [image1, image2, image3],
      githubLink: "https://github.com/yourusername/recipedash",
      websiteLink: "https://recipedash.site",
    },
    {
      title: "Lung Cancer Detection using DCGAN Model - Dissertation",
      type: "dissertation",
      year: "2024",
      description:
        "A deep learning model for data augementation and classification of lung cancer images.",
      techStack: [
        { name: "Keras", icon: SiKeras },
        { name: "TensorFlow", icon: SiTensorflow },
        { name: "PyTest", icon: SiPytest },
      ],
      images: [image1, image2, image3],
      githubLink:
        "https://github.com/DivyashriRavichandran/Lung-Cancer-Classifier",
      websiteLink:
        "https://www.linkedin.com/in/divyashri-ravichandran/overlay/1726242566093/single-media-viewer/?profileId=ACoAADnahAABN7xSWUAT0reDfOdlR9AYpx4hBkk",
    },
  ];

  return (
    <div className="container mx-auto px-4 my-10 md:my-20">
      <Heading title={"Latest Works"} subtitle={"Featured Projects"} />

      {/* PROJECTS */}
      <div className="mt-6 md:mt-12 grid gap-8 md:grid-cols-2">
        {Projects.map((project, index) => (
          <ScrollAnimation
            key={index}
            delay={0.2 * index}
            direction={index % 2 === 0 ? "left" : "right"}
          >
            <div className="relative group overflow-hidden rounded-xl border bg-background/60 px-5 py-6 md:p-8 shadow-md hover:scale-105 transition duration-200">
              {/* Glow gradient from corner */}
              <div className="absolute -top-1/3 -right-1/3 h-2/3 w-2/3 rounded-full bg-gradient-to-br from-primary to-secondary opacity-0 blur-2xl transition duration-500 group-hover:opacity-50 group-hover:scale-125" />

              <div className="flex flex-col justify-between gap-6 md:gap-8">
                {/* LEFT CONTENT */}
                <div>
                  <h3 className="text-xl md:text-2xl leading-6 md:leading-8 tracking-tight font-bold z-40">
                    {project.title}
                  </h3>
                  <div className="md:w-1/2 flex flex-col justify-between h-full">
                    <div>
                      <p className="mt-2 text-sm text-muted-foreground mr-2">
                        {project.description}
                      </p>

                      {/* TECH STACK ICONS */}
                      <div className="mt-3 flex flex-wrap gap-x-2">
                        {project.techStack.map((tech, index) => (
                          <span key={index}>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <tech.icon className="size-9 rounded-full bg-card p-2" />
                                </TooltipTrigger>
                                <TooltipContent>{tech.name}</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="mt-3 flex flex-wrap gap-2 md:gap-4">
                      {project.type == "dissertation" ? (
                        <a
                          href={project.websiteLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ActionButton text="Project Report" />
                        </a>
                      ) : (
                        <a
                          href={project.websiteLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ActionButton text="Live Demo" />
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ActionButton text="View Code" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* IMAGES */}
                <div className="md:absolute md:-bottom-4 overflow-hidden md:-right-4 h-full md:h-48 w-full md:w-1/2 group-hover:bottom-0 group-hover:right-0 transition-all duration-300">
                  <Carousel>
                    <CarouselContent>
                      {project?.images?.map((image, index) => (
                        <CarouselItem key={index}>
                          <Image
                            src={image}
                            alt=""
                            width={500}
                            height={500}
                            className="h-48 w-full object-fill rounded-lg md:rounded-tl-xl border"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="md:opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2" />
                      <CarouselNext className="right-2 top-1/2 -translate-y-1/2" />
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
