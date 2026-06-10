"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="text-[10px] md:text-xs max-w-3xl md:mx-auto mx-5 mt-12 md:mt-20 pt-2 md:pt-4 pb-6 md:pb-10 border-t text-muted-foreground">
      <div className="flex justify-between items-baseline gap-4">
        <p>© 2026 Divyashri&apos;s Portfolio. {t("all-rights-reserved")}</p>
        <div className="flex items-baseline gap-1 md:gap-2">
          <span>{t("go-to-top")}</span>
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
      </div>
    </footer>
  );
};

export default Footer;
