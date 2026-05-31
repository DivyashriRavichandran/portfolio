"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="text-[10px] md:text-xs max-w-3xl md:mx-auto mx-5 lg:mx-0 mt-12 md:mt-20 pt-2 md:pt-4 pb-6 md:pb-10 border-t flex justify-between items-baseline gap-4 text-muted-foreground">
      <p>© 2026 Divyashri&apos;s Portfolio. All Rights Reserved.</p>
      <div className="flex items-baseline gap-2">
        <span>Go to top</span>
        <Button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          size={"icon"}
          variant={"outline"}
          className="rounded-full"
        >
          <ArrowUpIcon />
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
