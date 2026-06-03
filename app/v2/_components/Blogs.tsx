"use client";
import React from "react";
import Image from "next/image";
import H1 from "../../../components/headings/H1";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";

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

      <div className="grid grid-cols-1 gap-4">
        {blogs.map((project) => (
          <a
            key={project._id}
            href={`/v2/blogs/${project.slug}`}
            className="group grid grid-cols-1 md:grid-cols-[150px_1fr] gap-3 md:gap-4 rounded border bg-muted p-3 md:p-4 hover:border-primary transition-all duration-200 ease-out"
          >
            {/* COMPACT IMAGE CONTAINER */}
            <div className="relative w-full shrink-0">
              <Image
                src={project.imageUrl ?? ""}
                alt={project.title.en}
                width={400}
                height={400}
                className="object-cover w-full h-full border"
              />
              {/* DESKTOP ONLY */}
              <div className="hidden md:flex absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center backdrop-blur-[2px]">
                <div className="size-12 rounded-full bg-primary text-background flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>

            {/* METADATA & CONTENT */}
            <div className="flex flex-col min-w-0 justify-center">
              {/* DATE */}
              <div className="flex justify-between items-center">
                {project.publishedAt && (
                  <span className="text-[10px] md:text-xs text-muted-foreground">
                    {format(project.publishedAt, "MMM dd, yyyy")}
                  </span>
                )}
                {/* MOBILE ONLY ICON */}
                <ArrowUpRight
                  size={16}
                  className="md:hidden text-muted-foreground shrink-0"
                />
              </div>

              {/* TITLE */}
              <h3 className="text-sm md:text-base font-medium leading-snug group-hover:underline underline-offset-2 mt-0.5">
                {project.title.en}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mt-1">
                {project.description.en?.split("\n")[0]}
              </p>

              {/* COMPACT INLINE TAGS */}
              {project.tags && project.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] md:text-xs text-muted-foreground">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="flex items-center gap-x-2">
                      <span>#{tag}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default BlogsSection;
