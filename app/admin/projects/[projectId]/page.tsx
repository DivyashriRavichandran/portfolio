"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import ProjectForm from "./_component/ProjectForm";
import Link from "next/link";
import Heading from "@/app/v2/_components/Heading";

export default function EditProjectPage() {
  const params = useParams();
  const projectId = params.projectId as Id<"projects">;

  // 1. Fetch the project data
  const project = useQuery(api.projects.getById, { id: projectId });

  if (project === undefined) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (project === null) return <div>Project not found</div>;

  return (
    <main className="min-h-screen md:container md:mx-auto px-5 py-8 ">
      <header className="flex flex-col w-full">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity mb-4 md:mb-10"
        >
          <ChevronLeft size={14} /> Back to Vault
        </Link>
        <Heading text1={"Edit Project"} text2={project.title.en} />
      </header>

      <ProjectForm initialData={project} />
    </main>
  );
}
