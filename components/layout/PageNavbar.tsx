import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import Link from "next/link";

interface SubNavigationProps {
  nextLabel?: string;
  nextHref?: string;
}

const PageNavbar = ({ nextLabel, nextHref }: SubNavigationProps) => {
  return (
    <div className="mb-8 md:mb-10 flex w-full justify-between items-center text-xs text-muted-foreground">
      {/* Back Link */}
      <Link
        href={"/"}
        className="group flex items-center gap-2 hover:text-foreground transition-colors"
      >
        <ArrowLeft
          size={16}
          className="transition-transform group-hover:-translate-x-0.5"
        />
        <span>Portfolio</span>
      </Link>

      {/* Next Link */}
      {nextHref ? (
        <Link
          href={nextHref}
          className="group flex items-center gap-2 hover:text-foreground transition-colors text-right"
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-foreground font-medium">
              Next Post
            </span>
            <span className="max-w-50 truncate">{nextLabel}</span>
          </div>
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};

export default PageNavbar;
