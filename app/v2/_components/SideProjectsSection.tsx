"use client";
import React from "react";
import Image from "next/image";
import data from "@/data/data.json";
import Heading from "./Heading";
import { Badge } from "@/components/ui/badge";

const SideProjectsSection = () => {
  const projects = data["side-projects"];

  return (
    <section className="px-5 py-10 md:py-16 md:container md:mx-auto">
      {/* Header */}
      <Heading text1={"Side"} text2={"Projects"} total={projects.length} />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {projects.map((project) => {
          return (
            <div
              key={project.id}
              className="group relative rounded-md overflow-hidden border transition-all duration-300 hover:border-primary"
            >
              {/* IMAGE */}
              <div className="relative h-40 md:h-60 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-top object-cover"
                />

                {/* overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                {/* 3. HOVER BADGE */}
                <div className="absolute top-3 left-3 md:opacity-0 group-hover:opacity-100 transition-all duration-300 md:-translate-x-2 group-hover:translate-x-0 z-30">
                  <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-black bg-primary">
                    View Code
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="relative z-10 p-3 md:p-5 flex flex-col gap-2 md:gap-4">
                {/* Title */}
                <h3 className="md:text-lg font-semibold leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Tech */}
                <div className="mt-2 md:mt-0 flex flex-wrap gap-2">
                  {project.tech_stack.map((tech, i) => (
                    <Badge key={i}>{tech}</Badge>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SideProjectsSection;
