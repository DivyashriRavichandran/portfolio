"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

import Link from "next/link";
import H1 from "@/components/headings/H1";
import CareerForm from "./_component/CareerForm";

export default function EditCareerPage() {
  const params = useParams();
  const careerId = params.id as Id<"career">;

  const career = useQuery(api.career.getById, { id: careerId });

  if (career === undefined) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (career === null) return <div>Entry not found</div>;

  return (
    <main className="min-h-screen md:container md:mx-auto px-5 py-8">
      <header className="flex flex-col w-full">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity mb-4 md:mb-10"
        >
          <ChevronLeft size={14} /> Back to Vault
        </Link>

        <H1 text1={"Edit Career Entry"} text2={career.title.en} />
      </header>

      <CareerForm initialData={career} />
    </main>
  );
}
