"use client";
import React from "react";
import { GithubIcon, GlobeIcon } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProjectProps {
  project: {
    id: number;
    title: string;
    description: string;
    year: number;
    categories: string[];
    tech_stack: string[];
    github_link?: string;
    project_link: string;
    images: string[];
  };
  index: number;
}

// Fixed Color Palette for better legibility
const colorThemes = [
  { bg: "#d0fe38", text: "#2F3D00", border: "#2F3D00" }, // Primary (Lime)
  { bg: "#ffa447", text: "#2d1600", border: "#4e2900" }, // Secondary (Orange/Amber)
  { bg: "#a977ff", text: "#1a0044", border: "#2d0074" }, // Tertiary (Purple)
];

const Project = ({ project, index }: ProjectProps) => {
  const theme = colorThemes[index % colorThemes.length];

  return (
    <section
      style={{ backgroundColor: theme.bg }}
      className="h-svh w-full border-t border-black/10 flex flex-col overflow-hidden rounded-4xl"
    >
      <div
        style={{ color: theme.text }}
        className="h-full mx-auto p-6 md:p-20 flex flex-col w-full max-w-7xl"
      >
        {/* TOP: Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest opacity-70">
              {project.year} / {project.categories.join(", ")}
            </span>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-none">
              {project.title}
            </h1>
          </div>

          <div className="flex gap-3">
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                style={{ borderColor: theme.border }}
                className="size-12 flex justify-center items-center border rounded-full hover:opacity-70 transition-all"
              >
                <GithubIcon size={22} />
              </a>
            )}
            <a
              href={project.project_link}
              target="_blank"
              style={{ backgroundColor: theme.text, color: theme.bg }}
              className="size-12 flex justify-center items-center rounded-full hover:scale-105 transition-all"
            >
              <GlobeIcon size={22} />
            </a>
          </div>
        </div>

        {/* MIDDLE: Carousel */}
        <div className="flex-1 flex items-center justify-center my-6 md:my-10 w-full relative group">
          <Carousel className="w-full">
            <CarouselContent>
              {project.images.map((img, i) => (
                <CarouselItem key={i} className="basis-full md:basis-1/2">
                  <div className="relative h-[40vh] md:max-h-[50vh] w-full rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={img}
                      fill
                      className="object-cover"
                      alt={`${project.title} screenshot ${i + 1}`}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
              <CarouselPrevious
                style={{ borderColor: theme.border }}
                className="bg-transparent -left-12"
              />
              <CarouselNext
                style={{ borderColor: theme.border }}
                className="bg-transparent -right-12"
              />
            </div>
          </Carousel>
        </div>

        {/* BOTTOM: Footer */}
        <div className="mt-auto flex flex-col gap-8">
          <p className="text-lg md:text-2xl">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                style={{
                  borderColor: `${theme.text}40`,
                  backgroundColor: `${theme.text}10`,
                }}
                className="text-[10px] md:text-xs font-bold uppercase border px-4 py-1.5 rounded-full backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;
