import { DialogHeader } from "@/components/ui/dialog";
import {
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@radix-ui/react-dialog";
import { Layers, ExternalLink, Github, X } from "lucide-react";
import Image from "next/image";
import React from "react";

type Project = {
  id: number;
  logo: string;
  title: string;
  year: number;
  tech_stack: string[];
  categories: string[];
  images: string[];
  description: string;
  project_link: string;
  github_link: string;
  icon: string;
};
const ProjectDialog = ({ project }: { project: Project }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row h-full overflow-auto">
        {/* Right Side: Information */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col border-l border-foreground/5 order-2 md:order-1">
          <DialogHeader className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-2 bg-[#d0fe38] rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">
                System Log // {project.year}
              </span>
            </div>
            <DialogTitle className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
              {project.title}
            </DialogTitle>
            <div className="flex flex-wrap gap-2">
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-[10px] font-bold uppercase opacity-60 bg-foreground/5 px-2 py-1 rounded-md border border-foreground/10"
                >
                  {cat}
                </span>
              ))}
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <p className="text-lg text-foreground/70 leading-relaxed mb-10">
              {project.description}
            </p>

            <div className="space-y-8">
              <div>
                <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest mb-4">
                  <Layers size={14} className="text-[#d0fe38]" /> Technical
                  Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-1.5 rounded-full bg-foreground/[0.03] border border-foreground/10 text-xs font-medium italic"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-auto flex gap-4">
            <a
              href={project.project_link}
              target="_blank"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#d0fe38] text-black rounded-full font-bold uppercase text-xs tracking-widest hover:scale-[1.02] transition-transform"
            >
              Launch Project <ExternalLink size={14} />
            </a>
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                className="size-14 flex items-center justify-center border border-foreground/10 rounded-full hover:bg-foreground/5 transition-colors"
              >
                <Github size={20} />
              </a>
            )}
          </div>
        </div>

        {/* Left Side: Visuals */}
        <div className="w-full md:w-1/2 bg-foreground/[0.02] p-4 md:p-8 overflow-y-auto custom-scrollbar order-1 md:order-2">
          <div className="space-y-6">
            {project.images.map((img, i) => (
              <div
                key={i}
                className="relative aspect-video rounded-2xl overflow-hidden border border-foreground/5 shadow-2xl"
              >
                <Image
                  src={img}
                  fill
                  className="object-cover"
                  alt={`${project.title} screenshot ${i}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDialog;
