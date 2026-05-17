"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import H1 from "@/components/headings/H1";
import { Id } from "@/convex/_generated/dataModel";
import BlogForm from "./_component/BlogForm";

export default function EditBlogPage() {
  const params = useParams();
  const blogId = params.id as Id<"blogs">;

  const blog = useQuery(api.blogs.getById, { id: blogId });

  if (blog === undefined) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (blog === null) {
    return (
      <div className="py-20 text-center uppercase tracking-widest opacity-50">
        Blog not found
      </div>
    );
  }

  return (
    <main className="min-h-screen md:container md:mx-auto px-5 py-8">
      <header className="flex flex-col w-full">
        <Link
          href="/admin/blogs"
          className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity mb-4 md:mb-10"
        >
          <ChevronLeft size={14} /> Back to Vault
        </Link>
        <H1 text1={"Edit Blog"} text2={blog.title.en} />
      </header>

      <BlogForm initialData={blog} />
    </main>
  );
}
