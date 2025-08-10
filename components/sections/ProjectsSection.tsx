import React, { useState } from "react";
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";

import ActionButton from "../ActionButton";
import Heading from "../Heading";

import P1_image1 from "@/assets/images/cinedb-1.png";
import P1_image2 from "@/assets/images/cinedb-2.png";
import P1_image3 from "@/assets/images/cinedb-3.png";
import P2_image1 from "@/assets/images/paygez-1.png";
import P2_image2 from "@/assets/images/paygez-2.png";
import P2_image3 from "@/assets/images/paygez-3.png";
import P2_image4 from "@/assets/images/paygez-4.png";

import image1 from "@/assets/images/1.jpg";
import image2 from "@/assets/images/2.jpg";
import image3 from "@/assets/images/3.jpg";
import ProjectDetails from "../ProjectDetails";

type ProjectProps = {
  title: string;
  type: string;
  year: string;
  description: string;
  detailedDescription?: string;
  features?: string[];
  challenges?: string[];
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
      description:
        "Movie database application using TMDB API, with search, filters.",
      detailedDescription:
        "CINEDB is a full-featured movie database app leveraging TMDB API, with search, filters, and detailed movie pages including trailers and ratings.",
      features: [
        "Search movies and TV shows",
        "Filter by genre and year",
        "Watch trailers inside the app",
        "Responsive UI with Next.js and Tailwind CSS",
      ],
      challenges: [
        "Optimizing API calls for performance",
        "Implementing responsive carousel for images",
      ],
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
      detailedDescription:
        "PAYGEZ combines social media features with e-commerce capabilities to offer users an engaging shopping experience.",
      features: [
        "User profiles and social feeds",
        "Integrated shopping cart and payments",
        "Real-time notifications",
      ],
      techStack: [
        { name: "Next.js", icon: SiNextdotjs },
        { name: "Tailwind CSS", icon: SiTailwindcss },
      ],
      images: [P2_image1, P2_image2, P2_image3, P2_image4],
      websiteLink: "https://paygez.com",
    },
    {
      title: "RecipeDash",
      type: "Backend",
      year: "2025",
      description: "Simple CRUD application for managing recipes",
      detailedDescription:
        "RecipeDash is a backend focused CRUD app to create, update, delete, and search recipes.",
      features: [
        "REST API with Spring Boot",
        "MongoDB database",
        "Unit testing with PyTest",
      ],
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
      title: "Lung Cancer Detection using DCGAN Model",
      type: "dissertation",
      year: "2024",
      description:
        "A deep learning model for data augmentation and classification of lung cancer images.",
      detailedDescription:
        "Developed a DCGAN-based deep learning pipeline to augment lung cancer image data and improve classification accuracy.",
      features: [
        "Data augmentation with DCGAN",
        "Image classification with Keras and TensorFlow",
        "Model validation using PyTest",
      ],
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

  // State to open dialog and hold current project
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(
    null
  );

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
            <div
              onClick={() => setSelectedProject(project)}
              className="relative cursor-pointer group overflow-hidden rounded-xl border bg-background/60 px-5 py-6 md:p-8 shadow-md hover:scale-105 transition duration-200"
            >
              {/* Glow gradient */}
              <div className="-z-10 absolute -top-1/3 -right-1/3 h-2/3 w-2/3 rounded-full bg-gradient-to-br from-primary to-secondary opacity-0 blur-2xl transition duration-500 group-hover:opacity-50 group-hover:scale-125" />

              <div className="flex flex-col justify-between gap-6 md:gap-8">
                {/* LEFT CONTENT */}
                <div>
                  <h3 className="text-xl md:text-2xl leading-6 md:leading-8 tracking-tight font-bold">
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
                                  <tech.icon className="size-7 rounded-full bg-card p-1.5" />
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
                      {project.type === "dissertation" ? (
                        <a
                          href={project.websiteLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ActionButton text="Project Report" />
                        </a>
                      ) : (
                        <a
                          href={project.websiteLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ActionButton text="Live Demo" />
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
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
                            className="h-48 w-full object-fill rounded-tl-lg md:rounded-tl-xl border-l border-t"
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

      {/* DIALOG FOR PROJECT DETAILS */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent
          className="
    min-w-[80vw] max-h-[80vh] 
    bg-background rounded-lg shadow-lg 
    grid grid-cols-2 gap-8 p-8 overflow-hidden
  "
        >
          {/* LEFT side: Details */}
          <div className="flex flex-col justify-between">
            <div className="flex flex-col">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-3xl font-bold">
                  {selectedProject?.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground mt-2">
                  {selectedProject?.detailedDescription}
                </DialogDescription>
              </DialogHeader>

              {/* Tech Stack */}
              <div className="flex gap-4 items-center">
                <h4 className="text-lg font-semibold">Tech Stack:</h4>
                <div className="flex flex-wrap items-center gap-3">
                  {selectedProject?.techStack.map((tech, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-full bg-muted px-4 py-1 text-sm font-medium"
                    >
                      <tech.icon className="h-5 w-5" />
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              {selectedProject?.features && (
                <section className="mt-6 flex-grow">
                  <h4 className="text-lg font-semibold mb-2">Features</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed text-foreground/90">
                    {selectedProject.features.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Challenges */}
              {selectedProject?.challenges && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2">Challenges</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed text-foreground/90">
                    {selectedProject.challenges.map((ch, i) => (
                      <li key={i}>{ch}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-center gap-4 flex-wrap">
              {selectedProject?.type === "dissertation" ? (
                <a
                  href={selectedProject?.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ActionButton text="Project Report" />
                </a>
              ) : (
                <a
                  href={selectedProject?.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ActionButton text="Live Demo" />
                </a>
              )}
              {selectedProject?.githubLink && (
                <a
                  href={selectedProject?.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ActionButton text="View Code" />
                </a>
              )}
            </div>
          </div>

          {/* RIGHT side: Images */}
          {selectedProject?.images && (
            <div className="flex flex-col gap-4 overflow-hidden">
              <h3 className="text-xl font-semibold">Project Screenshots</h3>
              <div className="mt-2 flex flex-col gap-5 overflow-y-auto max-h-[65vh]">
                {selectedProject.images.map((image, i) => (
                  <Image
                    key={i}
                    src={image}
                    alt={`Screenshot ${i + 1}`}
                    width={600}
                    height={400}
                    className="rounded-lg object-cover border"
                  />
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <ProjectDetails
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </div>
  );
};

export default ProjectsSection;
