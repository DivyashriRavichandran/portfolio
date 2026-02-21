"use client";
import React from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Github,
  X,
  Layers,
  ExternalLink,
  SubtitlesIcon,
} from "lucide-react";
import data from "@/data/data.json";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import * as MdIcons from "react-icons/md";
import { RiDashboard3Fill } from "react-icons/ri";
import ProjectDialog from "./Project";

type MdIconName = keyof typeof MdIcons;

const ProjectSection = () => {
  const projects = data.projects;

  return (
    <section className="px-5 py-10 md:py-2 md:container md:mx-auto">
      <div className="mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-16 border-b border-foreground/10 pb-6">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
            Selected <span className="text-[#d0fe38]">Works.</span>
          </h2>
          <p className="text-[10px] uppercase font-medium tracking-[0.2em] opacity-40 text-right">
            {projects.length.toString().padStart(2, "0")} Projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => {
            const colorThemes = [
              { bg: "#d0fe38", text: "#2F3D00" }, // Primary (Lime)
              { bg: "#ffa447", text: "#2d1600" }, // Secondary (Orange/Amber)
              { bg: "#a977ff", text: "#1a0044" }, // Tertiary (Purple)
            ];
            const iconName = project.icon as MdIconName;
            const IconComponent = MdIcons[iconName] || RiDashboard3Fill;
            return (
              <Dialog key={project.id}>
                <DialogTrigger asChild>
                  <div className="group relative rounded-2xl md:rounded-4xl overflow-hidden border border-foreground/10 bg-[#0a0a0a] transition-all duration-300 cursor-pointer h-100 md:h-100">
                    {/* 1. MESH GRADIENT & TEXTURE LAYER */}
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                      {/* The Base Glow (Moves on hover) */}
                      <div
                        className="absolute -top-[20%] -right-[10%] w-[80%] h-[80%] rounded-full blur-[120px] opacity-20 group-hover:opacity-40 transition-all duration-500 ease-in-out"
                        style={{
                          backgroundColor:
                            colorThemes[index % colorThemes.length].bg,
                        }}
                      />

                      {/* The Bottom Gradient (Unity) */}
                      <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent z-10" />

                      {/* Grainy Noise Overlay */}
                      <div
                        className="absolute inset-0 opacity-[0.05] mix-blend-overlay z-20"
                        style={{
                          backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
                        }}
                      />

                      {/* MASSIVE BACKGROUND ICON (Now the only icon) */}
                      <div className="absolute -left-10 -bottom-20 opacity-[0.05] group-hover:opacity-[0.12] group-hover:-rotate-12 group-hover:scale-110 transition-all duration-500 ease-out z-0">
                        <IconComponent size={480} />
                      </div>
                    </div>

                    {/* 2. TOP ACTIONS (Restored and color-synced) */}
                    <div className="absolute top-8 right-8 flex gap-3 z-30">
                      {project.github_link && (
                        <a
                          href={project.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 rounded-full bg-background/50 backdrop-blur-xl border border-foreground/10 hover:bg-[var(--project-color)] hover:text-black transition-all duration-300 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                        >
                          <Github size={18} />
                        </a>
                      )}
                      <a
                        href={project.project_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 rounded-full bg-background/50 backdrop-blur-xl border border-foreground/10 hover:bg-[var(--project-color)] hover:text-black transition-all duration-300 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    </div>

                    {/* 3. HOVER BADGE (Left Top) */}
                    <div className="absolute top-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 z-30">
                      <span
                        className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-black"
                        style={{
                          backgroundColor:
                            colorThemes[index % colorThemes.length].bg,
                        }}
                      >
                        View Project
                      </span>
                    </div>

                    {/* 4. BOTTOM INFO (Clean Typography) */}
                    <div className="absolute bottom-0 left-0 w-full p-10 z-30">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-60">
                            {project.year}
                          </span>
                          <div className="h-[1px] w-8 bg-foreground/40" />
                          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-60">
                            {project.categories.join(" / ")}
                          </span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-semibold uppercase leading-none">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                {/* --- DIALOG CONTENT --- */}
                <DialogContent className="max-w-[95vw] w-full lg:max-w-6xl h-[90vh] bg-background border-foreground/10 p-0 overflow-hidden rounded-[2.5rem] outline-none">
                  <ProjectDialog project={project} />
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
