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
    <Button
      variant={"secondary"}
      className={cn("gap-2", className)}
      onClick={() => handleOnLocaleChange(locale == "nl" ? "en" : "nl")}
    >
      {locale == "en" ? (
        <>
          <Image src="/nl-flag.png" alt="Dutch Flag" width={20} height={20} />
          NL
        </>
      ) : (
        <>
          <Image src="/uk-flag.png" alt="UK Flag" width={20} height={20} />
          EN
        </>
      )}
    </Button>
  );
};

export default LangSwitcher;
