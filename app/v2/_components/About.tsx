"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import H1 from "../../../components/headings/H1";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import H2 from "@/components/headings/H2";
import StackIcon from "tech-stack-icons";
import GithubContributions from "@/components/custom/GithubContributions";

interface AboutProps {
  githubData: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contributions: any[];
    total: number;
  };
}
const About = ({ githubData }: AboutProps) => {
  const about = useQuery(api.about.get);

  return (
    <section className="py-12 md:py-20">
      <H1 text1="About" text2="Me" />

      <div className="flex flex-col gap-10 md:gap-12">
        {/* LEFT SIDE */}
        <div className="flex flex-col space-y-4 md:space-y-6 md:text-xl">
          <p>
            Hi! I’m Divyashri, a 22-year-old Software Engineer and Computing
            Science Master’s student at the University of Groningen (RUG).
          </p>
          <p>
            I love building websites and tools that solve real-world problems.
            With over 2 years of professional frontend experience, I’ve also
            expanded into full-stack development, cloud computing and system
            design.
          </p>
          <p>
            At RUG, I specialize in Software Engineering and Distributed Systems
            (SEDS), exploring how to architect high-quality, software-intensive
            systems that remain reliable at scale.
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

        <div className="border space-y-8 rounded px-6 py-8 bg-muted/5">
          <div className="w-full flex flex-col">
            <H2 text1={"Github"} text2="Contributions" />

            <div className="mx-auto">
              <GithubContributions githubData={githubData.contributions} />
            </div>
          </div>
          <TechStackSection />
        </div>
      </div>
    </section>
  );
};

export default About;

const TechStackSection = () => {
  const tech_stack = {
    languages: [
      { key: "typescript", label: "TypeScript" },
      { key: "js", label: "JavaScript" },
      { key: "java", label: "Java" },
      { key: "python", label: "Python" },
      { key: "html5", label: "HTML5" },
      { key: "css3", label: "CSS3" },
    ],
    frameworks: [
      { key: "nextjs", label: "Next.js" },
      { key: "reactjs", label: "React.js" },
      { key: "vuejs", label: "Vue.js" },
      { key: "spring", label: "Spring Boot" },
      { key: "tailwindcss", label: "Tailwind" },
    ],
    database: [
      { key: "postgresql", label: "PostgreSQL" },
      { key: "convex", label: "Convex" },
      { key: "payload", label: "Payload" },
    ],
    devops: [
      { key: "docker", label: "Docker" },
      { key: "kubernetes", label: "Kubernetes" },
      { key: "aws", label: "AWS" },
      { key: "github", label: "Github Actions" },
      { key: "linux", label: "Linux" },
    ],
  };

  return (
    <div>
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
                <Badge key={tech.key} className="normal-case font-normal">
                  <StackIcon
                    name={tech.key}
                    className="size-4"
                    variant="dark"
                  />
                  {tech.label}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
