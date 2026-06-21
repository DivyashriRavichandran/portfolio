import React, { Suspense } from "react";
import { unstable_cache } from "next/cache";

const username = "divyashriravichandran";

import {
  isAfter,
  isBefore,
  parseISO,
  startOfDay,
  addDays,
  subMonths,
} from "date-fns";
import About from "@/components/sections/About";
import BlogsSection from "@/components/sections/Blogs";
import CareerSection from "@/components/sections/Career";
import ContactSection from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import MiniProjectsSection from "@/components/sections/MiniProjectsSection";
import ProjectSection from "@/components/sections/ProjectSection";

const getCachedContributions = unstable_cache(
  async () => {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}`,
    );
    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();
    const today = startOfDay(new Date());
    const timeframeInMonths = subMonths(today, 10);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contributions = data.contributions.filter((c: any) => {
      const contributionDate = parseISO(c.date);
      return (
        isAfter(contributionDate, timeframeInMonths) &&
        isBefore(contributionDate, addDays(today, 1))
      );
    });

    const total = contributions.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (acc: number, curr: any) => acc + curr.count,
      0,
    );

    return {
      contributions,
      total,
    };
  },
  ["github-contributions"],
  { revalidate: 60 * 60 * 24 },
);

async function AboutWithData() {
  const githubData = await getCachedContributions();
  return <About githubData={githubData} />;
}

const Home = () => {
  return (
    <>
      <Hero />
      <Suspense
        fallback={<div className="h-48 animate-pulse bg-muted rounded-lg" />}
      >
        <AboutWithData />
      </Suspense>
      <ProjectSection />
      <MiniProjectsSection />
      <CareerSection />
      <BlogsSection />
      <ContactSection />
    </>
  );
};

export default Home;
