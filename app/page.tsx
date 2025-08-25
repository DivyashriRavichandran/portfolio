"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import TechStackSection from "@/components/sections/TechStackSection";
import PersonalSection from "@/components/sections/PersonalSection";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const homeRef = useRef<HTMLElement>(null);
  const worksRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const techStackRef = useRef<HTMLElement>(null);
  const personalRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* BACKGROUND GLOWS */}
      <div className="">
        <div className="absolute z-0 size-24 md:size-36 rounded-full blur-[80px] md:blur-[100px] right-0 md:right-1/6 top-0 md:top-1/4 opacity-100 dark:opacity-60 bg-gradient-to-br from-primary to-secondary" />
        <div className="absolute z-0 size-20 md:h-36 md:w-1/5 rounded-full blur-[80px] md:blur-[150px] left-0 md:left-1/4 bottom-1/6 opacity-100 dark:opacity-60 bg-gradient-to-br from-primary to-secondary" />
        <div className="absolute z-0 size-20 md:size-36 rounded-full blur-[80px] md:blur-[100px] left-0 top-0 opacity-100 dark:opacity-60 bg-gradient-to-br from-primary to-secondary" />
      </div>
      <div className="hidden absolute z-0 w-40 h-60 rounded-full blur-[200px] right-0 top-0 opacity-100 bg-gradient-to-br from-primary to-secondary" />

      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Navbar />
          <div>
            {/* HERO SECTION */}
            <section id="home" ref={homeRef}>
              <HeroSection />
            </section>

            {/* WORK SECTION */}
            <section id="works" ref={worksRef}>
              <ProjectsSection />
            </section>

            {/* ABOUT SECTION */}
            <section id="about" ref={aboutRef}>
              <AboutSection />
            </section>

            {/* TECH STACK SECTION */}
            <section id="tech-stack" ref={techStackRef}>
              <TechStackSection />
            </section>

            {/* PERSONAL SECTION */}
            <section id="personal" ref={personalRef}>
              <PersonalSection />
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" ref={contactRef}>
              <ContactSection />
            </section>
          </div>

          <footer className="bg-foreground dark:bg-muted py-4 md:py-8">
            <div className="text-sm md:text-base container mx-auto px-4 text-center text-muted/60 dark:text-muted-foreground">
              <p>© 2025. Divyashri Portfolio. All rights reserved.</p>
            </div>
          </footer>
        </>
      )}
    </main>
  );
}
