"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { useLoading } from "@/components/LoadingProvider";
import PageNavbar from "@/components/layout/PageNavbar";

const BlogDetailsPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const { startLoading, stopLoading } = useLoading();
  const blogs = useQuery(api.blogs.get);
  const blog = useQuery(api.blogs.getBySlug, { slug: slug });

  useEffect(() => {
    if (blog === undefined) {
      startLoading();
    } else {
      stopLoading();
    }

    return () => stopLoading();
  }, [blog, startLoading, stopLoading]);

  if (blog === null) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center font-mono text-muted-foreground">
          Article not found.
        </div>
      </>
    );
  }

  if (blog === undefined || blogs === undefined) {
    return null;
  }

  const activeContent = blog.content.en || "";
  const descriptionContent = blog.description.en;

  const currentIndex = blogs.findIndex((p) => p.slug === slug);
  const nextProject = blogs[(currentIndex + 1) % blogs.length];

  return (
    <>
      <PageNavbar
        nextHref={`/blogs/${nextProject.slug}`}
        nextLabel={nextProject.title.en}
      />
      <article>
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
            {blog.title.en}
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
            className="mt-6 md:mt-10 w-full md:max-w-2xl h-auto mx-auto object-contain max-h-100"
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
