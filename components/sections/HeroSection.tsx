"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

const HeroSection = () => {
  const handleProjectsClick = () => {
    const element = document.querySelector("#works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-10 md:pt-20"
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute z-40 size-24 md:size-36 rounded-full blur-[80px] md:blur-[150px] right-0 md:right-1/4 top-0 md:top-1/4 opacity-100 dark:opacity-60 bg-gradient-to-br from-primary to-secondary" />
      <div className="absolute z-40 size-20 md:size-36 rounded-full blur-[80px] md:blur-[150px] left-0 md:left-1/4 bottom-1/6 opacity-100 dark:opacity-60 bg-gradient-to-br from-primary to-secondary" />

      {/* CONTENT */}
      <div className="container relative z-10 mx-auto flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 text-center">
        {/* AVAILABLE TAG */}
        <div className="relative">
          {/* MEMOJI */}
          <Image
            src="/emoji2.png"
            alt="Memoji"
            width={200}
            height={200}
            className="absolute -top-14 left-1/2 -translate-x-1/2 size-20 rounded-full object-cover"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 md:mb-3 inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs md:text-sm backdrop-blur-sm border"
          >
            <span className="mr-2 h-2 w-2 rounded-full gradient"></span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Available for Projects
            </motion.span>
          </motion.div>
        </div>

        {/* HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl leading-13 md:leading-normal font-bold md:text-7xl"
        >
          Hi!, I&apos;m Divyashri Ravichandran
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-4 md:text-lg text-muted-foreground max-w-3xl mx-auto"
        >
          Front-end developer with over 1 year of experience building e-commerce
          web applications with Next.js and React.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-6 md:mt-10 flex gap-4 items-center justify-center"
        >
          <Button onClick={handleProjectsClick}>See Projects</Button>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="group relative">
              View Resume
              <span className="ml-0 max-w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[1rem] group-hover:opacity-100">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
