import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Layers, Trophy, Zap, BugIcon, LightbulbIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export type Project = {
  _id: Id<"projects">;
  _creationTime: number;
  github_link?: string | undefined;
  title: {
    en: string;
    nl: string;
  };
  year: number;
  categories: {
    en: string[];
    nl: string[];
  };
  description: {
    en: string;
    nl: string;
  };
  tech_stack: string[];
  project_link: string;
  images: string[];
  mockup: string;
};

const ProjectDialog = ({ project }: { project: Project }) => {
  const imageUrls = useQuery(api.images.getUrls, {
    storageIds: project.images ?? [],
  });

  if (!project || !imageUrls) return null;

  return (
    <div className="md:flex-row h-full overflow-hidden grid grid-cols-1 md:grid-cols-3">
      {/* Information Side */}
      <div className="w-full md:col-span-2 p-8 md:p-10 flex flex-col border-r border-white/5 order-2 md:order-1 overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-4xl font-semibold uppercase tracking-tighter leading-none">
            {project.title.en}
          </DialogTitle>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="text-xs font-medium uppercase tracking-widest bg-primary px-2 py-1 rounded-md border border-white/10 text-background">
              {project.year}
            </span>
            {project.categories?.en.map((cat) => (
              <span
                key={cat}
                className="text-xs font-medium uppercase tracking-widest opacity-80 bg-white/5 px-2 py-1 rounded-md border border-white/10"
              >
                {cat}
              </span>
            ))}
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          <p className="text-sm md:text-base leading-relaxed">
            {project.description.en}
          </p>

          {/* <div className="grid grid-cols-1 gap-6 border-y border-foreground/20 py-8">
            {project.problem && (
              <div className="flex gap-4">
                <BugIcon size={18} className="text-primary shrink-0" />
                <div>
                  <h4 className="text-[10px] font-semibold uppercase tracking-widest opacity-60">
                    Problem
                  </h4>
                  <p className="text-xs md:text-sm">{project.problem}</p>
                </div>
              </div>
            )}
            {project.solution && (
              <div className="flex gap-4">
                <LightbulbIcon size={18} className="text-primary shrink-0" />
                <div>
                  <h4 className="text-[10px] font-semibold uppercase tracking-widest opacity-60">
                    Solution
                  </h4>
                  <p className="text-xs md:text-sm">{project.solution}</p>
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
                  <p className="text-xs md:text-sm">{project.challenge}</p>
                </div>
              </div>
            )}
            {project.outcome && (
              <div className="flex gap-4">
                <Trophy size={18} className="text-primary shrink-0" />
                <div>
                  <h4 className="text-[10px] font-semibold uppercase tracking-widest opacity-60">
                    Outcome
                  </h4>
                  <p className="text-xs md:text-sm">{project.outcome}</p>
                </div>
              </div>
            )}
          </div> */}

          <div>
            <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
              <Layers size={14} className="text-primary" /> Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech_stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 mt-auto gap-4 grid grid-cols-2">
          <a
            href={project.project_link || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full">Live Site</Button>
          </a>
          {project.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full" variant={"outline"}>
                Code
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Visuals Side */}
      <div className="w-full md:col-span-1 p-4 md:p-6 overflow-y-auto custom-scrollbar order-1 md:order-2">
        <div className="space-y-6">
          {imageUrls.map((url, i) => (
            <div
              key={i}
              className="relative aspect-video rounded overflow-hidden border border-white/10 group"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />

              <Image
                src={url ?? ""}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
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
