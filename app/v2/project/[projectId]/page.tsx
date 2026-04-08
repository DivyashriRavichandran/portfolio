"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Heading3 from "../../_components/Heading3";
import ProjectNotFound from "../../_components/ProjectNotFound";
import { FaGlobe, FaGithub } from "react-icons/fa6";
import LangSwitcher from "../../_components/LangSwitcher";
import { Skeleton } from "@/components/ui/skeleton";
import { ConvexImage } from "@/components/helper/ConvexImage";

export default function ProjectDetailsPage() {
  const t = useTranslations();
  const params = useParams();
  const locale = useLocale() as "en" | "nl";
  const projectId = params.projectId as Id<"projects">;

  const project = useQuery(api.projects.getById, { id: projectId });
  const allProjects = useQuery(api.projects.list);

  if (project == undefined || allProjects === undefined) {
    return (
      <main className="min-h-screen">
        {/* NAVBAR */}
        <nav className="border-b sticky top-0 z-50 backdrop-blur-sm bg-background/80">
          <div className="md:container md:mx-auto px-5 flex items-center justify-between py-4">
            <Skeleton className="h-10 w-32" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </nav>

        <section className="md:container md:mx-auto px-5 py-8 md:py-16 space-y-10">
          {/* HERO */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-12 md:h-20 w-3/4" />
            <Skeleton className="h-20 w-full md:w-2/3" />
          </div>

          {/* CAROUSEL */}
          <div className="grid md:grid-cols-2 gap-4">
            <Skeleton className="aspect-video w-full rounded-sm" />
            <Skeleton className="aspect-video w-full rounded-sm hidden md:block" />
          </div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
            {/* LEFT */}
            <div className="md:col-span-7 space-y-10">
              <div className="space-y-4">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              <Skeleton className="aspect-video w-full rounded-sm" />
            </div>

            {/* RIGHT */}
            <div className="md:col-span-5 space-y-10">
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="flex gap-2 flex-wrap">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>

              <div className="space-y-4">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
              </div>

              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!project) return <ProjectNotFound />;

  const currentIndex = allProjects.findIndex((p) => p._id === projectId);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <main className="min-h-screen">
      {/* NAVBAR */}
      <nav className="border-b sticky top-0 z-50 backdrop-blur-sm bg-background/80">
        <div className="md:container md:mx-auto px-5 flex items-center justify-between py-4">
          <Link
            href="/v2"
            className="group text-xs md:text-sm font-medium flex items-center gap-2"
          >
            <div className="size-10 rounded-full border flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
              <ChevronLeft size={16} />
            </div>
            <span className="hidden md:block">{t("back-to-portfolio")}</span>
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            {project.project_link && (
              <a
                href={project.project_link}
                target="_blank"
                className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-colors"
              >
                <span className="hidden md:block">{t("live-site")}</span>
                <FaGlobe size={20} />
              </a>
            )}

            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-colors"
              >
                <span className="hidden md:block">{t("source-code")}</span>
                <FaGithub size={20} />
              </a>
            )}
            <Link
              href={`/v2/project/${nextProject._id}`}
              className="group flex items-center gap-3 border-l pl-4"
            >
              <div className="hidden sm:block text-right">
                <p className="text-[10px] uppercase tracking-tight text-muted-foreground font-semibold">
                  {t("next-project")}
                </p>

                <p className="text-sm font-semibold group-hover:text-primary transition-colors">
                  {nextProject.title[locale]}
                </p>
              </div>
              <div className="size-10 rounded-full border flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                <ChevronRight size={16} />
              </div>
            </Link>
            <LangSwitcher />
          </div>
        </div>
      </nav>

      <section className="md:container md:mx-auto px-5 py-8 md:py-16">
        {/* HERO */}
        <header className="space-y-4">
          <div className="text-muted-foreground flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium md:font-semibold">
            <span>{project.year}</span>
            <span className="h-px w-8 bg-primary/30" />
            <span>{project.categories[locale].join(" • ")}</span>{" "}
          </div>
          <h1 className="text-3xl md:text-6xl font-semibold tracking-tight uppercase wrap-break-word">
            {project.title[locale]}
          </h1>
          <div className="border-l-2 border-primary pl-4 md:pl-4 mt-4 md:mt-8">
            <p className="text-sm md:text-xl text-muted-foreground leading-snug">
              {project.description[locale]}
            </p>
          </div>
        </header>

        {/* CAROUSEL */}
        <div className="mt-8 md:mt-12">
          <Carousel opts={{ align: "start", loop: true }} className="w-full ">
            <CarouselContent>
              {project.images.map((storageId) => (
                <CarouselItem key={storageId} className="md:basis-1/2">
                  <div className="relative aspect-video rounded-sm overflow-hidden border border-white/10">
                    <ConvexImage storageId={storageId} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end gap-2 mt-4">
              <CarouselPrevious className="static translate-y-0 h-12 w-12" />
              <CarouselNext className="static translate-y-0 h-12 w-12" />
            </div>
          </Carousel>
        </div>

        {/* CONTENT GRID */}
        <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 space-y-8 md:space-y-16">
            <article>
              <Heading3 text1={t("the-build")} text2={t("story")} />
              <div className="space-y-4 md:space-y-8 text-muted-foreground text-sm md:text-lg">
                <p>{project.motivation?.[locale]}</p>{" "}
                <p>{project.execution?.[locale]}</p>
                <p>{project.result?.[locale]}</p>
              </div>
            </article>

            {project.architecture && (
              <article>
                <Heading3 text1={t("system")} text2={t("design")} />
                <div className="relative aspect-video rounded-sm border bg-foreground/5 p-4">
                  <ConvexImage storageId={project.architecture} contain />
                </div>
              </article>
            )}
          </div>

          <aside className="md:col-span-5 space-y-8 md:space-y-12">
            <div>
              <Heading3 text1="Tech" text2="Stack" />
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>

            <div>
              <Heading3 text1={t("key")} text2={t("features")} />
              <ul className="space-y-3 md:space-y-4">
                {project.features?.map((feature, i) => (
                  <li
                    key={i}
                    className="text-sm md:text-lg flex gap-3 text-muted-foreground"
                  >
                    <span className="text-primary font-semibold">
                      0{i + 1}.
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Heading3 text1={t("the")} text2={t("challenge")} />
              <p className="text-sm md:text-lg text-muted-foreground">
                {project.challenge?.[locale]}
              </p>
            </div>
            <div>
              <Heading3 text1={t("the")} text2={t("solution")} />
              <p className="text-sm md:text-lg text-muted-foreground">
                {project.solution?.[locale]}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
