"use client";
import React from "react";

import { useLocale } from "next-intl";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";

const LangSwitcher = ({ className }: { className?: string }) => {
  const locale = useLocale();

  const handleOnLocaleChange = (newLocale: string) => {
    Cookies.set("locale", newLocale);
    window.location.reload();
  };

  return (
    <button
      className={cn(
        "px-1 md:px-2 font-medium text-sm md:text-lg underline-offset-2 hover:underline cursor-pointer",
        className,
      )}
      onClick={() => handleOnLocaleChange(locale == "nl" ? "en" : "nl")}
    >
      {locale == "en" ? "nl" : "en"}
    </button>
  );
};

export default LangSwitcher;
