"use client";
import React from "react";
import H1 from "../../../components/headings/H1";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const ProjectSection = () => {
  const t = useTranslations();
  const projects = useQuery(api.projects.list);

  return (
    <section className="py-10 md:py-10">
      <H1
        text1={t("selected")}
        text2={t("works")}
        total={projects ? projects.length : 0}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-4 md:gap-y-6">
        {!projects
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-4/3 w-full rounded" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))
          : projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                mockupUrl={project.mockupUrl ?? ""}
              />
            ))}
      </div>
    </section>
  );
};

const ProjectCard = ({
  project,
  mockupUrl,
}: {
  project: Doc<"projects">;
  mockupUrl?: string;
}) => {
  const locale = useLocale() as "en" | "nl";

  return (
    <Link href={`/v2/project/${project.slug}`} className="group block h-full">
      <div className="border flex flex-col h-full rounded bg-muted/30 overflow-hidden transition-all duration-300 group-hover:border-primary">
        {/* IMAGE CONTAINER */}
        <div className="relative z-0 aspect-5/3 overflow-hidden bg-muted/10">
          {mockupUrl ? (
            <Image
              src={mockupUrl}
              alt={project.title[locale]}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-102"
            />
          ) : (
            <div className="w-full h-full" />
          )}

          {/* MOBILE ONLY */}
          {/* <div className="absolute top-2 right-2 flex items-center gap-1 md:hidden backdrop-blur-sm px-1 rounded">
            <span className="text-[10px] font-semibold uppercase tracking-widest">
              View
            </span>
            <ArrowUpRight size={14} />
          </div> */}

          {/* DESKTOP ONLY */}
          <div className="flex absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center backdrop-blur-[2px]">
            <div className="size-12 rounded-full bg-primary text-background flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_20px_rgba(var(--primary),0.3)]">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
          <div className="flex-1 md:space-y-1">
            {/* TITLE ROW  */}
            <div className="flex items-start justify-between gap-x-2">
              <h3 className="text-lg md:text-xl font-semibold group-hover:underline underline-offset-2 transition-all leading-tight">
                {project.title[locale]}
              </h3>

              {/* MOBILE ONLY ICON */}
              <ArrowUpRight
                size={20}
                className="md:hidden text-muted-foreground shrink-0 mt-0.5"
              />
            </div>

            <p className="text-muted-foreground text-[10px] md:text-xs uppercase tracking-wider font-medium line-clamp-1">
              {project.categories[locale].join(" • ")}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-x-2 gap-y-1 mt-auto">
            {project.tech_stack.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="text-[10px] md:text-xs font-medium lowercase text-muted-foreground/70"
              >
                #{tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectSection;
