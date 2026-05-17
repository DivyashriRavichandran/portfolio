"use client";
import React from "react";
import Image from "next/image";
import H1 from "../../../components/headings/H1";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";

const BlogsSection = () => {
  const locale = useLocale() as "en" | "nl";
  const blogs = useQuery(api.blogs.get);

  if (!blogs) {
    return null;
  }

  return (
    <section className="py-10">
      <H1 text1={"My"} text2={"Blogs"} total={blogs.length} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {blogs.map((project) => (
          <a
            key={project._id}
            href={`/v2/blogs/${project.slug}`}
            className="group flex flex-col items-center rounded border bg-muted/30 p-4 gap-4 hover:border-foreground dark:hover:border-primary transition-all duration-300"
          >
            {/* IMAGE */}
            <div className="flex w-full h-40 md:h-48 rounded relative">
              <Image
                src={project.imageUrl ?? ""}
                alt={project.title.en}
                width={500}
                height={500}
                className="object-cover rounded"
              />
              {/* DESKTOP ONLY */}
              <div className="flex absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center backdrop-blur-[2px]">
                <div className="size-14 rounded-full bg-primary text-background flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_20px_rgba(var(--primary),0.5)]">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex flex-col gap-2">
              <h3 className="text-sm md:text-lg leading-tight font-medium">
                {project.title[locale]}
              </h3>

              <p className="text-xs md:text-sm text-muted-foreground whitespace-pre-line">
                {project.description[locale]?.split("\n")[0]}
              </p>

              {/* TAGS */}
              <div className="mt-1 flex flex-wrap gap-x-2">
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
