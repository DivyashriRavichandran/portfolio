import { useTranslations } from "next-intl";
import React from "react";

const H1 = ({
  text1,
  text2,
  text3,
  total,
}: {
  text1?: string;
  text2: string;
  text3?: string;
  total?: number;
}) => {
  const t = useTranslations();
  return (
    <div className="flex justify-between items-end mb-6 md:mb-8 border-b pb-2 md:pb-3">
      <h2 className="text-2xl md:text-3xl font-semibold">
        {text1}{" "}
        <span className="text-primary-foreground bg-primary px-1">
          {text2}.
        </span>
      </h2>
      {total && (
        <p className="text-[10px] uppercase font-medium tracking-[0.2em] opacity-40 text-right">
          {total.toString().padStart(2, "0")}{" "}
          {text3 ? text3 : total == 1 ? t("project") : t("projects")}
        </p>
      )}
    </div>
  );
};

export default H1;
