"use client";
import React from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import H1 from "../headings/H1";

const BlogsSection = () => {
  const t = useTranslations();
  const blogs = useQuery(api.blogs.get);

  if (!blogs) {
    return null;
  }

  return (
    <section className="py-6 md:py-10">
      <H1
        text1={t("my")}
        text2={t("blogs")}
        total={blogs.length}
        text3={"Blogs"}
      />

      <div className="flex flex-col gap-4 md:gap-6 divide-y">
        {blogs.map((project) => (
          <a
            key={project._id}
            href={`/blogs/${project.slug}`}
            className="group block relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-1 md:gap-10 items-start pb-4 md:pb-6">
              {/* 1. DATE COLUMN */}
              {project.publishedAt && (
                <span className="text-[10px] md:text-xs text-muted-foreground md:pt-1 group-hover:text-primary transition">
                  {format(project.publishedAt, "PPP")}
                </span>
              )}

              {/* 2. CONTENT COLUMN */}
              <div className="space-y-2">
                <h3 className="text-base md:text-lg font-medium text-foreground group-hover:underline underline-offset-4 decoration-1 transition leading-snug">
                  {project.title.en}
                  <span className="inline-block whitespace-nowrap ml-1.5">
                    <ArrowUpRight className="text-muted-foreground size-4 group-hover:text-foreground transition inline" />
                  </span>
                </h3>

                {/* DESCRIPTION */}
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mt-1 max-w-xl">
                  {project.description.en?.split("\n")[0]}
                </p>

                {/* COMPACT INLINE TAGS */}
                {project.tags && project.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] md:text-xs text-muted-foreground/70">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="flex items-center gap-x-2">
                        <span>#{tag}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default BlogsSection;
