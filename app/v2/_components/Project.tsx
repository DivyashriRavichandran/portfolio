import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Layers, ExternalLink, Github, Trophy, Zap } from "lucide-react";
import Image from "next/image";
import React from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  year: number;
  tech_stack: string[];
  categories: string[];
  images: string[];
  mockup: string;
  project_link: string;
  github_link?: string;
  role?: string;
  impact?: string;
  challenge?: string;
  logo?: string;
  icon?: string;
};

const ProjectDialog = ({ project }: { project: Project }) => {
  if (!project) return null;

  return (
    <div className="flex flex-col md:flex-row h-full overflow-hidden">
      {/* Information Side */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col border-r border-white/5 order-2 md:order-1 overflow-y-auto custom-scrollbar">
        <DialogHeader className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] px-2 py-1 bg-white/5 border border-white/10 rounded">
              {project.year}
            </span>
            {project.role && (
              <span className="text-[10px] font-semibold uppercase tracking-widest text-background px-1 bg-primary">
                {project.role}
              </span>
            )}
          </div>

          <DialogTitle className="text-4xl font-semibold uppercase tracking-tighter leading-none mb-6">
            {project.title}
          </DialogTitle>

          <div className="flex flex-wrap gap-2">
            {project.categories?.map((cat) => (
              <span
                key={cat}
                className="text-xs font-medium uppercase tracking-widest opacity-80 bg-white/5 px-2 py-1 rounded-md border border-white/10"
              >
                {cat}
              </span>
            ))}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-sm text-white/70 leading-relaxed">
            {project.description}
          </p>

          {(project.impact || project.challenge) && (
            <div className="grid grid-cols-1 gap-6 border-y border-white/5 py-8">
              {project.impact && (
                <div className="flex gap-4">
                  <Trophy size={18} className="text-primary shrink-0" />
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase tracking-widest opacity-60">
                      The Impact
                    </h4>
                    <p className="text-sm text-white/90">{project.impact}</p>
                  </div>
                </div>
              )}
              {project.challenge && (
                <div className="flex gap-4">
                  <Zap size={18} className="text-primary shrink-0" />
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase tracking-widest opacity-60">
                      Key Challenge
                    </h4>
                    <p className="text-sm text-white/90">{project.challenge}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest mb-4">
              <Layers size={14} className="text-primary" /> Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-medium text-white/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-12 mt-auto gap-4 grid grid-cols-2">
          <a
            href={project.project_link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-4 bg-primary text-black rounded-xl font-bold uppercase text-xs tracking-widest hover:brightness-110 transition-all"
          >
            Live Site <ExternalLink size={14} />
          </a>
          {project.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="size-14 flex items-center justify-center border border-white/10 rounded-xl hover:bg-white/5 transition-colors"
            >
              Code <Github size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Visuals Side */}
      <div className="w-full md:w-1/2 bg-black p-4 md:p-8 overflow-y-auto custom-scrollbar order-1 md:order-2">
        <div className="space-y-6">
          {project.mockup && (
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <Image
                src={project.mockup}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                alt={`${project.title} mockup`}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          )}

          {project.images?.map((img, i) => (
            <div
              key={i}
              className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl group"
            >
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
              <Image
                src={img}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                alt={`${project.title} gallery ${i}`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProjectDialog;
