"use client";
import React from "react";
import Heading from "./Heading";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import ProjectCard from "./Project";

const ProjectSection = () => {
  const projects = useQuery(api.projects.list);

  if (!projects) return null;

  return (
    <section className="px-4 md:px-6 lg:container lg:mx-auto py-10 md:py-16">
      <Heading text1="Selected" text2="Works" total={projects.length} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
