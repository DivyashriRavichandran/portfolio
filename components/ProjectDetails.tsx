import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { IconType } from "react-icons";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import ActionButton from "./ActionButton";

type ProjectProps = {
  title: string;
  type: string;
  year: string;
  description: string;
  detailedDescription?: string;
  features?: string[];
  challenges?: string[];
  techStack: {
    name: string;
    icon: IconType;
  }[];
  images?: StaticImageData[];
  githubLink?: string;
  websiteLink?: string;
};

type ProjectDetailsProps = {
  project: ProjectProps | null;
  open: boolean;
  onClose: () => void;
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  open,
  onClose,
}) => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!project) return null;

  // Shared content with responsive layout
  const content = (
    <>
      {/* Details */}
      <div
        className={`
          flex flex-col 
          ${isDesktop ? "justify-between overflow-y-auto max-h-[75vh]" : ""}
        `}
      >
        <DialogHeader className="mb-4">
          <DialogTitle className="text-3xl font-bold">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            {project.detailedDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Tech Stack:</h4>
          <div className="flex flex-wrap items-center gap-3">
            {project.techStack.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-full bg-muted px-4 py-1 text-sm font-medium"
              >
                <tech.icon className="h-5 w-5" />
                {tech.name}
              </div>
            ))}
          </div>
        </div>

        {project.features && (
          <section className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Features</h4>
            <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed text-foreground/90">
              {project.features.map((feat, i) => (
                <li key={i}>{feat}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Action buttons */}
        <div className="mt-auto flex flex-wrap justify-center gap-4">
          {project.type === "dissertation" ? (
            <a
              href={project.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <ActionButton text="Project Report" />
            </a>
          ) : (
            <a
              href={project.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <ActionButton text="Live Demo" />
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <ActionButton text="View Code" />
            </a>
          )}
        </div>
      </div>

      {/* Images */}
      {project.images && (
        <div
          className={`
            ${isDesktop ? "flex flex-col gap-4 overflow-hidden" : "w-full"}
          `}
        >
          <h3 className="text-xl font-semibold mb-3">Project Screenshots</h3>
          <div
            className={`
              ${
                isDesktop
                  ? "mt-2 flex flex-col gap-5 overflow-y-auto max-h-[75vh]"
                  : "grid grid-cols-2 gap-3"
              }
            `}
          >
            {project.images.map((image, i) => (
              <Image
                key={i}
                src={image}
                alt={`Screenshot ${i + 1}`}
                width={isDesktop ? 600 : 300}
                height={isDesktop ? 400 : 200}
                className="rounded-lg object-cover border"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );

  return isDesktop ? (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="grid grid-cols-2 gap-8 max-h-[80vh] min-w-[80svw] overflow-hidden p-8">
        {content}
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="flex flex-col gap-6 max-h-[90vh] w-full">
        {content}
      </DrawerContent>
    </Drawer>
  );
};

export default ProjectDetails;
