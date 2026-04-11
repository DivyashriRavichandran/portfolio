"use client";
import React from "react";
import Heading from "./Heading";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ProjectSection = () => {
  const t = useTranslations();
  const projects = useQuery(api.projects.list);

  return (
    <section className="px-5 md:px-0 max-w-4xl mx-auto py-10 md:py-24">
      <Heading
        text1={t("selected")}
        text2={t("works")}
        total={projects ? projects.length : 0}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {!projects
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-4/3 w-full rounded-xl" />
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
  const t = useTranslations();
  const locale = useLocale() as "en" | "nl";

  return (
    <Link href={`/v2/project/${project._id}`} className="group block">
      <div className="border border-muted-foreground/20 rounded bg-muted/30 overflow-hidden transition-all duration-300 group-hover:border-primary">
        {/* IMAGE CONTAINER */}
        <div className="relative aspect-4/3 overflow-hidden">
          {mockupUrl ? (
            <Image
              src={mockupUrl}
              alt={project.title[locale]}
              fill
              className="object-cover transition-transform duration-500 scale-125 group-hover:scale-130"
            />
          ) : (
            <div className="w-full h-full" />
          )}

          <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <div className="size-14 rounded-full bg-primary text-background flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl">
              <ArrowUpRight size={28} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="p-5 md:p-6 space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-semibold uppercase">
                {project.title[locale]}
              </h3>
              <p className="text-muted-foreground text-[10px] md:text-xs font-medium uppercase tracking-wider">
                {project.categories[locale].join(" • ")}
              </p>
            </div>
            <span className="mt-1 text-xs md:text-sm text-muted-foreground">
              {project.year}
            </span>
          </div>

          {/* Subtly show the core tech used */}
          <div className="flex gap-2 overflow-hidden">
            {project.tech_stack.slice(0, 3).map((tech) => (
              <Badge size={"sm"} key={tech}>
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectSection;
