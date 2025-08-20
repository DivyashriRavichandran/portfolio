"use client";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Badge } from "../Badge";
import { LuMouse } from "react-icons/lu";

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
      {/* OLD CONTENT */}
      <div className="md:hidden container relative z-10 mx-auto flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 text-center">
        {/* AVAILABLE TAG */}
        <div className="relative mb-6 md:mb-3">
          <motion.div
            initial={{ scale: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute -top-14 left-1/2 -translate-x-1/2"
          >
            <Image
              src="/emoji2.png"
              alt="Memoji"
              width={200}
              height={200}
              className="size-20 rounded-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          >
            <Badge text="Available for Projects" />
          </motion.div>
        </div>

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

      {/* NEW SECTION */}
      <div className="relative md:container px-4 md:mx-auto min-h-[calc(100vh-80px)] flex flex-col justify-end">
        {/* INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="pb-20 max-w-[1160px] text-3xl md:text-4xl leading-tight tracking-tight"
        >
          Hi, I&apos;m Divyashri, a{" "}
          <span className="tracking-normal playfair-display italic hover:text-pink-400 cursor-pointer transition">
            Frontend Developer
          </span>{" "}
          currently working at KP Platforms in Qatar. I specialize in building
          responsive web applications using{" "}
          <span className="tracking-normal playfair-display italic hover:text-cyan-400 cursor-pointer transition">
            React
          </span>{" "}
          and{" "}
          <span className="tracking-normal playfair-display italic hover:text-teal-400 cursor-pointer transition">
            Next.js.
          </span>
        </motion.div>

        {/* SCROLL DOWN MOUSE ICON */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.6, ease: "easeOut" },
            y: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 1.5,
              ease: "easeInOut",
            },
          }}
        >
          <LuMouse className="stroke-[1.5px] w-8 h-8 text-muted-foreground" />
        </motion.div>

        {/* BUTTONS */}
        <div className="md:hidden mt-6 flex w-full justify-center gap-5">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="group relative text-lg px-6 bg-muted/30 h-14 font-normal gap-2"
            >
              View Resume
              <span className="max-w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[1.5rem] group-hover:opacity-100">
                <ArrowRight className="size-6" />
              </span>
            </Button>
          </a>
          <Button
            variant="outline"
            className="group relative text-lg px-6 bg-muted/30 h-14 font-normal gap-2"
          >
            See Projects
            <span className="max-w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[1.5rem] group-hover:opacity-100">
              <ArrowDown className="size-6" />
            </span>
          </Button>
        </div>

        {/* SHAPES */}
        <div className="absolute top-0 left-0"></div>
      </div>
    </section>
  );
};

export default HeroSection;
