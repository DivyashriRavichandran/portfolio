"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { IconType } from "react-icons";
import { FaSuitcase } from "react-icons/fa6";
import { RiGraduationCapFill } from "react-icons/ri";

interface TimelineItemProps {
  date: string;
  title: string;
  organization: string;
  points: string[];
  place: string;
  index: number;
  delay: number;
  icon: IconType;
}

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleY = useSpring(scaleProgress, { stiffness: 100, damping: 30 });

  const items: TimelineItemProps[] = [
    {
      index: 0,
      date: "October 2024 - Present",
      title: "Front End Developer",
      organization: "KP Platforms",
      place: "Lusail, Qatar",
      points: [
        "Developed 5+ dynamic and responsive e-commerce web applications using Next.js, Tailwind CSS, TypeScript",
        "Collaborated with UI/UX designers and backend developers from Dubai to transform Figma designs into code and integrated RESTful APIs, for optimizing user-centric applications",
        "Focused on SSR, SSG, and dynamic routing with Next.js to enhance SEO and page load performance",
        "Added internationalization (i18n) for multilingual user support",
        "Utilized Git, Jira as version control for efficient team collaboration and streamline work assignment",
      ],
      delay: 0.1,
      icon: FaSuitcase,
    },
    {
      index: 1,
      date: "2021 - 2024",
      title: "Bachelor of Computer Science (Hons)",
      organization: "University of Leeds",
      place: "Leeds, UK",
      points: [
        "Graduated with a 2:1 Honours degree in Computer Science.",
        "Core modules: Software Engineering, Data Structures and Algorithms, Database Systems, Machine Learning.",
        "Dissertation: Classification of Histopathological Images for Lung Cancer Detection using DCGAN Model.",
      ],
      delay: 0.3,
      icon: RiGraduationCapFill,
    },
  ];

  return (
    <div className="mt-6 md:mt-12 mx-auto max-w-5xl" ref={containerRef}>
      <div className="relative">
        <motion.div
          className="absolute left-4 top-4 h-full w-px bg-foreground/20 md:left-1/2 md:-translate-x-1/2 origin-top"
          style={{ scaleY }}
        />
        {items.map((item, idx) => (
          <TimelineItem key={idx} {...item} />
        ))}
      </div>
    </div>
  );
}

const TimelineItem = (item: TimelineItemProps) => {
  const isLeft = item.index % 2 === 0;
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-100px 0px" });

  return (
    <div ref={itemRef} className="relative mb-8 md:mb-12">
      <div
        className={`flex flex-col md:flex-row group cursor-pointer ${
          isLeft ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Timeline dot */}
        <motion.div
          className="absolute left-4 top-0 -translate-x-1/2 md:left-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: item.delay + 0.2 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-10 transition-all duration-300 group-hover:scale-110 group-hover:brightness-125">
            <div className="h-4 w-4 rounded-full gradient transition-transform duration-300 group-hover:scale-125" />
          </div>
        </motion.div>

        {/* Spacer */}
        <div className="hidden md:block md:w-1/2" />

        {/* Content */}
        <motion.div
          className={`w-fit ml-12 md:ml-0 md:w-1/2 ${
            isLeft ? "md:pr-10" : "md:pl-10"
          }`}
          initial={{ x: isLeft ? -50 : 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: item.delay + 0.3 }}
        >
          <div className="group/card relative">
            {/* GRADIENT BORDER */}
            <div className="rounded-[13px] absolute -inset-[1px] bg-gradient-to-br from-primary to-secondary opacity-0 group-hover/card:opacity-100 transition duration-300 z-0" />

            {/* GRADIENT GLOW */}
            <div className="absolute z-40 size-20 rounded-full blur-[150px] right-0 top-0 opacity-80 bg-gradient-to-br from-primary to-secondary" />

            {/* INNER CONTENT */}
            <div className="relative z-10 rounded-xl px-6 py-4 dark:bg-muted bg-white border border-muted-foreground/20  group-hover/card:border-transparent">
              {/* HEADER */}
              <div className="-ml-1 flex items-end justify-between flex-row-reverse mr-1">
                <div className="p-1 md:p-1.5 rounded-lg bg-card">
                  <item.icon className="size-5 md:size-6 text-card-foreground" />
                </div>

                <div className="rounded-full px-2 py-1 text-xs md:text-sm dark:bg-card bg-muted w-fit inline-block text-card-foreground">
                  {item.date}
                </div>
              </div>

              <h3 className="mt-1 md:mt-3 text-lg md:text-2xl tracking-tight font-semibold">
                {item.title}
              </h3>
              <div className="flex items-center justify-between gap-2">
                <p className="text-gradient font-medium">{item.organization}</p>
                <p className="text-sm md:text-base text-muted-foreground">
                  {item.place}
                </p>
              </div>

              <ul className="pl-2 list-disc mt-2 md:mt-4 text-muted-foreground text-sm md:text-base space-y-1">
                {item.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
