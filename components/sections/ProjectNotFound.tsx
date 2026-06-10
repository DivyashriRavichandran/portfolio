"use client";

import Link from "next/link";
import { ChevronLeft, Terminal } from "lucide-react";

export default function ProjectNotFound() {
  return (
    <div className="h-screen w-full flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Terminal size={14} />
            <span className="text-xs uppercase tracking-[0.3em]">
              Status: 404
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tighter uppercase">
            Not Found
          </h1>
        </div>

        {/* Description */}
        <div className="border-l border-border pl-6 space-y-4">
          <p className="text-sm leading-relaxed">
            The requested project identifier does not exist in the database or
            has been moved.
          </p>
          <p className="text-[10px] uppercase tracking-widest">
            Error: OBJECT_NULL_REFERENCE
          </p>
        </div>

        {/* Redirect */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 border border-border px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-foreground hover:text-background transition-all"
          >
            <ChevronLeft size={14} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
