"use client";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useMotionValue } from "framer-motion";
import { Button } from "../ui/button";
import { LuMouse } from "react-icons/lu";
import { useEffect, useRef } from "react";
import TextAnimator from "../custom/TextAnimator";
import Image from "next/image";
import circle from "@/assets/images/hero shapes/circle.png";
import shape2 from "@/assets/images/hero shapes/2.png";
import shape3 from "@/assets/images/hero shapes/3.png";
import pyramid from "@/assets/images/hero shapes/pyramid.png";

const HeroSection = () => {
  // Track cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4 }); // fade out when <30% visible

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="home" ref={ref} className="relative md:pt-20">
      <div className="pt-10 md:container px-4 md:mx-auto h-svh">
        {/* SHAPES */}
        <Image
          src={circle}
          alt="Circle"
          className="absolute -top-16 -left-10 w-[256px]"
        />
        <Image
          src={shape2}
          alt="Shape 2"
          className="hidden absolute z-10 w-[300px] top-5 -right-20"
        />

        {/* INTRO */}
        <div className="relative md:pb-24 h-full md:min-h-[calc(100vh-80px)] flex flex-col justify-end">
          {/* Left pyramid */}
          <Image
            src={pyramid}
            alt="Pyramid"
            className="absolute bottom-72 -left-16 w-[250px] -rotate-12"
          />

          {/* Right shape with gradient overlay */}
          <div className="absolute w-[270px] bottom-64 -right-20">
            <div className="relative">
              <Image src={shape3} alt="Shape 3" className="relative -z-10" />
              {/* Gradient overlay sitting *above background but below image* */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-0" />
            </div>
          </div>

          <TextAnimator animateOnScroll={true}>
            <div className="text-2xl md:text-4xl leading-tight tracking-tight">
              I&apos;m Divyashri, a{" "}
              <span className="tracking-normal playfair-display italic">
                Frontend Developer
              </span>{" "}
              currently working at KP Platforms in Qatar. I build web
              applications with a focus on animations and user interaction using{" "}
              <span className="tracking-normal playfair-display italic">
                React
              </span>{" "}
              and{" "}
              <span className="tracking-normal playfair-display italic">
                Next.js
              </span>
              .
            </div>
          </TextAnimator>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-4 md:mt-8 flex gap-3 md:gap-5"
          >
            <Button className="group relative" size="lg">
              See Projects
              <span className="max-w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[1.5rem] group-hover:opacity-100">
                <ArrowRight className="size-6" />
              </span>
            </Button>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="group relative font-normal"
                size="lg"
              >
                Resume
                <span className="ml-2 md:ml-0 max-w-[1.5rem] md:max-w-0 overflow-hidden md:opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[1.5rem] group-hover:opacity-100">
                  <ArrowRight className="size-4 md:size-6" />
                </span>
              </Button>
            </a>
          </motion.div>

          {/* SCROLL DOWN MOUSE ICON */}
          <motion.div
            className="mt-6 mb-4 mx-auto cursor-pointer"
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: isInView ? 1 : 0, // fades out when not in view
              y: [0, -10, 0],
            }}
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
            <LuMouse className="stroke-[1.5px] size-6 md:size-8 text-muted-foreground" />
          </motion.div>
        </div>

        {/* SHAPES */}
        {/* <FloatingLetters /> */}
      </div>
    </section>
  );
};

export default HeroSection;
