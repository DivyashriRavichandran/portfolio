"use client";

import React, { useState } from "react";
import data from "@/data/data.json";
import {
  ArrowDownLeftIcon,
  CheckCircle2Icon,
  GithubIcon,
  GlobeIcon,
  LightbulbIcon,
  ShieldAlertIcon,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Project = () => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const project = data.projects[0];

  return (
    <div className="h-svh bg-primary text-[#2F3D00] md:p-10 flex flex-col justify-between">
      {/* HEADER */}
      <div>
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <Image
              src={project.logo}
              alt={project.title.en}
              width={100}
              height={100}
              className="size-12 md:size-16 border-[#2F3D00] border rounded-full"
            />
            <h1 className="text-4xl md:text-6xl font-semibold">
              {project.title.en}
            </h1>
          </div>

          <span className="text-xl font-medium">{project.year}</span>
        </div>

        <article className="mt-6">
          <p className="text-xl">{project.description}</p>
          <button
            onClick={() => setOpen(true)}
            className="ml-auto flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-[#2F3D00] pb-1 hover:opacity-60 transition-all"
          >
            Learn More <LightbulbIcon className="size-4" />
          </button>
        </article>

        {/* KEY FEATURES */}
        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-widest opacity-70">
            Project Features
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Authentication",
                desc: "Secure JWT-based login with role management.",
              },
              {
                title: "Real-time Data",
                desc: "Live updates using WebSockets for dashboard stats.",
              },
              {
                title: "Responsive Design",
                desc: "Optimized for mobile, tablet, and desktop views.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-4 border border-[#2F3D00]/20 rounded-2xl bg-white/10 backdrop-blur-sm"
              >
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p className="text-sm leading-relaxed opacity-80">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* PROJECT IMAGES CAROUSEL */}
      {project.images && project.images.length > 0 && (
        <section className="mt-6 flex gap-4 items-center">
          {project.images.length > 1 &&
            project.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={""}
                width={500}
                height={500}
                className="w-1/4 max-h-60 object-cover border border-[#2F3D00]"
              />
            ))}
        </section>
      )}

      {/* BOTTOM */}
      <div className="d">
        {/* TECH STACK SECTION */}
        <section className="mt-6 pt-6 border-t border-[#2F3D00]/10 z-10">
          <div className="flex items-center gap-3">
            <span className="text-sm md:text-base font-bold uppercase tracking-wider w-full mb-2">
              Built with
            </span>
            {project.tech_stack.map((tech, index) => (
              <span
                key={index}
                className="text-sm md:text-base border border-[#2F3D00]/30 bg-[#2F3D00]/5 px-4 py-1.5 rounded-full backdrop-blur-md hover:bg-[#2F3D00] hover:text-primary transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* LINKS SECTION */}
        <section className="mt-6 pt-6 border-t border-[#2F3D00]/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            {/* Heading: Removed w-full so it doesn't block the row */}
            <h2 className="text-sm md:text-base font-bold uppercase tracking-wider whitespace-nowrap">
              Explore the Project
            </h2>

            {/* Buttons Container: Pushed to the right by justify-between */}
            <div className="flex items-center gap-4">
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit flex items-center gap-2 px-6 py-3 border border-[#2F3D00] rounded-full text-[#2F3D00] bg-transparent hover:bg-[#2F3D00] hover:text-primary transition-all text-base font-medium whitespace-nowrap"
                >
                  <GithubIcon className="size-5" />
                  <span>GitHub</span>
                </a>
              )}

              {project.project_link && (
                <a
                  href={project.project_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit flex items-center gap-2 px-6 py-3 bg-[#2F3D00] text-primary rounded-full hover:bg-opacity-90 transition-all text-base font-medium whitespace-nowrap"
                >
                  <GlobeIcon className="size-5" />
                  <span>Live Site</span>
                </a>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* LEARN MORE DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-primary text-[#2F3D00] border-[#2F3D00]/20 min-w-2xl p-8 md:p-12 overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-[#2F3D00]/40" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
                Technical Case Study
              </span>
            </div>
            <DialogTitle className="text-4xl md:text-5xl font-semibold italic">
              Challenges & Solutions
            </DialogTitle>
          </DialogHeader>

          <div className="mt-10 space-y-10">
            {/* THE CHALLENGE SECTION */}
            <div className="relative p-6 border border-[#2F3D00]/20 rounded-2xl bg-white/5 shadow-inner">
              <div className="absolute -top-4 left-6 bg-primary px-3 flex items-center gap-2">
                <ShieldAlertIcon className="size-5 text-red-600" />
                <span className="font-bold uppercase tracking-tighter text-sm">
                  The Problem
                </span>
              </div>
              <p className="text-lg md:text-xl leading-relaxed">
                {project.challenges}
              </p>
            </div>

            {/* THE SOLUTION SECTION */}
            <div className="relative p-6 border border-[#2F3D00] rounded-2xl bg-[#2F3D00] text-primary shadow-xl">
              <div className="absolute -top-4 left-6 bg-primary text-[#2F3D00] border border-[#2F3D00]/20 px-3 flex items-center gap-2 rounded-full">
                <CheckCircle2Icon className="size-5 text-green-600" />
                <span className="font-bold uppercase tracking-tighter text-sm">
                  The Resolution
                </span>
              </div>
              <p className="text-lg md:text-xl leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* FOOTER DECORATION */}
          <div className="mt-8 flex justify-end">
            <p className="text-[10px] uppercase tracking-widest opacity-40">
              Documentation v1.0 — {project.title.en}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Project;
