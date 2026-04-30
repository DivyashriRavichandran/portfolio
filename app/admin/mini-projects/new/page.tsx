"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ProjectForm from "../[id]/_component/MiniProjectForm";
import H1 from "@/components/headings/H1";

export default function NewMiniProjectPage() {
  return (
    <main className="min-h-screen md:container md:mx-auto px-5 py-8 ">
      <header className="flex flex-col w-full">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity mb-4 md:mb-10"
        >
          <ChevronLeft size={14} /> Back to Vault
        </Link>
        <H1 text1={"Add New"} text2={"Project"} />
      </header>

      <ProjectForm />
    </main>
  );
}
