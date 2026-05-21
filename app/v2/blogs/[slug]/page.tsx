"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import Navbar from "../../_components/Navbar";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { useLoading } from "@/components/custom/LoadingProvider";

const BlogDetailsPage = () => {
  const locale = useLocale() as "en" | "nl";
  const params = useParams();
  const slug = params.slug as string;

  const { startLoading, stopLoading } = useLoading();
  const blog = useQuery(api.blogs.getBySlug, { slug: slug });

  // Connect Convex status to your global loader
  useEffect(() => {
    if (blog === undefined) {
      startLoading();
    } else {
      stopLoading();
    }

    // Cleanup function if user navigates away mid-stream
    return () => stopLoading();
  }, [blog, startLoading, stopLoading]);

  // If the query finished execution and returned null, it truly doesn't exist
  if (blog === null) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center font-mono text-muted-foreground">
          Article not found.
        </div>
      </>
    );
  }

  // If blog is undefined, return null because the LoadingProvider overlay is handling visual UI
  if (blog === undefined) {
    return null;
  }
  const activeContent = blog.content[locale] || blog.content.en || "";
  const descriptionContent = blog.description[locale];

  return (
    <>
      <Navbar />
      <article className="md:max-w-3xl md:mx-auto px-5 lg:px-0 pt-8 md:pt-10 pb-16">
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

          <div
            className="mt-4 md:mt-8 prose-custom 
            prose-strong:text-primary"
          >
            <ReactMarkdown>{descriptionContent}</ReactMarkdown>
          </div>
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
        <div className="mt-10 md:mt-16 max-w-none prose-custom">
          <ReactMarkdown>{activeContent}</ReactMarkdown>
        </div>
      </article>
    </>
  );
};

export default BlogDetailsPage;
