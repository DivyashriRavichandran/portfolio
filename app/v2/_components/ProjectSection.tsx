"use client";
import React from "react";
import Heading from "./Heading";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { ConvexImage } from "@/components/helper/ConvexImage";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

const ProjectSection = () => {
  const t = useTranslations();
  const projects = useQuery(api.projects.list);

  return (
    <section className="px-4 md:px-6 lg:container lg:mx-auto py-10 md:py-16">
      <Heading
        text1={t("selected")}
        text2={t("works")}
        total={projects ? projects.length : 0}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6">
        {!projects
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-video w-full" />
            ))
          : projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
      </div>
    </section>
  );
};

export default ProjectSection;

const ProjectCard = ({ project }: { project: Doc<"projects"> }) => {
  const t = useTranslations();

  return (
    <Link href={`/v2/project/${project._id}`}>
      <div className="group relative rounded-md overflow-hidden border transition-all duration-300 hover:border-primary cursor-pointer h-80 md:h-80 lg:h-100">
        {project.mockup ? (
          <ConvexImage
            storageId={project.mockup}
            className="scale-125 md:scale-125"
          />
        ) : (
          <Skeleton className="w-full h-full" />
        )}

        <div className="absolute inset-0 bg-linear-to-b from-transparent from-40% to-black/90" />

        <div className="absolute top-3 left-3 md:opacity-0 group-hover:opacity-100 transition-all duration-300 md:-translate-x-2 group-hover:translate-x-0 z-30">
          <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-black bg-primary">
            {t("view-details")}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 z-20">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-semibold uppercase text-muted-foreground tracking-widest">
              <span>{project.year}</span>
              <div className="h-px w-6 bg-white/40" />
              <span>{project.categories.en.join(" / ")}</span>
            </div>
            <h3 className="text-lg md:text-4xl font-semibold uppercase leading-tight">
              {project.title.en}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
};
