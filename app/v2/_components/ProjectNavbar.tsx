"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaGlobe, FaGithub } from "react-icons/fa6";
import LangSwitcher from "./LangSwitcher";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
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
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md dark:bg-background">
      <div className="md:mx-auto flex md:max-w-4xl items-center justify-between lg:px-0 px-6 py-4">
        {/* BACK TO PORTFOLIO */}
        <Link
          href="/v2"
          className="group flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <ChevronLeft size={20} className="text-muted-foreground" />
          <span className="text-[10px] uppercase tracking-tight font-semibold text-foreground">
            {t("back")}
          </span>
        </Link>

        {/* ACTIONS & NAV */}
        <div className="flex items-center gap-4 md:gap-5">
          {/* EXTERNAL LINKS */}
          {/* <div className="flex items-center">
            {project.project_link && (
              <a
                href={project.project_link}
                target="_blank"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                title="Live Demo"
              >
                <FaGlobe size={20} />
              </a>
            )}
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                title="Source Code"
              >
                <FaGithub size={20} />
              </a>
            )}
          </div> */}

          {/* CONTROLS */}
          <div className="flex items-center gap-3">
            <LangSwitcher />
            <AnimatedThemeToggler />
          </div>

          {/* NEXT PROJECT */}
          <Link
            href={`/v2/project/${nextProject.slug}`}
            className="group flex items-center gap-2 transition-opacity hover:opacity-90"
          >
            <div className="flex flex-col items-end text-right">
              <span className="text-[9px] uppercase tracking-tight text-muted-foreground font-semibold leading-none">
                {t("next")}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-tight mt-0.5 max-w-25 truncate">
                {nextProject.title[locale]}
              </span>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default ProjectNavbar;
