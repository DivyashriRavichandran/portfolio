"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import TechStackSection from "@/components/sections/TechStackSection";
import PersonalSection from "@/components/sections/PersonalSection";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AboutSection from "@/components/sections/AboutSection";
import LoadingScreen from "@/components/LoadingScreen";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const homeRef = useRef<HTMLElement>(null);
  const worksRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const techStackRef = useRef<HTMLElement>(null);
  const personalRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Navbar />
          <main>
            {/* HERO SECTION */}
            <section id="home" ref={homeRef}>
              <HeroSection />
            </section>

            {/* WORK SECTION */}
            <section id="works" ref={worksRef} className="relative">
              <ProjectsSection />
              <div className="-z-10 absolute -left-48 top-0 rounded-full h-[400px] w-[500px] bg-secondary/5 blur-3xl"></div>
              <div className="-z-10 absolute -right-40 top-1/2 rounded-full h-[400px] w-[500px] bg-primary/5 blur-3xl"></div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" ref={aboutRef} className="relative">
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
          </main>

          <footer className="bg-muted py-4 md:py-8">
            <div className="text-sm md:text-base container mx-auto px-4 text-center text-muted-foreground">
              <p>© 2025. Divyashri Portfolio. All rights reserved.</p>
            </div>
          </footer>
        </>
      )}
    </main>
  );
}
