"use client";
import React, { useRef } from "react";
import Project from "./Project";
import data from "@/data/data.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ProjectSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const projects = data.projects;

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");

      cards.forEach((card, index) => {
        if (index !== cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            filter: "blur(4px)",
            scrollTrigger: {
              trigger: card,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="bg-black">
      {projects.map((project, index) => (
        <div key={project.id} className="project-card sticky top-0">
          <Project project={project} index={index} />
        </div>
      ))}
    </div>
  );
};

export default ProjectSection;
