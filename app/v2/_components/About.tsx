"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import H1 from "../../../components/headings/H1";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import H2 from "@/components/headings/H2";

const About = () => {
  const about = useQuery(api.about.get);

  return (
    <section className="py-12 md:py-20">
      <H1 text1="About" text2="Me" />

      <div className="flex flex-col gap-10 md:gap-12">
        {/* LEFT SIDE */}
        <div className="flex flex-col space-y-4 md:space-y-6 md:text-xl">
          <p>
            Hi! I’m Divyashri, a 22-year-old Software Engineer and Computing
            Science Master’s student at the University of Groningen (RUG). I
            love building websites and tools that solve real-world problems.
            With over 2 years of professional frontend experience, I’ve also
            expanded into full-stack development, cloud computing and system
            design.
          </p>
          <p>
            At RUG, I’m specializing in Software Engineering and Distributed
            Systems. I’m fascinated by how we build large-scale systems that
            stay fast and reliable globally. This transition has allowed me to
            move beyond the UI and dive deep into networking, data consistency,
            and cloud architecture.
          </p>
          <p>
            I thrive on problems that force me to learn and adapt in real-time.
            For me, the best way to master a new technology is to dive in and
            build something challenging with it.
          </p>

          <Link
            href="/v2/about"
            className="flex items-center gap-2 group ml-auto text-muted-foreground"
          >
            <span className="text-sm md:text-base transition-all duration-300 decoration-[0.5px] hover:decoration-primary hover:text-primary underline underline-offset-8">
              Outside of coding
            </span>

            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary transition"
            />
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <TechStackSection />
      </div>
    </section>
  );
};

export default About;

const TechStackSection = () => {
  const tech_stack = {
    languages: ["TypeScript", "JavaScript", "Java", "Python", "SQL"],
    frontend: ["Next.js", "React.js", "Vue.js", "Tailwind CSS", "HTML5/CSS3"],
    backend: ["Spring Boot", "PostgreSQL", "Convex", "Payload CMS", "WorkOS"],
    devops: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Linux", "Git"],
  };

  return (
    <div className="p-5 md:p-6 rounded border">
      <H2 text1={"Tech"} text2="Stack" />

      <div className="space-y-2 md:space-y-3">
        {Object.entries(tech_stack).map(([category, items]) => (
          <div
            key={category}
            className="flex items-start md:items-center gap-3 group"
          >
            <span className="w-16 md:w-24 shrink-0 text-[10px] md:text-xs py-1 font-medium uppercase text-muted-foreground/80 group-hover:text-primary transition-colors">
              {category}
            </span>

            <div className="flex flex-wrap gap-1.5 border-l pl-3 md:pl-6">
              {items.map((tech) => (
                <Badge key={tech} size={"sm"}>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
