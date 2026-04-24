"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
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
import H2 from "../../../../components/headings/H2";
import ProjectNotFound from "../../_components/ProjectNotFound";
import { FaGlobe, FaGithub } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProjectNavbar from "../../_components/ProjectNavbar";
import FloatingNavbar from "../../_components/FloatingNavbar";

const pillItems = [
  { id: "motivation", label: "Intro" },
  { id: "execution", label: "Build" },
  { id: "impact", label: "Impact" },
  { id: "stack", label: "Stack" },
  { id: "challenge", label: "Challenge" },
  { id: "future", label: "Future" },
  { id: "links", label: "Links" },
];

export default function ProjectDetailsPage() {
  const t = useTranslations();
  const params = useParams();
  const locale = useLocale() as "en" | "nl";
  const slug = params.slug as string;

  const project = useQuery(api.projects.getBySlug, { slug });
  const allProjects = useQuery(api.projects.list);

  const [activeSection, setActiveSection] = useState("");
  const [showPill, setShowPill] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowPill(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.2, rootMargin: "-90% 0% -10% 0%" },
    );

    pillItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [project]);

  if (project === undefined || allProjects === undefined) {
    return <ProjectLoadingSkeleton />;
  }

  if (!project) return <ProjectNotFound />;

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <main className="relative w-full h-full">
      {showPill && (
        <FloatingNavbar items={pillItems} activeId={activeSection} />
      )}

      <ProjectNavbar project={project} nextProject={nextProject} />

      <section className="md:max-w-4xl md:mx-auto px-5 lg:px-0 py-8 md:py-12">
        {/* HERO */}
        <header className="space-y-4">
          <div className="text-muted-foreground flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium md:font-semibold">
            <span>{project.year}</span>
            <span className="h-px w-8 bg-primary/30" />
            <span>{project.categories[locale].join(" • ")}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold uppercase wrap-break-word">
            {project.title[locale]}
          </h1>
          <div className="mt-4 md:mt-8">
            <p className="text-sm md:text-xl text-muted-foreground">
              {project.description[locale]}
            </p>
          </div>
        </header>

        {/* CAROUSEL */}
        <div className="mt-8 md:mt-12">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {(project.imageUrls ?? []).map((url, i) => (
                <CarouselItem key={url || i} className="md:basis-1/2">
                  <div className="relative aspect-video rounded overflow-hidden border">
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
              <CarouselPrevious className="static translate-y-0 size-10 md:size-12" />
              <CarouselNext className="static translate-y-0 size-10 md:size-12" />
            </div>
          </Carousel>
        </div>

        <div className="mt-10 space-y-12">
          {project.motivation && (
            <ProjectSection
              id="motivation"
              title1="Why I"
              title2="Built it"
              symbol="?"
            >
              <div className="whitespace-pre-line">
                {project.motivation[locale]}
              </div>
            </ProjectSection>
          )}

          {project.execution && (
            <ProjectSection
              id="execution"
              title1="How I"
              title2="Build it"
              symbol="?"
            >
              <div className="whitespace-pre-line">
                {project.execution[locale]}
              </div>
            </ProjectSection>
          )}

          {/* IMPACT METRICS */}
          {project.impact?.[locale] && project.impact[locale].length > 0 && (
            <section id="impact" className="scroll-mt-32 space-y-12">
              <H2 text1="Impact &" text2="Metrics" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.impact[locale].map((metric, i) => (
                  <MetricCard
                    key={i}
                    title={metric.title}
                    sub={metric.sub}
                    desc={metric.desc}
                  />
                ))}
              </div>
            </section>
          )}

          {/* TECH STACK */}
          <div id="stack" className="space-y-4 scroll-mt-32">
            <H2 text1="Technologies" text2="Used" />
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>

          {project.challenge && (
            <ProjectSection id="challenge" title1="The" title2="Challenges">
              <div className="whitespace-pre-line">
                {project.challenge[locale]}
              </div>
            </ProjectSection>
          )}

          {project.learning && (
            <ProjectSection id="learning" title1={t("Key")} title2="Learnings">
              <div className="whitespace-pre-line">
                {project.learning[locale]}
              </div>
            </ProjectSection>
          )}

          {/* SYSTEM DESIGN IMAGE */}
          {project.architectureUrl && (
            <article
              id="design"
              className="scroll-mt-32 space-y-6 w-full relative"
            >
              <div className="text-center">
                <H2 text1={t("system")} text2={t("design")} />
              </div>
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-foreground/5 rounded border border-foreground/5 overflow-hidden">
                <Image
                  src={project.architectureUrl}
                  alt="Architecture Diagram"
                  className="object-contain p-4"
                  fill
                />
              </div>
            </article>
          )}

          {project.future && (
            <ProjectSection
              id="future"
              title1={t("Future")}
              title2="Improvements"
            >
              <div className="whitespace-pre-line">
                {project.future[locale]}
              </div>
            </ProjectSection>
          )}

          {/* PROJECT LINKS */}
          <div id="links" className="scroll-mt-32 space-y-8 pb-20">
            <H2 text1="Project" text2="Links" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  className="group relative p-4 md:p-6 border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex md:flex-col items-center md:items-start gap-4">
                    <div className="size-12 rounded-full bg-background flex items-center justify-center border group-hover:scale-110 transition-transform">
                      <FaGithub size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold md:text-lg uppercase">
                        Source Code
                      </h4>
                      <p className="text-xs md:text-sm text-muted-foreground">
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
                  className="group relative p-4 md:p-6 bg-primary text-background hover:bg-primary/90 transition-all duration-300"
                >
                  <div className="flex md:flex-col items-center md:items-start gap-4">
                    <div className="size-12 rounded-full bg-black/10 flex items-center justify-center border border-black/10 group-hover:scale-110 transition-transform">
                      <FaGlobe size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold md:text-lg uppercase">
                        Live Demo
                      </h4>
                      <p className="text-xs md:text-sm text-black/70">
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

// --- Sub-components ---
function ProjectSection({
  id,
  title1,
  title2,
  symbol,
  children,
}: {
  id: string;
  title1: string;
  title2: string;
  symbol?: string;
  children: React.ReactNode;
}) {
  return (
    <article id={id} className="scroll-mt-32 space-y-4 md:space-y-6">
      <H2 text1={title1} text2={title2} symbol={symbol} />
      <div className="space-y-4 md:space-y-6 md:text-lg">{children}</div>
    </article>
  );
}

function MetricCard({
  title,
  sub,
  desc,
}: {
  title: string;
  sub: string;
  desc: string;
}) {
  return (
    <div className="p-5 border border-foreground/5 bg-primary/5 rounded space-y-2 hover:bg-primary/10 transition-colors">
      <p className="text-primary text-2xl font-semibold">{title}</p>
      <p className="text-[10px] font-semibold uppercase tracking-widest">
        {sub}
      </p>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </div>
  );
}

function ProjectLoadingSkeleton() {
  return (
    <main className="md:max-w-4xl md:mx-auto px-5 md:px-0">
      <div className="py-8 md:py-16 space-y-12">
        <div className="space-y-4">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-12 md:h-16 w-3/4" />
          <Skeleton className="h-20 w-full" />
        </div>
        <Skeleton className="aspect-video w-full rounded-sm" />
        <div className="space-y-6 pt-12">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </main>
  );
}
