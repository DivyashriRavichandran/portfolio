"use client";
import React from "react";
import Image from "next/image";
import data from "@/data/data.json";

const SideProjectsSection = () => {
  const projects = data["side-projects"];

  return (
    <section className="px-5 py-16 md:container md:mx-auto">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-16 border-b border-foreground/10 pb-6">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
            Side <span className="text-primary">Projects.</span>
          </h2>
          <p className="text-[10px] uppercase font-medium tracking-[0.2em] opacity-40 text-right">
            {projects.length.toString().padStart(2, "0")} Projects
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const colors = ["#d0fe38", "#ffa447", "#a977ff"];
            const color = colors[index % colors.length];

            return (
              <div
                key={project.id}
                className="group relative rounded-2xl overflow-hidden border border-foreground/10 bg-[#0a0a0a] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]"
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
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 z-30">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-black"
                      style={{ backgroundColor: color }}
                    >
                      View Code
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="relative z-10 p-5 flex flex-col gap-4">
                  {/* Title */}
                  <h3 className="text-lg font-semibold leading-snug">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm opacity-60 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-1 border border-foreground/10 rounded-full uppercase tracking-wider opacity-60"
                      >
                        {tech}
                      </span>
                    ))}
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

export default SideProjectsSection;
