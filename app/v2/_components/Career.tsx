"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import H1 from "../../../components/headings/H1";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { format, formatDuration, intervalToDuration } from "date-fns";
import H4 from "@/components/headings/H4";

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
    <section className="space-y-16 md:space-y-20">
      {/* EDUCATION */}
      <div className="flex flex-col">
        <H1 text2={t("education")} />

        <div className="space-y-10">
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
      <div className="flex flex-col">
        <H1 text2={t("experience")} />

        <div className="space-y-10">
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

  const getDuration = (start: string, end?: string) => {
    if (!start) return "";

    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();

    // Calculate the raw duration object
    const duration = intervalToDuration({
      start: startDate,
      end: endDate,
    });

    // Format it into a string
    return formatDuration(duration, {
      format: ["years", "months"],
    });
  };

  return (
    <div className="flex gap-5 md:gap-8 group">
      {/* LOGO */}
      <div className="shrink-0">
        {logoUrl && (
          <div className="relative size-12 md:size-14 overflow-hidden border flex items-center justify-center">
            <Image src={logoUrl} alt="" fill className="object-contain" />
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        {/* TITLE */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-1">
          <h3 className="text-lg md:text-xl lg:text-2xl font-medium tracking-tight">
            {title}
          </h3>

          <span className="text-xs md:text-sm uppercase font-medium tracking-wide">
            {format(item.startDate, "MMM yyyy")} -{" "}
            {item.endDate ? format(item.endDate, "MMM yyyy") : "Present"}
          </span>
        </div>

        {/* ORG */}
        <div className="mt-1 md:mt-0 flex items-center justify-between gap-1 text-muted-foreground text-sm md:text-base">
          <a
            href={item.url}
            target="_blank"
            className=" hover:underline underline-offset-2"
          >
            {org}
          </a>
          {location && <p>{location}</p>}
        </div>

        {/* GRADE / CATEGORY */}
        <div className="mt-4 flex gap-2 flex-wrap">
          {item.category && <Badge variant={"primary"}>{item.category}</Badge>}
          {item.grade && <Badge variant={"outline"}>{item.grade}</Badge>}
          {item.type == "experience" && (
            <Badge variant={"outline"}>
              {getDuration(item.startDate, item.endDate)}
            </Badge>
          )}
        </div>

        {/* TAGS */}
        {item.tags!.length > 0 && (
          <div className="mt-3 md:mt-5 flex flex-wrap gap-2 items-center">
            <p className="text-muted-foreground font-semibold uppercase tracking-widest text-xs">
              {item.type == "education" ? "Modules" : "Tech Stack"}:
            </p>
            {item.tags!.map((tag: string) => (
              <span
                key={tag}
                className="text-[10px] md:text-xs font-mono text-muted-foreground/80 bg-muted/30 px-2 py-0.5 border border-muted-foreground/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* PROJECTS / ACHIEVEMENTS */}
        {item.achievements![locale]?.length > 0 && (
          <div>
            <H4>
              {item.type == "education" ? "Notable Projects" : "Contributions"}
            </H4>
            <ul className="mt-2 space-y-1 md:space-y-2">
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
          </div>
        )}

        {/* WEBSITES */}
        {item.websites && item.websites.length > 0 && (
          <div className="mt-6 md:mt-8">
            <H4>Featured Projects </H4>
            <div className="mt-3 flex flex-wrap gap-3">
              {item.websites.map((url: string) => {
                // Clean up URL for display
                const displayUrl = url
                  .replace(/^https?:\/\//, "")
                  .replace(/^www\./, "")
                  .replace(/\/$/, "");

                return (
                  <Badge key={url} variant="outline" size="sm" asChild>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {displayUrl}
                      <ArrowUpRight />
                    </a>
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
