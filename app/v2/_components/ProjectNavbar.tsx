"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaGlobe, FaGithub } from "react-icons/fa6";
import LangSwitcher from "./LangSwitcher";
import { Doc } from "@/convex/_generated/dataModel";
import { useLocale, useTranslations } from "next-intl";

const ProjectNavbar = ({
  project,
  nextProject,
}: {
  project: Doc<"projects">;
  nextProject: Doc<"projects">;
}) => {
  const locale = useLocale() as "en" | "nl";
  const t = useTranslations();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="md:max-w-4xl mx-auto px-5 lg:px-0 flex items-center justify-between h-16 md:h-20">
        {/* BACK TO PORTFOLIO */}
        <Link
          href="/v2"
          className="group flex items-center gap-3 transition-colors"
        >
          <div className="size-8 md:size-10 flex items-center justify-center border border-muted-foreground/20  group-hover:border-primary group-hover:bg-primary/5 transition-all">
            <ChevronLeft size={16} />
          </div>
          <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground leading-none">
            {t("back")}
          </span>
        </Link>

        {/* ACTIONS & NEXT PROJECT */}
        <div className="flex items-center gap-4 md:gap-8 ">
          {/* EXTERNAL LINKS */}
          <div className="flex items-center gap-2">
            {project.project_link && (
              <a
                href={project.project_link}
                target="_blank"
                className="p-2.5  hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
                title="Live Demo"
              >
                <FaGlobe size={20} />
              </a>
            )}
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                className="p-2.5  hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
                title="Source Code"
              >
                <FaGithub size={20} />
              </a>
            )}
          </div>
          <LangSwitcher />

          {/* NEXT PROJECT NAV */}
          <Link
            href={`/v2/project/${nextProject.slug}`}
            className="group flex items-center gap-3 pl-4 border-l border-muted-foreground/20"
          >
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold leading-none">
                {t("next")}
              </span>
              <span className="text-[11px] font-semibold mt-1 group-hover:text-primary transition-colors max-w-[120px] truncate">
                {nextProject.title[locale]}
              </span>
            </div>
            <div className="size-8 md:size-10 flex items-center justify-center border border-muted-foreground/20  group-hover:border-primary group-hover:bg-primary/5 transition-all">
              <ChevronRight size={16} />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default ProjectNavbar;
