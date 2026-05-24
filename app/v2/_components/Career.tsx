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
import {
  addDays,
  format,
  formatDuration,
  intervalToDuration,
  isValid,
} from "date-fns";
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
    <section className="py-6 md:py-10 space-y-12 md:space-y-20">
      {/* EDUCATION */}
      <div className="flex flex-col">
        <H1 text1={t("academic")} text2={t("education")} />

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
        <H1 text1={t("professional")} text2={t("experience")} />

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
  if (!item) {
    return <div>Item not found</div>;
  }

  const title = item.title?.[locale];

  // Helper to format dates
  const displayDate = (
    dateString: string | null | undefined,
    fallback: string,
  ) => {
    if (!dateString) return fallback;
    const d = new Date(dateString);
    return isValid(d) ? format(d, "MMM yyyy") : fallback;
  };

  const getDuration = (
    start: string | null | undefined,
    end?: string | null,
  ) => {
    if (!start) return "";
    const startDate = new Date(start);

    const endDate = end ? addDays(new Date(end), 1) : new Date();

    if (!isValid(startDate) || !isValid(endDate)) return "";

    try {
      const duration = intervalToDuration({ start: startDate, end: endDate });

      return formatDuration(duration, { format: ["years", "months"] });
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  return (
    <div className="group">
      <div className="flex gap-3 md:gap-5">
        {/* LOGO */}
        <div className="mt-1 shrink-0">
          {logoUrl && (
            <div className="relative size-12 md:size-16 overflow-hidden border flex items-center justify-center">
              <Image src={logoUrl} alt="" fill className="object-contain" />
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          {/* TITLE */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <h3 className="text-lg md:text-2xl font-medium">{title}</h3>

            {/* DATE */}
            <span className="text-muted-foreground text-xs md:text-sm">
              {displayDate(item.startDate, "N/A")} —{" "}
              {item.endDate ? displayDate(item.endDate, "Present") : "Present"}
            </span>
          </div>

          {/* DETAILS */}
          <div className="mt-1 text-xs md:text-sm">
            <div className="flex gap-1">
              <a
                href={item.url}
                target="_blank"
                className=" hover:underline underline-offset-2"
              >
                {item.organization && item.organization[locale]}
              </a>
              <span className="">•</span>
              {item.location && item.location[locale]}
            </div>
          </div>

          {/* GRADE / CATEGORY */}
          <div className="mt-3 md:mt-4 flex gap-2 flex-wrap">
            {item.category && (
              <Badge variant={"primary"} size="lg">
                {item.category}
              </Badge>
            )}
            {item.grade && (
              <Badge variant={"outline"} size="lg">
                {item.grade}
              </Badge>
            )}
            {item.type == "experience" && (
              <Badge variant={"outline"} size="lg">
                {getDuration(item.startDate, item.endDate)}
              </Badge>
            )}
          </div>

          <div className="hidden md:block">
            {/* CONTRIBUTIONS */}
            {item.achievements![locale]?.length > 0 && (
              <div>
                <H4>Contributions</H4>
                <ul className="mt-2 space-y-1 md:space-y-2">
                  {item.achievements![locale].map((a: string, i: number) => (
                    <li
                      key={i}
                      className="text-sm md:text-base flex gap-2 text-muted-foreground"
                    >
                      <span>•</span>
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
                      <Badge
                        key={url}
                        variant="outline"
                        className="normal-case font-normal"
                        asChild
                      >
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
      </div>

      {/* mobile view */}
      <div className="md:hidden">
        {/* CONTRIBUTIONS */}
        {item.achievements![locale]?.length > 0 && (
          <div>
            <H4>Contributions</H4>
            <ul className="mt-2 space-y-1 md:space-y-2">
              {item.achievements![locale].map((a: string, i: number) => (
                <li
                  key={i}
                  className="text-sm md:text-base flex gap-2 text-muted-foreground"
                >
                  <span>•</span>
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
                  <Badge
                    key={url}
                    variant="outline"
                    className="normal-case font-normal"
                    asChild
                  >
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
