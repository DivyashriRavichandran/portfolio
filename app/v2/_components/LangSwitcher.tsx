"use client";
import React from "react";

import { useLocale } from "next-intl";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const LangSwitcher = ({ className }: { className?: string }) => {
  const locale = useLocale();

  const handleOnLocaleChange = (newLocale: string) => {
    Cookies.set("locale", newLocale);
    window.location.reload();
  };
  return (
    <button
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-full bg-[#d0fe38] text-black transition-all duration-300 group",
        className,
      )}
      onClick={() => handleOnLocaleChange(locale == "nl" ? "en" : "nl")}
    >
      {locale == "en" ? (
        <>
          NL
          <Image src="/nl-flag.png" alt="Dutch Flag" width={20} height={20} />
        </>
      ) : (
        <>
          EN
          <Image src="/uk-flag.png" alt="UK Flag" width={20} height={20} />
        </>
      )}
    </button>
  );
};

export default LangSwitcher;
