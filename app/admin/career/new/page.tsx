"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import Heading from "@/app/v2/_components/Heading";
import CareerForm from "../[id]/_component/CareerForm";

export default function NewCareerPage() {
  return (
    <main className="min-h-screen md:container md:mx-auto px-5 py-8">
      <header className="flex flex-col w-full">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity mb-4 md:mb-10"
        >
          <ChevronLeft size={14} /> Back to Vault
        </Link>

        <Heading text1={"Add New"} text2={"Career Entry"} />
      </header>

      <CareerForm />
    </main>
  );
}
