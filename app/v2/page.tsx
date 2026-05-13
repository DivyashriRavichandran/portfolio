import React from "react";
import About from "./_components/About";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import ProjectSection from "./_components/ProjectSection";
import Navbar from "./_components/Navbar";
import CareerSection from "./_components/Career";
import MiniProjectsSection from "./_components/MiniProjectsSection";
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

const Home = async () => {
  const githubData = await getCachedContributions();

  return (
    <div className="px-5 lg:px-0 md:max-w-3xl md:mx-auto">
      <Navbar />
      <Hero />
      <About githubData={githubData} />
      <CareerSection />
      <ProjectSection />
      <MiniProjectsSection />
      <Footer />
    </div>
  );
};

export default Home;
