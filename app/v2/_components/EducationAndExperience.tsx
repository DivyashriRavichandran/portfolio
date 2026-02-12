"use client";

import React from "react";
import Title from "./Title";
import { motion } from "framer-motion";
import data from "@/data/data.json";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

type LocalizedString = {
  en: string;
  nl: string;
};

interface TimelineData {
  id: number;
  title: LocalizedString;
  period: LocalizedString;
  institution: LocalizedString;
  image: string;
  description_1: string;
  description_2?: string;
  duration?: LocalizedString;
}

const TimelineItem = ({
  item,
  index,
}: {
  item: TimelineData;
  index: number;
}) => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <motion.div
      className="flex items-start gap-x-4 lg:gap-x-6"
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: index * 0.3 }}
    >
      <Image
        src={item.image}
        alt={item.title.en}
        width={80}
        height={80}
        className="border-[0.5px] size-12 lg:size-16 shrink-0 bg-white"
      />

      {/* CONTENT */}
      <div className="border-b pb-10 lg:pb-16 flex-1">
        {/* HEADER */}
        <div className="flex justify-between font-medium gap-3">
          <div className="font-medium text-lg md:text-2xl lg:text-3xl line-clamp-2 flex-1">
            {locale == "en" ? item.title.en : item.title.nl}
          </div>
          <div className="mt-1 text-sm md:text-base lg:text-xl whitespace-nowrap">
            {locale == "en" ? item.period.en : item.period.nl}
          </div>
        </div>

        {/* SUBHEADER */}
        <div className="flex justify-between lg:mt-2 items-start">
          <div className="lg:text-2xl font-medium">
            {locale == "en" ? item.institution.en : item.institution.nl}
          </div>
          {item.duration && (
            <div className="text-xs lg:text-lg">
              ({locale == "en" ? item.duration.en : item.duration.nl})
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="mt-4 lg:mt-6 text-sm md:text-base lg:text-xl">
          {item.description_1}
        </div>
        {item.description_2 && (
          <div className="mt-4 lg:mt-6 text-sm md:text-base lg:text-xl">
            {item.description_2}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const EducationAndExperience = () => {
  const t = useTranslations();

  return (
    <div className="px-4 md:px-16 py-10 lg:py-20">
      {/* Education Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4 md:gap-12 lg:gap-24 relative">
        <div className="-z-10 absolute bg-primary size-50 blur-[150px] -right-16 top-0" />
        <Title className="lg:w-52">{t("education")}</Title>
        <div className="space-y-10 lg:space-y-12 flex-1">
          {data.education.map((item: TimelineData, index: number) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div className="mt-16 md:mt-32 flex flex-col lg:flex-row lg:justify-between gap-4 md:gap-12 lg:gap-24 relative">
        <div className="-z-10 absolute bg-secondary size-50 blur-[130px] -right-16 top-0" />
        <Title className="lg:w-52">{t("experience")}</Title>
        <div className="space-y-10 md:space-y-12 flex-1">
          {data.experience.map((item: TimelineData, index: number) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationAndExperience;
