"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowUpRight,
  Github,
  Cpu,
  Target,
  Zap,
  ChevronLeft,
  Globe,
  GithubIcon,
  Workflow,
  Server,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import data from "../../../../data/data.json";

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params.projectId;
  const project = data.projects.find((p: any) => p.id === Number(projectId));

  if (!project)
    return (
      <div className="h-screen flex items-center justify-center">
        Project not found
      </div>
    );

  const imageUrls = project?.images ?? [];

  return (
    <main className="min-h-svh">
      {/* NAV BAR */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
        <div className="md:container md:mx-auto px-5 py-4 flex items-center justify-between">
          {/* LEFT: Back Link */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm font-medium opacity-80 hover:opacity-100 transition-all"
          >
            <ChevronLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="sm:hidden">Back</span>
          </Link>

          {/* CENTER: Actions & Next Project */}
          <div className="mx-auto flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex gap-6 border-r pr-8 border-foreground/10">
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest font-bold hover:text-primary transition-colors"
                >
                  Code <GithubIcon size={16} />
                </a>
              )}
              <a
                href={project.project_link}
                target="_blank"
                className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest font-bold hover:text-primary transition-colors"
              >
                Website <Globe size={16} />
              </a>
            </div>
          </div>

          {/* THE NEXT PROJECT BUTTON */}
          <Link
            href={`/projects/3`}
            className="group flex items-center gap-3 pl-2"
          >
            <div className="flex flex-col items-end">
              <span className="text-xs uppercase tracking-widest opacity-80 font-semibold leading-none">
                Next Case Study
              </span>
              <span className="font-semibold tracking-tighter group-hover:text-primary transition-colors line-clamp-1 max-w-[100px] md:max-w-none">
                CineDB
              </span>
            </div>
            <div className="size-8 rounded-full border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
              <ChevronRight size={16} />
            </div>
          </Link>
        </div>
      </nav>

      <section className="md:container md:mx-auto px-6 py-16">
        {/* HERO SECTION */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Badge>{project.year}</Badge>
            <div className="h-[1px] w-12 bg-foreground/20" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium">
              {project.categories.join(" / ")}
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
            {project.title}
          </h1>

          <p className="mt-4 text-lg md:text-xl leading-relaxed text-muted-foreground border-l-2 border-primary pl-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            aliquid, id asperiores repellat sunt maxime aut possimus minima
            omnis ipsum enim doloribus inventore eaque sit reprehenderit!
            Dolorem modi libero inventore?
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6">
            <Image
              src={imageUrls[0] || "/placeholder.png"}
              alt="Main Preview"
              className="object-cover w-full rounded-lg border"
              width={1000}
              height={800}
            />
            <Image
              src={imageUrls[1] || "/placeholder.png"}
              alt="Main Preview"
              className="object-cover rounded-lg border"
              width={1000}
              height={800}
            />
          </div>
        </div>

        {/* INFO */}
        <div className="mt-12 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b pb-6">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Tech Stack
              </h2>
            </div>
            <div className="flex gap-2">
              {project.tech_stack.map((tech: string) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>

          {/* ARCHITECTURE SECTION  */}
          <div className="mt-12 space-y-12">
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-semibold tracking-tight">
                System Architecture
              </h2>
              <div className="h-px flex-1 bg-foreground/60" />
            </div>
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              {/* LEFT: THE EXPLANATION */}
              <div className="lg:col-span-2 space-y-10">
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-primary">
                    <Server size={14} /> Core Infrastructure
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    The system relies on a <strong>Distributed State</strong>{" "}
                    model. Instead of fetching data on every interaction, I
                    implemented a subscription-based layer that only triggers
                    re-renders when specific data nodes change.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-primary">
                    <ShieldCheck size={14} /> Security & Auth
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Middlewares were used to intercept every request, ensuring
                    that sensitive project data is only accessible to authorized
                    sessions via JWT verification.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-primary">
                    <Zap size={14} /> Optimization
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    By using <strong>Edge Functions</strong>, the backend logic
                    is executed as close to the user as possible, reducing
                    latency to under 50ms for primary actions.
                  </p>
                </div>
              </div>

              {/* RIGHT: THE DIAGRAM */}
              <div className="lg:col-span-3">
                <div className="relative w-full aspect-square md:aspect-video rounded-[3rem] bg-zinc-50 border-2 border-dashed border-zinc-200 p-8 flex items-center justify-center overflow-hidden group shadow-inner">
                  <Image
                    src="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Software%20Architecture%20Diagrams%20-%20a%20microservices%20pattern.png"
                    alt="Architecture Diagram"
                    fill
                    className="object-contain p-12 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-8 left-8 flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[10px] font-mono text-zinc-500 border shadow-sm">
                    <Workflow size={12} className="text-primary" />{" "}
                    architecture_final.png
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
