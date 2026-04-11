"use client";
import React from "react";

import { useLocale } from "next-intl";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const LangSwitcher = ({ className }: { className?: string }) => {
  const locale = useLocale();

  const handleOnLocaleChange = (newLocale: string) => {
    Cookies.set("locale", newLocale);
    window.location.reload();
  };

  return (
    <Button
      variant={"outline"}
      className={cn(" gap-3 px-3 py-1 md:px-4 md:py-2", className)}
      onClick={() => handleOnLocaleChange(locale == "nl" ? "en" : "nl")}
    >
      {locale == "en" ? (
        <>
          NL
          <span className="hidden md:block">
            <Image src="/nl-flag.png" alt="NL Flag" width={20} height={20} />
          </span>
        </>
      ) : (
        <>
          EN
          <span className="hidden md:block">
            <Image src="/uk-flag.png" alt="UK Flag" width={20} height={20} />
          </span>
        </>
      )}
    </Button>
  );
};

export default LangSwitcher;
