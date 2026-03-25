"use client";
import React from "react";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import data from "@/data/data.json";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ProjectDialog from "./Project";
import Heading from "./Heading";

const ProjectSection = () => {
  const projects = data.projects;

  return (
    <section className="px-5 py-10 md:py-16 md:container md:mx-auto">
      <div className="mx-auto">
        {/* Section Header */}
        <Heading text1={"Selected"} text2={"Works"} total={projects.length} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => {
            return (
              <Dialog key={project.id}>
                <DialogTrigger asChild>
                  <div className="group relative rounded-2xl overflow-hidden border border-foreground/20 cursor-pointer h-100">
                    {/* BACKGROUND IMAGE */}
                    <Image
                      src={project.mockup}
                      alt=""
                      width={500}
                      height={500}
                      className="absolute inset-0 h-full w-full object-cover scale-130"
                    />

                    <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-b from-transparent from-40% to-black" />

                    {/* TOP ACTIONS */}
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

                    {/* 3. HOVER BADGE */}
                    <div className="absolute top-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 z-30">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-black bg-primary">
                        View Project
                      </span>
                    </div>

                    {/* 4. BOTTOM INFO */}
                    <div className="absolute bottom-0 left-0 w-full p-10 z-30">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-80">
                            {project.year}
                          </span>
                          <div className="h-[1px] w-8 bg-foreground/40" />
                          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-80">
                            {project.categories.join(" / ")}
                          </span>
                        </div>
                        <h3 className="text-4xl font-semibold uppercase leading-none">
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
