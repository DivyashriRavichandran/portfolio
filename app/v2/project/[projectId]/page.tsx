"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import data from "../../../../data/data.json";
import { FaGithub, FaGlobe } from "react-icons/fa6";
import { BiLinkExternal } from "react-icons/bi";
import Heading3 from "../../_components/Heading3";
import ProjectNotFound from "../../_components/ProjectNotFound";

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = Number(params.projectId);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentIndex = data.projects.findIndex((p: any) => p.id === projectId);
  const project = data.projects[currentIndex];

  const nextProject = data.projects[(currentIndex + 1) % data.projects.length];
  const imageUrls = project?.images ?? [];

  if (!project) return <ProjectNotFound />;

  return (
    <main className="min-h-screen">
      {/* NAVBAR */}
      <nav className="border-b sticky top-0 z-50 backdrop-blur-sm">
        <div className="md:container md:mx-auto px-5 flex items-center justify-between py-4">
          <Link
            href="/"
            className="group text-xs md:text-sm font-medium flex items-center gap-2 hover:text-primary transition-colors"
          >
            <div className="size-8 rounded-full border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ChevronLeft size={16} />
            </div>
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            {project.project_link && (
              <a
                href={project.project_link}
                target="_blank"
                className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-colors"
              >
                <span>Live Site</span>
                <FaGlobe size={20} />
              </a>
            )}

            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-colors"
              >
                <span>Source Code</span>
                <FaGithub size={20} />
              </a>
            )}

            <Link
              href={`/projects/${nextProject.id}`}
              className="group flex items-center gap-3 md:gap-4 text-right border-l pl-4"
            >
              <div className="hidden sm:block">
                <p className="text-[10px] uppercase tracking-tight text-muted-foreground font-semibold">
                  Up Next
                </p>
                <p className="text-sm font-semibold group-hover:text-primary transition-colors">
                  {nextProject.title}
                </p>
              </div>
              <div className="size-8 rounded-full border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <ChevronRight size={16} />
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <section className="md:container md:mx-auto px-5 py-8 md:py-16">
        {/* HERO */}
        <header className="space-y-4 md:space-y-6">
          <div className="text-muted-foreground flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium md:font-semibold">
            <span>{project.year}</span>
            <span className="h-px w-4 md:w-8 bg-foreground" />
            <span className="truncate">{project.categories.join(" • ")}</span>
          </div>

          <h1 className="text-3xl md:text-6xl font-semibold tracking-tight leading-[0.9] md:leading-[0.8] uppercase wrap-break-word">
            {project.title}
          </h1>

          <div className="border-l-2 border-primary pl-4 md:pl-4 mt-4 md:mt-8">
            <p className="md:text-xl text-muted-foreground leading-snug">
              {project.description}
            </p>
          </div>
        </header>

        {/* CAROUSEL */}
        <div className="mt-8 md:mt-12">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {imageUrls.map((url, idx) => (
                <CarouselItem key={idx}>
                  <div className="relative aspect-video rounded-sm overflow-hidden border">
                    <Image
                      src={url}
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority={idx === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end gap-1 mt-4">
              <CarouselPrevious className="static translate-y-0 h-10 w-10 md:h-12 md:w-12" />
              <CarouselNext className="static translate-y-0 h-10 w-10 md:h-12 md:w-12" />
            </div>
          </Carousel>
        </div>

        {/* CONTENT */}
        <div className="md:mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-8 space-y-12 md:space-y-16">
            {/* Story */}
            <article>
              <Heading3 text1={"The Build"} text2={"Story"} />
              <div className="space-y-6 md:text-lg leading-relaxed">
                <p>{project.context}</p>
                <p>{project.execution}</p>
              </div>
            </article>

            {/* System Design */}
            <article>
              <Heading3 text1={"System"} text2={"Design"} />
              <div className="relative aspect-video rounded-sm border bg-foreground/30 p-4 md:p-10 group overflow-hidden">
                <Image
                  src="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Software%20Architecture%20Diagrams%20-%20a%20microservices%20pattern.png"
                  alt="Architecture"
                  fill
                  className="object-contain p-2 md:p-6"
                />
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="mt-6 md:mt-0 md:col-span-4 space-y-12 md:space-y-16">
            <div>
              <Heading3 text1={"Tech"} text2={"Stack"} />
              <div className="flex flex-wrap gap-1.5">
                {project.tech_stack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>

            <div>
              <Heading3 text1={"Key"} text2={"Features"} />
              <ul className="space-y-3 md:space-y-4 list-disc px-4">
                {project.features?.map((feature, i) => (
                  <li key={i} className="text-sm md:text-base">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Heading3 text1={"The"} text2={"Challenge"} />
              <p className="text-sm md:text-base">{project.challenge}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* FOOTER: */}
      <footer className="mt-4 md:mt-8 border-t">
        <div className=" md:container md:mx-auto px-5 py-10 md:py-20 flex flex-col md:flex-row items-center text-center md:text-left md:justify-between w-full">
          <div className="space-y-2 md:space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase leading-tight">
              <span>Are you</span>{" "}
              <span className="px-1 text-black/90 bg-primary">
                {" "}
                Interested?
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-base md:text-xl">
              Explore the live application and source code to see the full
              technical implementation.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex flex-col gap-3 w-full md:w-auto">
            <a
              href={project.project_link}
              target="_blank"
              className="bg-primary text-primary-foreground px-8 md:px-12 py-4 md:py-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all flex items-center justify-center gap-3"
            >
              Launch Project <BiLinkExternal size={18} />
            </a>
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                className="border px-8 md:px-12 py-4 md:py-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:bg-muted transition-all flex items-center justify-center gap-3"
              >
                View Source <FaGithub size={18} />
              </a>
            )}
          </div>
        </div>
      </footer>
    </main>
  );
}
