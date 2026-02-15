"use client";
import React, { useRef } from "react";
import Title from "./Title";
import data from "@/data/data.json";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Unified Type to handle both Education and Experience data structures
type TimelineData = {
  id: number;
  image: string;
  title: { en: string; nl: string };
  institution: { en: string; nl: string };
  period: { en: string; nl: string };
  duration?: { en: string; nl: string };
  grade?: string;
  // Education specific
  thesis?: { title: string; link?: string };
  key_modules?: string[];
  relevant_projects?: string[];
  track?: string;
  core_focus?: { label: string; content: string }[];
  // Experience specific
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
    <div className="group relative flex gap-x-6 lg:gap-x-12 pb-16">
      {/* VERTICAL LINE CONNECTOR */}
      {!isLast && (
        <div className="absolute left-[23px] lg:left-[31px] top-12 lg:top-16 w-[1px] h-full bg-foreground/10 origin-top" />
      )}

      {/* LOGO CONTAINER */}
      <div className="relative z-10 shrink-0">
        <Image
          src={item.image}
          alt={title}
          width={64}
          height={64}
          className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 size-12 lg:size-16 rounded-full border border-foreground/10 bg-white"
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 pt-1">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:justify-between items-start gap-2">
          <div className="space-y-1">
            <h3 className="text-xl md:text-3xl font-medium tracking-tight text-foreground/90">
              {title}
            </h3>
            <p className="text-lg font-medium text-muted-foreground">
              {institution}
            </p>
          </div>

          {/* PERIOD + BADGE */}
          <div className="flex flex-col md:items-end gap-1 shrink-0">
            <span className="text-sm font-mono font-medium opacity-50 uppercase">
              {period}
            </span>
            {item.grade && (
              <span className="text-[10px] font-medium uppercase text-[#d0fe38] tracking-widest">
                {item.grade}
              </span>
            )}
            {item.duration && (
              <span className="text-[10px] font-medium text-[#d0fe38] uppercase tracking-widest">
                {item.duration[locale]}
              </span>
            )}
          </div>
        </div>

        {/* THESIS */}
        {item.thesis && (
          <div className="mt-6 px-4 py-2 bg-foreground/[0.03] border-l-4 border-[#d0fe38] rounded-r-xl">
            <span className="text-[10px] uppercase font-sembold tracking-widest opacity-80">
              Research Thesis
            </span>
            <p className="text-base lg:text-lg font-medium mt-1 leading-tight">
              {item.thesis.title}
            </p>
            {item.thesis.link && (
              <a
                href={item.thesis.link}
                className="inline-flex items-center gap-1 text-xs mt-2 font-medium hover:underline text-[#d0fe38]"
              >
                View Thesis <ArrowRight size={12} />
              </a>
            )}
          </div>
        )}

        {/* KEY OUTCOMES / PROJECTS (Bullet points) */}
        {(item.key_outcomes || item.relevant_projects) && (
          <div className="mt-8 mb-10">
            <span className="text-[10px] uppercase font-semibold tracking-widest opacity-80">
              {item.key_outcomes ? "Core Contributions" : "Notable Projects"}
            </span>
            <ul className="mt-4 space-y-3">
              {(item.key_outcomes || item.relevant_projects)?.map(
                (point, i) => (
                  <li
                    key={i}
                    className="text-base lg:text-lg opacity-70 leading-snug flex gap-4"
                  >
                    <span className="mt-2.5 size-1.5 rounded-full bg-[#d0fe38] shrink-0" />
                    {point}
                  </li>
                ),
              )}
            </ul>
          </div>
        )}

        {/* MODULES / TECHNOLOGIES */}
        {(item.key_modules || item.technologies) && (
          <div className="mt-6 flex flex-wrap gap-2">
            {(item.key_modules || item.technologies)?.map((tag) => (
              <span
                key={tag}
                className="text-xs border border-foreground/20 text-foreground/70 rounded-full px-3 py-1 bg-foreground/[0.03]"
              >
                {tag}
              </span>
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
      gsap.from(".timeline-item", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
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
    <section
      ref={containerRef}
      className="px-6 md:px-16 py-20 bg-background text-foreground overflow-hidden"
    >
      {/* EDUCATION SECTION */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        <div className="lg:w-1/4">
          <Title className="sticky">{t("education")}</Title>
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

      {/* EXPERIENCE SECTION */}
      <div className="max-w-7xl mx-auto mt-24 md:mt-20 flex flex-col lg:flex-row gap-12 lg:gap-24">
        <div className="lg:w-1/4">
          <Title className="sticky">{t("experience")}</Title>
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
