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
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

const ProjectSection = () => {
  const t = useTranslations();
  const projects = useQuery(api.projects.list);

  return (
    <section className="py-10 md:py-16">
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
    <Link href={`/v2/project/${project.slug}`} className="group block">
      <div className="border rounded bg-muted/30 overflow-hidden transition-all duration-300 group-hover:border-primary">
        {/* IMAGE CONTAINER */}
        <div className="relative z-0 aspect-5/3 overflow-hidden">
          {mockupUrl ? (
            <Image
              src={mockupUrl}
              alt={project.title[locale]}
              fill
              className="object-cover transition-transform duration-300 scale-115 group-hover:scale-120"
            />
          ) : (
            <div className="w-full h-full" />
          )}

          <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <div className="size-14 rounded-full bg-primary text-background flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
              <ArrowUpRight size={26} />
            </div>
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="p-3 md:p-4 space-y-3 md:space-y-4">
          <div className="flex justify-between items-start gap-2">
            <div className="md:space-y-1">
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
