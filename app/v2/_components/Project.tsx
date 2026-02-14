"use client";

import React, { useState } from "react";
import data from "@/data/data.json";
import {
  ArrowDownLeftIcon,
  CheckCircle2Icon,
  GithubIcon,
  GlobeIcon,
  LightbulbIcon,
  ShieldAlertIcon,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Project = () => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const project = data.projects[0];

  return (
    <section className="bg-primary ">
      <div className="h-svh  mx-auto text-[#2F3D00] p-5 md:p-10 flex flex-col justify-between">
        {/* HEADER */}
        <div>
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <Image
                src={project.logo}
                alt={project.title.en}
                width={100}
                height={100}
                className="size-12 md:size-16 border-[#2F3D00] border rounded-full"
              />
              <h1 className="text-2xl md:text-6xl font-semibold">
                {project.title.en}
              </h1>
            </div>

            <span className="text-sm md:text-xl font-medium">
              {project.year}
            </span>
          </div>

          <article className="mt-3 md:mt-6 flex flex-col gap-4 md:gap-6">
            <p className="text-sm md:text-xl">{project.description}</p>
            <div className="flex gap-2">
              {project.categories.map((category, index) => (
                <span
                  key={index}
                  className="text-xs md:text-base border border-[#2F3D00]/30 bg-[#2F3D00]/5 px-2 py-1 md:px-4 md:py-1.5 rounded-full backdrop-blur-md hover:bg-[#2F3D00] hover:text-primary transition-colors cursor-default"
                >
                  {category}
                </span>
              ))}
            </div>
          </article>
        </div>

        {/* PROJECT IMAGES CAROUSEL */}
        {project.images && project.images.length > 0 && (
          <Carousel>
            <CarouselContent className="mt-6">
              {project.images.map((image, index) => (
                <CarouselItem key={index} className="basis-1/2">
                  <Image
                    key={index}
                    src={image}
                    alt={`Project screenshot ${index}`}
                    width={800}
                    height={600}
                    className="max-h-80"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-black" />
            <CarouselNext className="text-black" />
          </Carousel>
        )}

        {/* BOTTOM */}
        <div className="mt-6 border-t border-[#2F3D00]/20">
          {/* TECH STACK SECTION */}
          <section className="mt-4 md:mt-0 flex flex-col md:flex-row md:items-center gap-3 h-20 border-b border-[#2F3D00]/20">
            <span className="text-sm md:text-base font-bold uppercase tracking-wider w-full">
              Built with
            </span>
            <div className="flex gap-2">
              {project.tech_stack.map((tech, index) => (
                <div
                  key={index}
                  className="text-xs md:text-base border border-[#2F3D00]/30 bg-[#2F3D00]/5 px-2 py-1 md:px-4 md:py-1.5 rounded-full backdrop-blur-md hover:bg-[#2F3D00] hover:text-primary transition-colors cursor-default"
                >
                  {tech}
                </div>
              ))}
            </div>
          </section>

          {/* LINKS SECTION */}
          <section className="mt-4 md:mt-0 border-b border-[#2F3D00]/20 flex flex-col md:flex-row md:items-center gap-3 h-20">
            <h2 className="text-sm md:text-base font-bold uppercase tracking-wider whitespace-nowrap w-full">
              Explore the Project
            </h2>
            <div className="flex items-center gap-4">
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit flex items-center gap-2 px-3 md:px-6 py-2 md:py-3 border border-[#2F3D00] rounded-full text-[#2F3D00] bg-transparent hover:bg-[#2F3D00] hover:text-primary transition-all text-sm md:text-base font-medium whitespace-nowrap"
                >
                  <GithubIcon className="size-4 md:size-5" />
                  <span>GitHub</span>
                </a>
              )}

              {project.project_link && (
                <a
                  href={project.project_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit flex items-center gap-2 px-3 md:px-6 py-2 md:py-3 bg-[#2F3D00] text-primary rounded-full hover:bg-opacity-90 transition-all text-sm md:text-base font-medium whitespace-nowrap"
                >
                  <GlobeIcon className="size-4 md:size-5" />
                  <span>Live Site</span>
                </a>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Project;
