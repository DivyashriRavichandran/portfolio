"use client";
import React, { useState } from "react";
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
import Heading from "../Heading";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProjectItem } from "@/models/ProjectItem";
import ActionButton from "../ActionButton";
import { Button } from "../ui/button";
import Report_image1 from "@/assets/images/report-images/1.png";
import Report_image2 from "@/assets/images/report-images/2.png";
import Report_image3 from "@/assets/images/report-images/3.png";
import Report_image4 from "@/assets/images/report-images/4.png";
import Report_image5 from "@/assets/images/report-images/5.png";
import Report_image6 from "@/assets/images/report-images/6.png";

import Image from "next/image";
import AutoSlideshow from "../animations/AutoSlideshow";

export const Projects: ProjectItem[] = [
  {
    title: "CineDB",
    description:
      "CINEDB is a movie/tv-show database app leveraging TMDB API, with search, filters, and detailed movie pages including trailers and ratings.",
    techStack: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
    video: "/cv-builder-video.mp4",
    githubLink: "https://github.com/DivyashriRavichandran/cine-db",
    websiteLink: "https://cinedb-web.vercel.app",
  },
  {
    title: "CV Builder",
    description:
      "CV Builder is a user-friendly web app to create and customize CVs using pre-designed templates and download it as a pdf.",
    techStack: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Framer", icon: SiFramer },
    ],
    video: "/cv-builder-video.mp4",
    githubLink: "https://github.com/DivyashriRavichandran/cv-builder",
    websiteLink: "https://cv-builder-online.vercel.app",
  },
  {
    title: "Paygez",
    description:
      "Paygez is a social media e-commerce platform where users can shop, sell and promote products. Developed at KP Platforms.",
    techStack: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Framer", icon: SiFramer },
      { name: "Firebase", icon: SiFirebase },
      { name: "Zustand", icon: GiBearFace },
    ],
    video: "/paygez-video.mp4",
    websiteLink: "https://paygez.com",
  },
  {
    title: "Dissertation",
    description:
      "Developed a DCGAN-based deep learning pipeline to augment lung cancer image data and improve classification accuracy.",
    techStack: [
      { name: "Keras", icon: SiKeras },
      { name: "TensorFlow", icon: SiTensorflow },
      { name: "PyTest", icon: SiPytest },
    ],
    images: [
      Report_image1,
      Report_image2,
      Report_image3,
      Report_image4,
      Report_image5,
      Report_image6,
    ],
    githubLink:
      "https://github.com/DivyashriRavichandran/Lung-Cancer-Classifier",
    websiteLink:
      "https://www.linkedin.com/in/divyashri-ravichandran/overlay/1726242566093/single-media-viewer/?profileId=ACoAADnahAABN7xSWUAT0reDfOdlR9AYpx4hBkk",
  },
];

const ProjectsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative md:container md:mx-auto px-4 my-10 md:my-20">
      <Heading title={"Latest Works"} subtitle={"Featured Projects"} />

      {/* PROJECTS - MOBILE */}
      <div className="mt-6 md:hidden space-y-8">
        {Projects.map((project, index) => (
          <motion.div
            key={index}
            className="relative rounded-2xl border bg-muted backdrop-blur-sm shadow-sm p-4 overflow-clip"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
          >
            {/* GRADIENT */}
            <div className="-z-20 inset-0 absolute from-0% to-50% bg-gradient-to-br from-primary/30 to-secondary/30" />
            <div className="-z-10 inset-0 absolute from-0% to-50% bg-gradient-to-b from-transparent to-muted" />

            {/* VIDEO */}
            <div className="overflow-hidden border">
              <video
                src={project.video}
                loop
                playsInline
                webkit-playsinline="true"
                autoPlay
                muted
                className="w-full h-auto object-cover"
              />
              {project.images && (
                <Image
                  src={project.images[0]}
                  alt=""
                  className="w-full h-auto object-cover"
                />
              )}
            </div>

            <div className="mt-6 flex items-center justify-between">
              {/* TITLE */}
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-muted-foreground font-mono">
                  0{index + 1}
                </span>
                <h1 className="text-4xl font-semibold tracking-tighter">
                  {project.title}
                </h1>
              </div>

              {/* TECH STACK ICONS */}
              <div className="flex flex-wrap justify-center gap-1">
                {project.techStack.map((tech, i) => (
                  <TooltipProvider key={i}>
                    <Tooltip>
                      <TooltipTrigger className="rounded-full p-2 bg-muted shadow-sm">
                        <tech.icon className="size-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{tech.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex gap-3 justify-center">
              <ActionButton text="Visit Website" />
              <ActionButton text="GitHub Repo" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* PROJECT - DESKTOP */}
      <div className="mt-20 border-t hidden md:block">
        {Projects.map((project, index) => (
          <motion.div
            key={index}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="relative group border-b overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div layout="position" className="flex flex-col">
              {/* TITLE + TECH STACK */}
              <motion.div
                layout="position"
                className="flex items-baseline gap-2 text-muted-foreground/40 group-hover:text-foreground"
              >
                <div className="text-xl italic">0{index + 1}</div>
                <h1 className="overflow-hidden text-5xl md:text-8xl tracking-tighter font-light leading-tight">
                  {project.title}
                </h1>

                {/* TECH STACK ICONS */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      key="icons"
                      className="z-20 ml-4 flex gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        // icons appear after title shift
                        delay: 0.15,
                      }}
                    >
                      {project.techStack.map((tech, i) => (
                        <TooltipProvider key={i}>
                          <Tooltip>
                            <TooltipTrigger className="rounded-full p-1.5 bg-card">
                              <tech.icon className="size-5" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{tech.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* INFO + BUTTONS BLOCK */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    key="info"
                    layout="position"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                    className="overflow-hidden pl-13 mt-2"
                  >
                    <p className="text-muted-foreground max-w-1/2">
                      {project.description}
                    </p>
                    <div className="mt-6 flex gap-4 mb-6">
                      {project.websiteLink && (
                        <Link
                          href={project.websiteLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button>
                            {project.title == "Dissertation"
                              ? "View Report"
                              : "Visit Website"}
                          </Button>
                        </Link>
                      )}
                      {project.githubLink && (
                        <Link
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline">View Code</Button>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* VIDEO */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    key="video"
                    className="group/video absolute right-0 top-4 bottom-4 aspect-video"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    {project.video && (
                      <video
                        src={project.video}
                        loop
                        autoPlay
                        muted
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}

                    {project.images && (
                      <AutoSlideshow
                        images={project.images}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* GRADIENTS */}
      <div className="-z-20 absolute left-0 md:-left-20 top-0 md:top-20 rounded-full size-20 md:size-40 bg-gradient-to-br from-primary to-secondary blur-[100px] md:blur-[150px]"></div>
      <div className="-z-20 absolute right-0 top-1/4 md:top-1/2 rounded-full size-20 md:size-60 bg-gradient-to-br from-primary to-secondary blur-[80px] md:blur-[200px]"></div>
    </div>
  );
};

export default ProjectsSection;
