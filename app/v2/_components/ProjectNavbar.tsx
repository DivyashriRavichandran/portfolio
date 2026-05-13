"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
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
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md dark:bg-background/30">
      <div className="md:mx-auto flex md:max-w-3xl items-center justify-between lg:px-0 px-5 py-4">
        {/* BACK TO PORTFOLIO */}
        <Link
          href="/v2"
          className="group flex items-center gap-1 transition-opacity hover:opacity-90"
        >
          <ChevronLeft
            size={20}
            className="group-hover:-translate-x-1 transition"
          />
          <span className="text-[10px] uppercase font-semibold text-foreground">
            {t("back")}
          </span>
        </Link>

        {/* ACTIONS & NAV */}
        <div className="flex items-center gap-4 md:gap-5">
          {/* CONTROLS */}
          <div className="flex items-center gap-3">
            <LangSwitcher />
            <AnimatedThemeToggler />
          </div>

          {/* NEXT PROJECT */}
          <Link
            href={`/v2/project/${nextProject.slug}`}
            className="group flex items-center gap-1 transition-opacity hover:opacity-90"
          >
            <div className="flex flex-col items-end text-right text-muted-foreground">
              <span className="text-[10px] uppercase font-semibold leading-none text-foreground">
                {t("next")}
              </span>
              <span className="text-[11px] font-medium mt-0.5 max-w-25 truncate">
                {nextProject.title[locale]}
              </span>
            </div>
            <ChevronRight
              size={20}
              className="group-hover:translate-x-1 transition"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default ProjectNavbar;
