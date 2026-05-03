"use client";
import React from "react";
import Image from "next/image";
import H1 from "../../../components/headings/H1";
import { ExternalLink } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useLocale } from "next-intl";

const MiniProjectsSection = () => {
  const projects = useQuery(api.mini_projects.get);
  const locale = useLocale() as "en" | "nl";
  if (!projects) {
    return null;
  }

  return (
    <section className="pb-10">
      <H1 text1={"Mini"} text2={"Projects"} total={projects.length} />

      <div className="grid grid-cols-1 gap-3 md:gap-4">
        {projects.map((project) => (
          <a
            key={project._id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex md:items-center overflow-hidden rounded border bg-muted/10 p-3 md:p-4 hover:border-primary transition-all duration-300"
          >
            {/* LOGO CONTAINER */}
            <div className="flex size-16 md:size-20 shrink-0 items-center justify-center rounded border bg-black">
              <Image
                src={project.imageUrl ?? ""}
                alt={project.title.en}
                width={80}
                height={80}
                className="object-contain rounded"
              />
            </div>

            {/* CONTENT SECTION */}
            <div className="ml-4 md:ml-5 flex flex-1 flex-col overflow-hidden">
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate text-sm md:text-base font-semibold">
                  {project.title[locale]}
                </h3>
                <ExternalLink className="size-4 md:size-5 group-hover:text-primary" />
              </div>

              <p className="mt-0.5 md:mt-1 text-xs md:text-sm text-muted-foreground md:max-w-2xl">
                {project.description[locale]}
              </p>

              {/* TAGS */}
              <div className="mt-2 md:mt-4 flex flex-wrap gap-x-2 gap-y-1">
                {project.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/80"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default MiniProjectsSection;
