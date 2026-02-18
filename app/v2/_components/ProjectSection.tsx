"use client";
import React from "react";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import data from "@/data/data.json";

const ProjectSection = () => {
  const projects = data.projects;

  return (
    <section className="px-5 md:px-16 py-10 md:py-20">
      <div className="mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-foreground/10 pb-6">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
            Selected <span className="text-[#d0fe38]">Works.</span>
          </h2>
          <p className="text-[10px] uppercase font-medium tracking-[0.2em] opacity-40 text-right">
            08 Projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8">
          {projects.map((project, index) => {
            // Logic to make specific cards span more columns for the "Bento" look
            const isWide = index == 20;
            return (
              <div
                key={project.id}
                className={`group relative rounded-3xl overflow-hidden border border-foreground/5 hover:border-[#d0fe38]/50 transition-all duration-500
                ${isWide ? "md:col-span-6" : "md:col-span-3"}
             `}
              >
                {/* Image Container */}
                <div className="relative w-full h-[300px] md:h-full min-h-[400px] overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-background to-transparent opacity-80 transition-opacity" />

                  {/* Top Actions */}
                  <div className="absolute top-6 right-6 flex gap-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        className="p-3 rounded-full bg-background/80 backdrop-blur-md hover:bg-[#d0fe38] hover:text-black transition-colors"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    <a
                      href={project.project_link}
                      className="p-3 rounded-full bg-background/80 backdrop-blur-md hover:bg-[#d0fe38] hover:text-black transition-colors"
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 w-full p-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-medium uppercase tracking-widest text-primary">
                        {project.year} {"// "}
                        {project.categories
                          .map((cat) => cat.toUpperCase())
                          .join(", ")}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-semibold ">
                        {project.title}
                      </h3>
                    </div>

                    {/* Expandable Tech Stack on Hover */}
                    <div className="flex flex-wrap gap-2 mt-4 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                      {project.tech_stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-foreground/20 rounded-full border border-foreground/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
