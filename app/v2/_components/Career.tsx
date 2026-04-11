"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import Heading from "./Heading";
import { Loader2 } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { format } from "date-fns";

const CareerSection = () => {
  const t = useTranslations();
  const locale = useLocale() as "en" | "nl";

  const careers = useQuery(api.career.list);

  if (!careers) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin opacity-50" />
      </div>
    );
  }

  const grouped = {
    education: careers.filter((c) => c.type === "education"),
    experience: careers.filter((c) => c.type === "experience"),
  };

  return (
    <section className="px-5 md:container md:mx-auto space-y-20 mt-10 mb-10 md:mb-20">
      {/* EDUCATION */}
      <div className="flex flex-col lg:flex-row lg:gap-24">
        <div className="lg:w-1/4">
          <Heading text2={t("education")} />
        </div>

        <div className="flex-1 space-y-10">
          {grouped.education.map((item, index) => (
            <CareerItem
              key={item._id}
              item={item}
              locale={locale}
              isLast={index === grouped.education.length - 1}
              logoUrl={item.logoUrl ?? ""}
            />
          ))}
        </div>
      </div>

      {/* EXPERIENCE */}
      <div className="flex flex-col lg:flex-row lg:gap-24">
        <div className="lg:w-1/4">
          <Heading text2={t("experience")} />
        </div>

        <div className="flex-1 space-y-10 md:space-y-16">
          {grouped.experience.map((item, index) => (
            <CareerItem
              key={item._id}
              item={item}
              locale={locale}
              isLast={index === grouped.experience.length - 1}
              logoUrl={item.logoUrl ?? ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerSection;

type CareerItemProps = {
  item: Doc<"career">;
  locale: "en" | "nl";
  isLast: boolean;
  logoUrl?: string;
};

const CareerItem = ({ item, locale, logoUrl }: CareerItemProps) => {
  const title = item.title?.[locale];
  const org = item.organization?.[locale];
  const location = item.location?.[locale];

  if (!item) {
    return <div>Item not found</div>;
  }

  function formatMonthYear(value: string) {
    const [month, year] = value.split("-");
    const date = new Date(Number(year), Number(month) - 1);

    return format(date, "MMM yyyy");
  }

  return (
    <div className="flex gap-5 md:gap-8 group">
      {/* LOGO */}
      <div className="shrink-0">
        {logoUrl && (
          <div className="bg-white relative size-12 md:size-14 overflow-hidden border flex items-center justify-center">
            <Image src={logoUrl} alt="" fill className="object-contain" />
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        {/* TITLE */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
          <h3 className="text-lg md:text-xl lg:text-2xl font-medium tracking-tight">
            {title}
          </h3>

          <span className="text-[10px] md:text-xs uppercase font-medium tracking-wide">
            {formatMonthYear(item.startDate)} -{" "}
            {item.endDate ? formatMonthYear(item.endDate) : "Present"}
          </span>
        </div>

        {/* ORG */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 text-muted-foreground">
          <a
            href={item.url}
            target="_blank"
            className="text-sm md:text-base hover:underline underline-offset-2"
          >
            {org}
          </a>
          {location && <p className="text-xs md:text-sm">{location}</p>}
        </div>

        {/* GRADE / CATEGORY */}
        <div className="mt-2 md:mt-4 flex gap-2 flex-wrap">
          {item.category && <Badge variant={"outline"}>{item.category}</Badge>}
          {item.grade && <Badge variant={"primary"}>{item.grade}</Badge>}
        </div>

        {/* ACHIEVEMENTS */}
        {item.achievements![locale]?.length > 0 && (
          <ul className="mt-4 space-y-2">
            {item.achievements![locale].map((a: string, i: number) => (
              <li
                key={i}
                className="text-sm md:text-base flex gap-2 text-muted-foreground"
              >
                <span className="mt-2 size-1 bg-foreground/60 rounded-full" />
                {a}
              </li>
            ))}
          </ul>
        )}

        {/* TAGS */}
        {item.tags!.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {item.tags!.map((tag: string) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
