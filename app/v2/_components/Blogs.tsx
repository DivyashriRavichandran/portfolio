"use client";
import React from "react";
import Image from "next/image";
import H1 from "../../../components/headings/H1";
import { ExternalLink } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useLocale } from "next-intl";

const blogs = [
  {
    title: "Why Can't My Database Do It All?",
    description:
      "An intuitive, beginner-friendly guide to the CAP Theorem. Discover why a distributed system can never simultaneously give you absolute consistency and constant availability.",
    url: "https://dev.to/yourusername/why-cant-my-database-do-it-all-cap-theorem-explained",
    imageUrl: "/blog1.png",
    tags: ["distributed-systems", "databases", "architecture"],
  },
  {
    title: "The Fallacy of Time in Distributed Systems",
    description:
      "Why server clocks lie and how relying on system time can corrupt your data. A 5-minute introduction to logical clocks and handling time in networks.",
    url: "https://dev.to/yourusername/the-fallacy-of-time-in-distributed-systems",
    imageUrl: "/blog2.png",
    tags: ["distributed-systems", "backend", "clocks"],
  },
];

const BlogsSection = () => {
  const locale = useLocale() as "en" | "nl";
  if (!blogs) {
    return null;
  }

  return (
    <section className="pb-10">
      <H1 text1={"My"} text2={"Blogs"} total={blogs.length} />

      <div className="grid grid-cols-1 gap-3 md:gap-4">
        {blogs.map((project) => (
          <a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex md:items-center overflow-hidden rounded border bg-muted/10 px-3 md:px-5 py-4 hover:border-foreground dark:hover:border-primary transition-all duration-300"
          >
            {/* LOGO CONTAINER */}
            <div className="flex size-16 md:size-20 shrink-0 items-center justify-center rounded border bg-black">
              <Image
                src={project.imageUrl ?? ""}
                alt={project.title}
                width={100}
                height={100}
                className="object-cover scale-120 rounded"
              />
            </div>

            {/* CONTENT SECTION */}
            <div className="ml-4 md:ml-6 flex flex-1 flex-col overflow-hidden">
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate text-sm md:text-base font-medium">
                  {project.title}
                </h3>
                <ExternalLink className="size-4 md:size-5 group-hover:text-foreground dark:group-hover:text-primary" />
              </div>

              <p className="mt-0.5 md:mt-2 text-xs md:text-sm text-muted-foreground md:max-w-xl">
                {project.description}
              </p>

              {/* TAGS */}
              <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                {project.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/80"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default BlogsSection;
