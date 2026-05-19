"use client";
import React from "react";
import Image from "next/image";
import H1 from "../../../components/headings/H1";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

const BlogsSection = () => {
  const t = useTranslations();
  const locale = useLocale() as "en" | "nl";
  const blogs = useQuery(api.blogs.get);

  if (!blogs) {
    return null;
  }

  return (
    <section className="py-10">
      <H1
        text1={t("my")}
        text2={t("blogs")}
        total={blogs.length}
        text3={"Blogs"}
      />

      <div className="grid grid-cols-1 gap-3">
        {blogs.map((project) => (
          <a
            key={project._id}
            href={`/v2/blogs/${project.slug}`}
            className="group flex items-start rounded border bg-muted/30 p-3 md:p-4 gap-3 md:gap-4 hover:border-foreground dark:hover:border-primary transition-all duration-300"
          >
            <div className="flex w-full sm:w-28 h-32 sm:h-24 shrink-0 rounded relative overflow-hidden">
              <Image
                src={project.imageUrl ?? ""}
                alt={project.title.en}
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
              {/* DESKTOP HOVER OVERLAY */}
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                <div className="size-8 rounded-full bg-primary text-background flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex flex-col justify-between h-full min-w-0">
              <div>
                <h3 className="text-sm md:text-base font-medium leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                  {project.title[locale]}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mt-1">
                  {project.description[locale]?.split("\n")[0]}
                </p>
              </div>

              {/* TAGS */}
              <div className="mt-2 flex flex-wrap gap-x-1.5 gap-y-0.5">
                {project.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] md:text-xs font-medium text-muted-foreground/70"
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
