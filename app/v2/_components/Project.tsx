"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Github, Layers } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import { useMediaQuery } from "@/lib/use-media-query";
import { Id } from "@/convex/_generated/dataModel";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Project = {
  _id: Id<"projects">;
  _creationTime: number;
  github_link?: string | undefined;
  title: {
    en: string;
    nl: string;
  };
  year: number;
  categories: {
    en: string[];
    nl: string[];
  };
  description: {
    en: string;
    nl: string;
  };
  tech_stack: string[];
  project_link: string;
  images: string[];
  mockup: string;
};

const ProjectCard = ({ project }: { project: Project }) => {
  const mockupProjectUrl = useQuery(api.images.getUrl, {
    storageId: project.mockup,
  });

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const imageUrls = useQuery(api.images.getUrls, {
    storageIds: project.images ?? [],
  });

  if (!mockupProjectUrl) return null;

  const Card = (
    <div className="group relative rounded-xl md:rounded-2xl overflow-hidden border cursor-pointer h-56 md:h-80 lg:h-105">
      {/* Image */}
      <Image
        src={mockupProjectUrl}
        alt=""
        fill
        className="object-cover transition-transform duration-500 scale-130"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent from-40% to-black/90" />

      {/* Top actions */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        {project.github_link && (
          <a
            href={project.github_link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-full bg-background/60 backdrop-blur border hover:bg-primary hover:text-black transition"
          >
            <Github size={16} />
          </a>
        )}

        <a
          href={project.project_link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-2 rounded-full bg-background/60 backdrop-blur border hover:bg-primary hover:text-black transition"
        >
          <ArrowUpRight size={16} />
        </a>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 z-20">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[10px] uppercase opacity-80 tracking-widest">
            <span>{project.year}</span>
            <div className="h-px w-6 bg-white/40" />
            <span>{project.categories.en.join(" / ")}</span>
          </div>

          <h3 className="text-lg md:text-3xl font-semibold uppercase leading-tight">
            {project.title.en}
          </h3>
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>{Card}</DialogTrigger>

        <DialogContent className="max-w-[95vw] w-full lg:max-w-6xl h-[90vh] bg-background p-0 rounded-3xl">
          <VisuallyHidden>
            <DialogTitle />
          </VisuallyHidden>
          <div className="grid md:grid-cols-3 h-full overflow-hidden">
            {/* LEFT: INFORMATION */}
            <div className="md:col-span-2 flex flex-col p-6 md:p-10 overflow-y-auto border-b md:border-b-0 md:border-r border-foreground/10">
              {/* HEADER */}
              <div>
                <h2 className="text-2xl md:text-4xl font-semibold tracking-tight uppercase">
                  {project.title.en}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest bg-primary text-background px-2 py-1 rounded">
                    {project.year}
                  </span>

                  {project.categories.en.map((cat) => (
                    <span
                      key={cat}
                      className="text-xs uppercase tracking-widest px-2 py-1 border border-foreground/20 rounded"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="mt-6 text-sm md:text-base leading-relaxed max-w-xl">
                {project.description.en}
              </p>

              {/* TECH STACK */}
              <div className="mt-8">
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-80">
                  <Layers size={14} /> Tech Stack
                </h4>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech_stack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-auto pt-8 flex gap-3">
                <a
                  href={project.project_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button className="w-full">
                    Live Site <ArrowUpRight size={16} />
                  </Button>
                </a>

                {project.github_link && (
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">
                      Code <Github size={16} />
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {/* RIGHT: IMAGE GALLERY */}
            <div className="md:col-span-1 overflow-y-auto p-4 md:p-6 space-y-5">
              {imageUrls?.map((url, i) => (
                <div
                  key={i}
                  className="relative aspect-video rounded-lg overflow-hidden border border-foreground/10 group"
                >
                  <Image
                    src={url ?? ""}
                    alt={`${project.title.en} preview ${i}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{Card}</DrawerTrigger>
      <DrawerContent className="h-[90vh] rounded-t-xl"></DrawerContent>
    </Drawer>
  );
};

export default ProjectCard;
