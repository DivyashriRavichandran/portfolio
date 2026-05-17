"use client";

import { useParams } from "next/navigation";
import React from "react";
import Navbar from "../../_components/Navbar";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { format } from "date-fns";

const BlogDetailsPage = () => {
  const locale = useLocale() as "en" | "nl";
  const params = useParams();
  const slug = params.slug as string;
  const blog = useQuery(api.blogs.getBySlug, { slug: slug });

  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center font-mono text-muted-foreground">
          Article not found.
        </div>
      </>
    );
  }

  const activeContent = blog.content[locale] || blog.content.en || "";

  return (
    <>
      <Navbar />
      <article className="md:max-w-3xl md:mx-auto px-5 lg:px-0 pt-20 md:pt-28 pb-10">
        {/* Header Section */}
        <header>
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-1 bg-muted text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="mt-4 md:mt-6 text-xl md:text-3xl font-semibold">
            {blog.title[locale]}
          </h1>

          <div className="mt-1 flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
            {blog.publishedAt && <span>{format(blog.publishedAt, "PPP")}</span>}
            • <span>{blog.timeToRead} min read</span>
          </div>

          <p className="mt-4 md:mt-8 text-sm md:text-lg text-muted-foreground whitespace-pre-line">
            {blog.description[locale]}
          </p>
        </header>

        {/* Cover Image */}
        {blog.coverImageUrl && (
          <Image
            src={blog.coverImageUrl}
            alt={blog.title.en}
            className="mt-6 md:mt-10 w-full md:max-w-2xl h-auto mx-auto object-cover max-h-100"
            width={500}
            height={300}
            priority
          />
        )}

        {/* Main Content Body */}
        <div
          className="mt-10 md:mt-16 max-w-none prose
          prose-headings:text-foreground prose-headings:font-medium prose-headings:text-lg md:prose-headings:text-xl
          prose-p:text-muted-foreground prose-p:text-sm md:prose-p:text-base prose-p:leading-relaxed
          prose-strong:text-muted-foreground prose-strong:font-medium
          prose-table:border
          prose-tr:text-center
          prose-tr:border-b-foreground/30
          prose-td:text-muted-foreground prose-td:border-b
          prose-td:first:font-medium prose-td:first:text-foreground prose-td:first:border-r"
          dangerouslySetInnerHTML={{ __html: activeContent }}
        />
      </article>
    </>
  );
};

export default BlogDetailsPage;
