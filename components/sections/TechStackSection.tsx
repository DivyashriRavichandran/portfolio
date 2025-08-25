"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import ScrollAnimation from "../custom/ScrollAnimation";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPython,
  SiGit,
  SiFigma,
  SiFramer,
  SiCypress,
  SiJira,
  SiHtml5,
  SiCss3,
  SiJavascript,
} from "react-icons/si";
import { IconType } from "react-icons";
import { GrMysql } from "react-icons/gr";
import Heading from "../Heading";
import { GiBearFace } from "react-icons/gi";

interface TechItem {
  name: string;
  icon: IconType;
  category: "languages" | "frameworks" | "tools";
}

export default function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const techStack: TechItem[] = [
    { name: "HTML", icon: SiHtml5, category: "languages" },
    { name: "CSS", icon: SiCss3, category: "languages" },
    { name: "JavaScript", icon: SiJavascript, category: "languages" },
    { name: "TypeScript", icon: SiTypescript, category: "languages" },
    { name: "React", icon: SiReact, category: "frameworks" },
    { name: "Next.js", icon: SiNextdotjs, category: "frameworks" },
    { name: "Tailwind CSS", icon: SiTailwindcss, category: "frameworks" },
    { name: "Python", icon: SiPython, category: "languages" },
    { name: "MySQL", icon: GrMysql, category: "languages" },
    { name: "Framer", icon: SiFramer, category: "frameworks" },
    { name: "Zustand", icon: GiBearFace, category: "tools" },
    { name: "Cypress", icon: SiCypress, category: "tools" },
    { name: "Figma", icon: SiFigma, category: "tools" },
    { name: "Git", icon: SiGit, category: "tools" },
    { name: "Jira", icon: SiJira, category: "tools" },
  ];

  const filteredTech = activeCategory
    ? techStack.filter((tech) => tech.category === activeCategory)
    : techStack;

  const categories = [
    { id: "languages", name: "Languages" },
    { id: "frameworks", name: "Frameworks" },
    { id: "tools", name: "Tools" },
  ];

  return (
    <div className="py-10 md:py-20 overflow-clip">
      <div className="relative container mx-auto px-4 text-center">
        {/* GRADIENTS */}
        <div className="-z-20 absolute right-0 top-0 md:top-20 rounded-full size-20 md:size-40 bg-gradient-to-br from-primary to-secondary blur-[100px] md:blur-[150px]"></div>
        <div className="-z-20 absolute left-0 md:-left-20 top-1/4 md:top-3/4 rounded-full size-20 md:size-40 bg-gradient-to-br from-primary to-secondary blur-[80px] md:blur-[150px]"></div>

        <Heading title={"Tech Stack"} subtitle={"Skills"} />

        {/* CATEGORIES */}
        <ScrollAnimation delay={0.2}>
          <div className="mt-6 md:mt-10 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-full px-4 py-2 md:px-5 md:py-2 text-sm md:text-base font-medium transition-all ${
                activeCategory === null
                  ? "gradient text-primary-foreground hover:opacity-80"
                  : "bg-card hover:bg-muted"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-4 py-2 text-sm md:text-base font-medium transition-all ${
                  activeCategory === category.id
                    ? "gradient text-primary-foreground hover:opacity-80"
                    : "bg-card hover:bg-muted"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </ScrollAnimation>

        {/* TECH STACK */}
        <div className="mt-6 md:mt-10 mx-auto max-w-5xl relative z-10 grid grid-cols-3 gap-3 md:gap-4 md:grid-cols-6">
          {filteredTech.map((tech, index) => (
            <ScrollAnimation
              key={tech.name}
              delay={0.1 * (index % 4)}
              direction={index % 2 === 0 ? "up" : "down"}
            >
              <motion.div
                className="group relative overflow-hidden rounded-xl bg-card/40 p-4 transition-all hover:shadow-lg hover:-translate-y-1 h-full"
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex flex-col items-center justify-between h-full text-center text-foreground/70 group-hover:text-foreground">
                  <tech.icon className="size-6 md:size-8 " />
                  <h3 className="text-sm md:text-base mt-2 md:mt-3 font-medium">
                    {tech.name}
                  </h3>
                </div>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </div>
  );
}
