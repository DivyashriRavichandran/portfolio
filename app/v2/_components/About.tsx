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
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import { useLoading } from "@/components/custom/LoadingProvider";
import { useEffect } from "react";

interface AboutProps {
  githubData: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contributions: any[];
    total: number;
  };
}
const About = ({ githubData }: AboutProps) => {
  const locale = useLocale();
  const t = useTranslations();
  const { startLoading, stopLoading } = useLoading();
  const about = useQuery(api.about.get);

  useEffect(() => {
    if (about === undefined) {
      startLoading();
    } else {
      stopLoading();
    }

    return () => stopLoading();
  }, [about, startLoading, stopLoading]);

  const bio = about?.bio?.[locale as "en" | "nl"] ?? "";

  return (
    <section className="mt-8 py-6 md:py-10">
      <H1 text1={t("about")} text2={t("me")} />

      <div className="flex flex-col gap-10 md:gap-12">
        <div className="flex flex-col space-y-4 md:space-y-6 md:text-xl">
          <div className="whitespace-pre-line">{bio}</div>

          {/* Languages */}
          <div>
            {t("i-speak-english")}
            <span className="text-muted-foreground text-sm md:text-base ml-0.5">
              (C2)
            </span>
            , {t("dutch")}
            <span className="text-muted-foreground text-sm md:text-base ml-0.5">
              (A2+)
            </span>
            , {t("and-tamil")}
            <span className="text-muted-foreground text-sm md:text-base ml-0.5">
              {t("native")}
            </span>
            .
          </div>

          {/* About me link */}
          <Link
            href="/v2/about"
            className="flex items-center gap-1 md:gap-1.5 group ml-auto"
          >
            <span className="text-sm md:text-base transition-all duration-300 decoration-1 decoration-border hover:decoration-primary hover:text-primary underline underline-offset-4">
              {t("more-about-me")}
            </span>

            <ArrowUpRight
              size={16}
              className="text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary transition"
            />
          </Link>
        </div>

        <div className="border space-y-8 rounded px-4 md:px-6 py-6 md:py-8 bg-muted/5">
          <div className="w-full flex flex-col">
            <H2 text1={"Github"} text2={t("contributions")} />

            <div className="mx-auto scroll-auto w-full max-w-3xl">
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
      { key: "react", label: "React.js" },
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

  const theme = useTheme();
  console.log(theme);

  return (
    <>
      <H2 text1={"Tech"} text2="Stack" />

      <div className="flex flex-wrap items-center gap-x-2 gap-y-2 md:gap-y-3">
        {Object.values(tech_stack)
          .flat()
          .map((tech) => (
            <Badge
              key={tech.key}
              className="normal-case font-normal flex items-center gap-1"
            >
              <StackIcon name={tech.key} className="size-4" variant="dark" />
              <span>{tech.label}</span>
            </Badge>
          ))}
      </div>
    </>
  );
};
