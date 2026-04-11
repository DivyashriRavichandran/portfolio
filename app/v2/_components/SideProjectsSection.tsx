"use client";
import React from "react";
import Image from "next/image";
import data from "@/data/data.json";
import Heading from "./Heading";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const SideProjectsSection = () => {
  const projects = data["side-projects"];

  return (
    <section className="pb-10">
      <Heading text1={"Side"} text2={"Projects"} total={projects.length} />

      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group flex items-center rounded border bg-muted/30 hover:border-primary transition-all duration-300"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={100}
              height={100}
              className="w-30 md:w-40 h-full object-cover rounded-l"
            />

            {/* CONTENT */}
            <div className="flex-1 p-3 md:p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm md:text-base font-semibold">
                  {project.title}
                </h3>
                <div className="flex gap-3 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink
                    size={14}
                    className="text-muted-foreground hover:text-primary cursor-pointer md:size-5"
                  />
                </div>
              </div>

              <p className="mt-1 md:mt-2 text-[10px] md:text-sm text-muted-foreground line-clamp-4 leading-relaxed">
                {project.description}
              </p>

              {/* Minimalist Tech Stack */}
              <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
                {project.tech_stack.slice(0, 3).map((tech, i) => (
                  <Badge key={i} size={"sm"}>
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SideProjectsSection;
