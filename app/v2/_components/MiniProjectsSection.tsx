"use client";
import React from "react";
import Image from "next/image";
import H1 from "../../../components/headings/H1";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

const MiniProjectsSection = () => {
  const t = useTranslations();
  const locale = useLocale() as "en" | "nl";
  const projects = useQuery(api.mini_projects.get);

  if (!projects) {
    return null;
  }

  return (
    <section className="py-6 md:py-10">
      <H1 text1={"Open-Source"} text2={t("works")} total={projects.length} />

      <div className="grid grid-cols-1 gap-3 md:gap-4">
        {projects.map((project) => (
          <a
            key={project._id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex md:items-center overflow-hidden rounded border p-3 md:p-4 bg-muted hover:border-foreground dark:hover:border-primary transition-all duration-300"
          >
            {/* LOGO CONTAINER */}
            <div className="flex size-14 md:size-20 bg-black shrink-0 items-center justify-center rounded border">
              <Image
                src={project.imageUrl ?? ""}
                alt={project.title.en}
                width={80}
                height={80}
                className="object-contain rounded"
              />
            </div>

            {/* CONTENT SECTION */}
            <div className="ml-3 md:ml-4 flex flex-1 flex-col overflow-hidden">
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate text-sm md:text-base font-medium">
                  {project.title[locale]}
                </h3>
                <ArrowUpRight className="text-muted-foreground size-4" />
              </div>

              <p className="mt-0.5 md:mt-1 text-xs md:text-sm text-muted-foreground md:max-w-2xl">
                {project.description[locale]}
              </p>

              {/* TAGS */}
              <div className="mt-2 md:mt-4 flex flex-wrap gap-x-2 gap-y-0.5">
                {project.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] md:text-xs lowercase text-muted-foreground"
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
