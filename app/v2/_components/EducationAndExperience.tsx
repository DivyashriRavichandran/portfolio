"use client";
import React, { useRef } from "react";
import Title from "./Title";
import data from "@/data/data.json";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

type TimelineData = {
  id: number;
  image: string;
  title: { en: string; nl: string };
  institution: { en: string; nl: string };
  period: { en: string; nl: string };
  duration?: { en: string; nl: string };
  grade?: string;
  thesis?: { title: string; link?: string };
  key_modules?: string[];
  relevant_projects?: string[];
  track?: string;
  core_focus?: { label: string; content: string }[];
  key_outcomes?: string[];
  technologies?: string[];
  impact_metrics?: { label: string; value: string }[];
};

const TimelineItem = ({
  item,
  isLast,
}: {
  item: TimelineData;
  isLast: boolean;
}) => {
  const locale = useLocale() as "en" | "nl";

  const title = item.title[locale];
  const institution = item.institution[locale];
  const period = item.period[locale];

  return (
    <div className="group relative flex gap-x-3 md:gap-x-6 lg:gap-x-12 pb-10 md:pb-16">
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-4 md:left-7 top-10 md:top-16 w-px h-full bg-foreground/30 origin-top" />
      )}

      {/* Logo */}
      <div className="relative z-10 shrink-0">
        <Image
          src={item.image}
          alt={title}
          width={64}
          height={64}
          className="size-10 md:size-12 lg:size-16 rounded-full object-contain border bg-white"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Title */}
        <h3 className="text-lg md:text-2xl lg:text-3xl font-medium tracking-tight">
          {title}
        </h3>

        {/* Institution */}
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
          {institution}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-2 mt-1 md:mt-2 justify-between">
          <span className="text-xs md:text-sm uppercase opacity-60 font-medium">
            {period}
          </span>
          {item.duration && (
            <span className="text-xs font-semibold uppercase tracking-wide text-background px-0.5 bg-primary">
              {item.duration[locale]}
            </span>
          )}
          {item.grade && (
            <span className="text-xs font-semibold uppercase tracking-wide text-background px-0.5 bg-primary">
              {item.grade}
            </span>
          )}
        </div>

        {/* Bullet points */}
        {(item.key_outcomes || item.relevant_projects) && (
          <div className="mt-4 md:mt-8">
            <span className="text-[10px] uppercase font-semibold tracking-widest opacity-60">
              {item.key_outcomes ? "Core Contributions" : "Notable Projects"}
            </span>

            <ul className="mt-3 space-y-2 md:space-y-3">
              {(item.key_outcomes || item.relevant_projects)?.map(
                (point, i) => (
                  <li
                    key={i}
                    className="text-sm md:text-base leading-relaxed flex gap-3"
                  >
                    <span className="mt-2 size-1.5 rounded-full bg-foreground/50 shrink-0" />
                    {point}
                  </li>
                ),
              )}
            </ul>
          </div>
        )}

        {/* Tags */}
        {(item.key_modules || item.technologies) && (
          <div className="flex flex-wrap gap-2 md:gap-3 mt-4 md:mt-6">
            {(item.key_modules || item.technologies)?.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const EducationAndExperience = () => {
  const t = useTranslations();
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;

      gsap.from(".timeline-item", {
        opacity: 0,
        y: isMobile ? 15 : 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="px-4 md:px-6 lg:px-0 py-10 md:py-20">
      {/* EDUCATION */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-24">
        <div className="lg:w-1/4">
          <Title className="lg:sticky lg:top-24">{t("education")}</Title>
        </div>

        <div className="flex-1">
          {data.education.map((item: TimelineData, index: number) => (
            <div key={item.id} className="timeline-item">
              <TimelineItem
                item={item}
                isLast={index === data.education.length - 1}
              />
            </div>
          ))}
        </div>
      </div>

      {/* EXPERIENCE */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-24 mt-16 md:mt-24">
        <div className="lg:w-1/4">
          <Title className="lg:sticky lg:top-24">{t("experience")}</Title>
        </div>

        <div className="flex-1">
          {data.experience.map((item: TimelineData, index: number) => (
            <div key={item.id} className="timeline-item">
              <TimelineItem
                item={item}
                isLast={index === data.experience.length - 1}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationAndExperience;
