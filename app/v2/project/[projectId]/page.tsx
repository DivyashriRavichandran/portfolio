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
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const tocItems = [
  { id: "story", label: "Build Story" },
  { id: "stack", label: "Tech & Features" },
  { id: "challenge", label: "The Challenge" },
  { id: "solution", label: "The Solution" },
  { id: "design", label: "System Design" },
  { id: "links", label: "Project Links" },
];

export default function ProjectDetailsPage() {
  const t = useTranslations();
  const params = useParams();
  const locale = useLocale() as "en" | "nl";
  const projectId = params.projectId as Id<"projects">;

  const project = useQuery(api.projects.getById, { id: projectId });
  const allProjects = useQuery(api.projects.list);

  const [activeSection, setActiveSection] = useState("");

  // Track scroll position to update active heading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-10% 0% -40% 0%" },
    );

    const sections = ["story", "stack", "challenge", "solution", "design"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (project === undefined || allProjects === undefined) {
    return (
      <main className="md:max-w-4xl md:mx-auto px-5 md:px-0">
        <div className="py-8 md:py-16 space-y-12">
          {/* HERO SKELETON */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-48 bg-primary/10" />
            <Skeleton className="h-12 md:h-16 w-3/4" />
            <div className="border-l-2 border-primary/20 pl-4">
              <Skeleton className="h-20 w-full" />
            </div>
          </div>

          {/* CAROUSEL SKELETON */}
          <Skeleton className="aspect-video w-full rounded-sm" />

          {/* STORY SKELETON */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-40" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>

          {/* NEW MERGED CHALLENGE/SOLUTION SKELETON */}
          <div className="grid md:grid-cols-2 gap-px bg-border border rounded-xl overflow-hidden">
            <div className="p-8 bg-background space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div className="p-8 bg-background space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!project) return <ProjectNotFound />;

  const currentIndex = allProjects.findIndex((p) => p._id === projectId);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <main className="relative w-full h-full">
      {/* SIDEBAR TRACKER */}
      <aside className="hidden xl:block fixed left-[calc(50%+30rem)] top-40 w-64">
        <div className="space-y-4 border-l pl-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-6">
            On this page
          </p>
          {tocItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-sm transition-all duration-300 relative ${
                activeSection === item.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute -left-6.5 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </a>
          ))}
        </div>
      </aside>

      {/* NAVBAR */}
      <nav className="border-b sticky top-0 z-50 backdrop-blur-sm md:max-w-4xl md:mx-auto px-5 md:px-0 ">
        <div className="flex items-center justify-between py-4">
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
                <FaGlobe size={20} />
              </a>
            )}

            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-colors"
              >
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

                <p className="text-xs font-semibold group-hover:text-primary transition-colors">
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

      <section className="md:max-w-4xl md:mx-auto px-5 md:px-0 py-8 md:py-16">
        {/* HERO */}
        <header className="space-y-4">
          <div className="text-muted-foreground flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium md:font-semibold">
            <span>{project.year}</span>
            <span className="h-px w-8 bg-primary/30" />
            <span>{project.categories[locale].join(" • ")}</span>{" "}
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold uppercase wrap-break-word">
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
              {(project.imageUrls ?? []).map((url, i) => (
                <CarouselItem key={url ?? i} className="md:basis-1/1">
                  <div className="relative aspect-video rounded-sm overflow-hidden border border-white/10">
                    <Image
                      src={url ?? ""}
                      alt={`Project Image ${i + 1}`}
                      fill
                      className="object-cover"
                    />
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

        {/* CONTENT  */}
        <div className="mt-10 space-y-12">
          <article id="story" className="scroll-mt-32 space-y-6">
            <Heading3 text1={t("the-build")} text2={t("story")} />
            <div className="space-y-6 text-muted-foreground text-base md:text-xl leading-relaxed">
              <p>{project.motivation?.[locale]}</p>
              <p>{project.execution?.[locale]}</p>
              <p>{project.result?.[locale]}</p>
            </div>
          </article>

          <div
            id="stack"
            className="scroll-mt-32 grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <div className="space-y-4">
              <Heading3 text1="Tech" text2="Stack" />
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="px-3 py-1 text-xs"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Heading3 text1={t("key")} text2={t("features")} />
              <ul className="space-y-3">
                {project.features?.[locale]?.map((feature, i) => (
                  <li
                    key={i}
                    className="text-sm md:text-base flex gap-3 text-muted-foreground"
                  >
                    <span className="text-primary font-bold">0{i + 1}.</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CHALLENGE & SOLUTION */}
          <section id="challenge" className="scroll-mt-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
              {/* The Challenge Side */}
              <div className="p-8 md:p-10 bg-background/50 hover:bg-background/80 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="size-8 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <span className="text-red-500 text-xs font-bold">!</span>
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-tighter">
                    The {t("challenge")}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {project.challenge?.[locale]}
                </p>
              </div>

              {/* The Solution Side */}
              <div className="p-8 md:p-10 bg-primary/[0.02] hover:bg-primary/[0.05] transition-colors border-t md:border-t-0 md:border-l border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <span className="text-primary text-xs font-bold">✓</span>
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-tighter text-primary">
                    The {t("solution")}
                  </h3>
                </div>
                <p className="text-foreground leading-relaxed font-medium">
                  {project.solution?.[locale]}
                </p>
              </div>
            </div>
          </section>

          {project.architecture && (
            <article id="design" className="scroll-mt-32 space-y-8">
              <div className="text-center">
                <Heading3 text1={t("system")} text2={t("design")} />
              </div>
              <Image
                src={project.architectureUrl ?? ""}
                alt="Architecture"
                className="rounded w-full h-auto"
                width={1200}
                height={800}
              />
            </article>
          )}

          <div id="links" className="scroll-mt-32 space-y-8 pb-20">
            <Heading3 text1="Project" text2="Links" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  className="group relative p-6 border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex flex-col gap-4">
                    <div className="size-12 rounded-full bg-background flex items-center justify-center border group-hover:scale-110 transition-transform">
                      <FaGithub size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg uppercase">
                        Source Code
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        View the implementation and documentation on GitHub
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </a>
              )}

              {project.project_link && (
                <a
                  href={project.project_link}
                  target="_blank"
                  className="group relative p-6 bg-primary text-background hover:bg-primary/90 transition-all duration-300"
                >
                  <div className="flex flex-col gap-4">
                    <div className="size-12 rounded-full bg-black/10 flex items-center justify-center border border-black/10 group-hover:scale-110 transition-transform">
                      <FaGlobe size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg uppercase">
                        Live Demo
                      </h4>
                      <p className="text-sm text-black/70">
                        Experience the project live in your browser
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
