"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Heading from "./Heading";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Subheading from "./Subheading";
import { Terminal } from "lucide-react";

const About = () => {
  const about = useQuery(api.about.get);

  return (
    <section className="px-5 md:container md:mx-auto py-12 md:py-20">
      <Heading text1="About" text2="Me" />

      <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* LEFT SIDE */}
        <div className="lg:col-span-7 space-y-6 text-lg md:text-2xl leading-snug">
          <p>
            Hi! I&apos;m Divyashri, a frontend developer based in Qatar who
            enjoys building immersive web experiences where design and
            engineering meet.
          </p>

          <p>
            My focus is on creating fast, accessible and visually refined web
            applications using modern technologies.
          </p>

          <p>
            Currently expanding into backend development with Java & Spring Boot
            while deepening my understanding of system design and architecture.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-5">
          <TechStackSection />
        </div>

        <Link
          href="/v2/about"
          className="flex items-center gap-2 group lg:col-span-12"
        >
          <span className="text-sm md:text-base font-medium group-hover:text-primary transition">
            More about me
          </span>

          <ArrowUpRight
            size={16}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary transition"
          />
        </Link>
      </div>
    </section>
  );
};

export default About;

const TechStackSection = () => {
  const tech_stack = {
    languages: ["TypeScript", "JavaScript", "Java", "SQL", "HTML", "CSS"],
    frameworks: ["React", "Next.js", "Spring Boot", "Tailwind"],
    tools: ["Docker", "Git", "Postman", "Figma"],
  };

  return (
    <div className="p-6 md:p-8 rounded border">
      <Subheading icon={Terminal} text={"Tech Stack"} />

      <div className="flex flex-col gap-4 md:gap-6">
        {Object.entries(tech_stack).map(([category, items]) => (
          <div key={category}>
            <p className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
              {category}
            </p>

            <div className="flex flex-wrap gap-2">
              {items.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
