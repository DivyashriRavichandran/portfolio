import React, { useState } from "react";
import ScrollAnimation from "../custom/ScrollAnimation";
import {
  SiFirebase,
  SiFramer,
  SiKeras,
  SiNextdotjs,
  SiPytest,
  SiTailwindcss,
  SiTensorflow,
} from "react-icons/si";
import { GiBearFace } from "react-icons/gi";
import { IconType } from "react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image, { StaticImageData } from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import ActionButton from "../ActionButton";
import Heading from "../Heading";
import ProjectDetails from "../ProjectDetails";
import P1_image1 from "@/assets/images/cinedb-1.png";
import P1_image2 from "@/assets/images/cinedb-2.png";
import P1_image3 from "@/assets/images/cinedb-3.png";
import P2_image1 from "@/assets/images/paygez-1.png";
import P2_image2 from "@/assets/images/paygez-2.png";
import P2_image3 from "@/assets/images/paygez-3.png";
import P2_image4 from "@/assets/images/paygez-4.png";
import P3_image1 from "@/assets/images/cv-builder-1.png";
import P3_image2 from "@/assets/images/cv-builder-2.png";
import P3_image3 from "@/assets/images/cv-builder-3.png";
import P3_image4 from "@/assets/images/cv-builder-4.png";
import P4_image1 from "@/assets/images/report-4.png";
import P4_image2 from "@/assets/images/report-2.png";
import P4_image3 from "@/assets/images/report-3.png";
import ArrowAnimation from "../custom/ArrowAnimation";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue } from "framer-motion";
import { useRouter } from "next/navigation";

type ProjectProps = {
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
  githubLink?: string;
  websiteLink?: string;
};

const ProjectsSection = () => {
  const router = useRouter();
  const Projects: ProjectProps[] = [
    {
      title: "CineDB",
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
      techStack: [
        { name: "Next.js", icon: SiNextdotjs },
        { name: "Tailwind CSS", icon: SiTailwindcss },
      ],
      images: [P1_image1, P1_image2, P1_image3],
      githubLink: "https://github.com/DivyashriRavichandran/cine-db",
      websiteLink: "https://cinedb-web.vercel.app",
    },
    {
      title: "CV Builder",
      type: "Frontend",
      year: "2025",
      description: "A web application for building CVs from templates.",
      detailedDescription:
        "CV Builder is a user-friendly web app that allows users to create and customize their CVs using pre-designed templates.",
      features: [
        "Template selection and customization",
        "Export CV as PDF",
        "User authentication and profiles",
      ],
      techStack: [
        { name: "Next.js", icon: SiNextdotjs },
        { name: "Tailwind CSS", icon: SiTailwindcss },
        { name: "Framer Motion", icon: SiFramer },
      ],
      images: [P3_image1, P3_image2, P3_image3, P3_image4],
      githubLink: "https://github.com/DivyashriRavichandran/cv-builder",
      websiteLink: "https://cv-builder-online.vercel.app",
    },
    {
      title: "Paygez",
      type: "Frontend",
      year: "2025",
      description: "Social media e-commerce platform developed at KP Platforms",
      detailedDescription:
        "Paygez combines social media features with e-commerce capabilities to offer users an engaging shopping experience.",
      features: [
        "User profiles and social feeds",
        "Integrated shopping cart and payments",
        "Real-time notifications",
      ],
      techStack: [
        { name: "Next.js", icon: SiNextdotjs },
        { name: "Tailwind CSS", icon: SiTailwindcss },
        { name: "Framer Motion", icon: SiFramer },
        { name: "Firebase", icon: SiFirebase },
        { name: "Zustand", icon: GiBearFace },
      ],
      images: [P2_image4, P2_image1, P2_image2, P2_image3],
      websiteLink: "https://paygez.com",
    },
    {
      title: "Dissertation",
      type: "dissertation",
      year: "2024",
      description:
        "Lung Cancer Detection using DCGAN Model, A deep learning model for data augmentation and classification of lung cancer images.",
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
      images: [P4_image1, P4_image2, P4_image3],
      githubLink:
        "https://github.com/DivyashriRavichandran/Lung-Cancer-Classifier",
      websiteLink:
        "https://www.linkedin.com/in/divyashri-ravichandran/overlay/1726242566093/single-media-viewer/?profileId=ACoAADnahAABN7xSWUAT0reDfOdlR9AYpx4hBkk",
    },
  ];
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(
    null
  );
  const [hoverKey, setHoverKey] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Motion values for cursor-following effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };
  return (
    <div className="relative container mx-auto px-4 mt-10 md:mt-20">
      <Heading title={"Latest Works"} subtitle={"Featured Projects"} />

      {/* PROJECTS */}
      <div className="md:hidden mt-6 md:mt-12 grid gap-8 lg:grid-cols-2">
        {Projects.map((project, index) => (
          <ScrollAnimation
            key={index}
            delay={0.2 * index}
            direction={index % 2 === 0 ? "left" : "right"}
          >
            <div
              onClick={() => setSelectedProject(project)}
              className="flex flex-col lg:justify-between lg:h-full relative cursor-pointer group overflow-hidden rounded-xl border bg-background/60 px-5 py-6 md:p-8 shadow-md hover:scale-105 transition duration-200"
              onMouseEnter={() => setHoverKey((prev) => prev + 1)}
              onMouseLeave={() => setHoverKey((prev) => prev - 1)}
            >
              {/* GLOW GRADIENT */}
              <div className="-z-10 absolute -top-1/3 -right-1/3 h-2/3 w-2/3 rounded-full bg-gradient-to-br from-primary to-secondary opacity-10 md:opacity-0 blur-3xl md:blur-[120px] transition duration-500 group-hover:opacity-80 group-hover:scale-125" />

              {/* ANIMATION */}
              <div className="absolute top-2 right-3 group-hover:opacity-100 opacity-100 lg:opacity-0 transition-opacity">
                <ArrowAnimation key={hoverKey} />
              </div>

              {/* LEFT CONTENT */}
              <>
                <h3 className="w-4/5 md:w-full text-xl md:text-2xl leading-6 md:leading-8 tracking-tight font-bold md:text-center lg:text-start">
                  {project.title}
                </h3>
                <div className="lg:w-1/2 flex flex-col justify-between h-full">
                  <div>
                    <p className="mt-2 text-sm text-muted-foreground mr-2 md:text-center lg:text-start">
                      {project.description}
                    </p>

                    {/* TECH STACK ICONS */}
                    <div className="mt-3 flex flex-wrap gap-x-2 justify-center lg:justify-start">
                      {project.techStack.map((tech, index) => (
                        <span key={index}>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="rounded-full bg-card p-1.5">
                                <tech.icon className="size-4" />
                              </TooltipTrigger>
                              <TooltipContent>{tech.name}</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="mt-3 lg:mt-6 flex flex-wrap gap-2 md:gap-4 justify-center lg:justify-start">
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
              </>

              {/* IMAGES */}
              <div
                className="mt-4 lg:mt-0 lg:absolute lg:-bottom-4 lg:-right-4 h-48 md:h-80 lg:h-48 w-full lg:w-1/2 overflow-hidden group-hover:bottom-0 group-hover:right-0 transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <Carousel>
                  <CarouselContent>
                    {project?.images?.map((image, index) => (
                      <CarouselItem key={index}>
                        <Image
                          src={image}
                          alt=""
                          width={1000}
                          height={1000}
                          className="h-48 md:h-full lg:h-48 w-full object-cover object-top rounded-tr-xl lg:rounded-tr-none border-r border-b rounded-tl-xl lg:border-r-0 lg:border-b-0 border-l border-t"
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
          </ScrollAnimation>
        ))}
      </div>

      {/* PROJECT NEW */}
      <div
        className="mt-6 md:mt-20 flex flex-col space-y-4"
        onMouseMove={handleMouseMove}
      >
        {Projects.map((project, index) => (
          <motion.div
            key={index}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="cursor-pointer group py-4 flex items-end gap-2"
            onClick={() =>
              router.push(`/projects/${project.title.toLowerCase()}`)
            }
          >
            {/* Title */}
            <motion.h1 className="text-7xl text-muted-foreground/50 group-hover:text-foreground tracking-tight overflow-hidden whitespace-nowrap">
              <span className="inline-block">{project.title}</span>
            </motion.h1>

            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <ArrowUpRight className="size-12" />
              </motion.div>
            )}
            {/* Image that appears on hover */}
            {hoveredIndex === index && (
              <motion.div
                className="absolute bottom-0 right-0 z-10"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
              >
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  width={1000}
                  height={1000}
                  className="w-[450px] h-60 object-cover rounded-2xl"
                />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* GRADIENTS */}
      <div className="-z-20 absolute -left-20 top-20 rounded-full size-40 bg-gradient-to-br from-primary to-secondary blur-[150px]"></div>
      <div className="-z-20 absolute right-0 top-1/2 rounded-full size-60 bg-gradient-to-br from-primary to-secondary  blur-[200px]"></div>

      {/* DIALOG FOR PROJECT DETAILS */}
      <ProjectDetails
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </div>
  );
};

export default ProjectsSection;
