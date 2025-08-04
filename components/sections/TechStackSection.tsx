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
  SiSpringboot,
  SiGit,
  SiFigma,
  SiFramer,
  SiCypress,
  SiMongodb,
  SiJira,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiJest,
} from "react-icons/si";
import { IconType } from "react-icons";
import { FaJava } from "react-icons/fa";
import { GrMysql } from "react-icons/gr";
import Heading from "../Heading";

interface TechItem {
  name: string;
  icon: IconType;
  category: "frontend" | "backend" | "design" | "tools";
}

export default function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const techStack: TechItem[] = [
    { name: "React", icon: SiReact, category: "frontend" },
    { name: "Next.js", icon: SiNextdotjs, category: "frontend" },
    { name: "TypeScript", icon: SiTypescript, category: "frontend" },
    { name: "Tailwind CSS", icon: SiTailwindcss, category: "frontend" },
    { name: "HTML", icon: SiHtml5, category: "frontend" },
    { name: "CSS", icon: SiCss3, category: "frontend" },
    { name: "Javascript", icon: SiJavascript, category: "frontend" },
    { name: "Python", icon: SiPython, category: "backend" },
    { name: "Java", icon: FaJava, category: "backend" },
    { name: "Spring Boot", icon: SiSpringboot, category: "backend" },
    { name: "MySQL", icon: GrMysql, category: "backend" },
    { name: "MongoDB", icon: SiMongodb, category: "backend" },
    { name: "Jest", icon: SiJest, category: "tools" },
    { name: "Cypress", icon: SiCypress, category: "tools" },
    { name: "Git", icon: SiGit, category: "tools" },
    { name: "Jira", icon: SiJira, category: "tools" },
    { name: "Figma", icon: SiFigma, category: "design" },
    { name: "Framer", icon: SiFramer, category: "design" },
  ];

  const filteredTech = activeCategory
    ? techStack.filter((tech) => tech.category === activeCategory)
    : techStack;

  const categories = [
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "design", name: "Design" },
    { id: "tools", name: "Tools" },
  ];

  return (
    <div className="py-10 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <Heading title={"Technologies"} subtitle={"My Tech Stack"} />

        {/* CATEGORIES */}
        <ScrollAnimation delay={0.2}>
          <div className="mt-6 md:mt-10 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === null
                  ? "gradient text-primary-foreground"
                  : "bg-muted  hover:bg-muted/60"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "gradient text-primary-foreground"
                    : "bg-muted  hover:bg-card"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </ScrollAnimation>

        {/* TECH STACK */}
        <div className="mt-6 mx-auto max-w-5xl relative z-10 grid grid-cols-3 gap-3 md:gap-4 md:grid-cols-6">
          {filteredTech.map((tech, index) => (
            <ScrollAnimation
              key={tech.name}
              delay={0.1 * (index % 4)}
              direction={index % 2 === 0 ? "up" : "down"}
            >
              <motion.div
                className="group relative overflow-hidden rounded-xl bg-card/80 p-4 transition-all hover:shadow-lg hover:-translate-y-1"
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex flex-col items-center justify-center text-center text-foreground/70 group-hover:text-foreground">
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
