"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
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
import Image from "next/image";
import { useEffect, useState } from "react";
import PageNavbar from "../../_components/PageNavbar";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useLoading } from "@/components/custom/LoadingProvider";

export default function ProjectDetailsPage() {
  const t = useTranslations();
  const params = useParams();
  const locale = useLocale() as "en" | "nl";
  const slug = params.slug as string;
  const { startLoading, stopLoading } = useLoading();

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState<number>(-1);

  const project = useQuery(api.projects.getBySlug, { slug });
  const allProjects = useQuery(api.projects.list);

  const isLoading = project === undefined || allProjects === undefined;

  useEffect(() => {
    if (isLoading) {
      startLoading();
    } else {
      stopLoading();
    }

    return () => stopLoading();
  }, [isLoading, startLoading, stopLoading]);

  if (isLoading) {
    return null;
  }

  if (project === null) {
    return <ProjectNotFound />;
  }

  const currentIndex = allProjects?.findIndex((p) => p.slug === slug) ?? 0;
  const nextProject = allProjects?.[(currentIndex + 1) % allProjects.length];

  return (
    <main className="relative w-full h-full">
      <PageNavbar
        nextHref={`/v2/projects/${nextProject?.slug}`}
        nextLabel={nextProject?.title[locale]}
      />

      <section>
        {/* HERO */}
        <header className="space-y-4">
          <div className="text-muted-foreground flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-widest font-medium">
            <span>{project.year}</span>
            <span className="h-px w-6 bg-muted-foreground" />
            <span>{project.categories[locale].join(" • ")}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold wrap-break-word">
            {project.title[locale]}
          </h1>
          <div className="mt-4 md:mt-6 text-sm md:text-lg">
            {project.description[locale]}
          </div>
        </header>

        {/* CAROUSEL */}
        <div className="mt-8">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {(project.imageUrls ?? []).map((url, i) => (
                <CarouselItem key={url || i} className="md:basis-1/1 rounded">
                  <div
                    className="relative aspect-video overflow-hidden border cursor-zoom-in"
                    onClick={() => setPhotoIndex(i)}
                  >
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

          {/* Lightbox for Carousel */}
          <Lightbox
            open={photoIndex >= 0}
            index={photoIndex}
            close={() => setPhotoIndex(-1)}
            slides={(project.imageUrls ?? []).map((url) => ({
              src: url ?? "",
            }))}
          />
        </div>

        <div className="mt-8 space-y-10">
          {project.motivation && (
            <ProjectSection
              id="motivation"
              title1={t("why-i")}
              title2={t("built-it")}
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
              title1={t("how-i")}
              title2={t("built-it")}
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
              <H2 text1={t("the")} text2={t("results")} />
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
            <H2 text1={t("technologies")} text2={t("used")} />
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>

          {project.challenge && (
            <ProjectSection
              id="challenge"
              title1={t("the-0")}
              title2={t("challenges")}
            >
              <div className="whitespace-pre-line">
                {project.challenge[locale]}
              </div>
            </ProjectSection>
          )}

          {project.learning && (
            <ProjectSection
              id="learning"
              title1={t("Key")}
              title2={t("learnings")}
            >
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

              <div className="relative w-full aspect-video md:aspect-21/9 bg-foreground/5 rounded border border-foreground/5 overflow-hidden">
                <Image
                  src={project.architectureUrl}
                  alt="Architecture Diagram"
                  className="object-contain p-4 cursor-zoom-in"
                  fill
                  onClick={() => setIsOpen(true)}
                />
                <Lightbox
                  open={isOpen}
                  close={() => setIsOpen(false)}
                  slides={[{ src: project.architectureUrl }]}
                  render={{
                    buttonPrev: () => null,
                    buttonNext: () => null,
                  }}
                />
              </div>
            </article>
          )}

          {project.future && (
            <ProjectSection
              id="future"
              title1={t("Future")}
              title2={t("improvements")}
            >
              <div className="whitespace-pre-line">
                {project.future[locale]}
              </div>
            </ProjectSection>
          )}

          {/* PROJECT LINKS */}
          <div id="links" className="scroll-mt-32 space-y-8">
            <H2 text1="Project" text2={t("links")} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  className="group relative p-4 border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-background flex items-center justify-center border group-hover:scale-110 transition-transform">
                      <FaGithub size={24} />
                    </div>
                    <div>
                      <h4 className="font-medium md:text-lg">Source Code</h4>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        View the implementation on GitHub
                      </p>
                    </div>
                  </div>
                </a>
              )}

              {project.project_link && (
                <a
                  href={project.project_link}
                  target="_blank"
                  className="group relative p-4 bg-primary text-background hover:bg-primary/90 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-black/10 flex items-center justify-center border group-hover:scale-110 transition-transform">
                      <FaGlobe size={24} />
                    </div>
                    <div>
                      <h4 className="font-medium md:text-lg text-primary-foreground">
                        Live Demo
                      </h4>
                      <p className="text-xs md:text-sm text-black/70">
                        View the project live in your browser
                      </p>
                    </div>
                  </div>
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
