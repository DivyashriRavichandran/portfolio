"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import H1 from "@/components/headings/H1";
import { Id } from "@/convex/_generated/dataModel";
import MiniProjectForm from "./_component/MiniProjectForm";

export default function EditMiniProjectPage() {
  const params = useParams();

  // The dynamic route segment should match your folder name, e.g., [id]
  const projectId = params.id as Id<"mini_projects">;

  // 1. Fetch the project data using the corrected query name
  const mini_project = useQuery(api.mini_projects.getById, { id: projectId });

  if (mini_project === undefined) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (mini_project === null) {
    return (
      <div className="py-20 text-center uppercase tracking-widest opacity-50">
        Project not found
      </div>
    );
  }

  return (
    <main className="min-h-screen md:container md:mx-auto px-5 py-8">
      <header className="flex flex-col w-full">
        <Link
          href="/admin/mini-projects"
          className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity mb-4 md:mb-10"
        >
          <ChevronLeft size={14} /> Back to Vault
        </Link>
        <H1 text1={"Edit Mini Project"} text2={mini_project.title.en} />
      </header>

      <MiniProjectForm initialData={mini_project} />
    </main>
  );
}
