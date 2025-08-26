"use client";

import React, { useRef } from "react";
import Heading from "../Heading";
import TimelineSection from "./TimelineSection";
import TextAnimator from "../animations/TextAnimator";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import circle from "@/assets/images/circle.png";

const AboutSection = () => {
  const ref = useRef(null);
  // get scroll progress relative to section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // start animating when section enters viewport
  });

  // create a parallax transform
  const y = useTransform(scrollYProgress, [0, 1], ["-100px", "100px"]);

  return (
    <>
      {/* ABOUT SECTION */}
      <div
        ref={ref}
        className="relative md:container md:mx-auto py-10 md:py-20 px-4"
      >
        {/* BACKGROUND SHAPES */}
        <motion.div style={{ y }}>
          <Image
            src={circle}
            alt=""
            width={500}
            height={500}
            className="absolute -top-10 -left-10 w-[150px] md:w-[300px] opacity-80"
          />
        </motion.div>

        <Image
          src={circle}
          alt=""
          width={500}
          height={500}
          className="absolute -bottom-10 -right-10 w-[150px] md:w-[300px] opacity-80"
        />

        <div className="bg-muted/20 backdrop-blur-2xl dark:text-zinc-200 shadow-2xl border px-6 md:px-24 py-10 md:py-20 rounded-xl">
          <Heading title={"About Me"} subtitle={"Know who am I"} />
          <div className="mt-6 flex flex-col md:flex-row md:justify-between w-full items-center gap-y-4 md:gap-y-0 md:gap-x-4">
            {/* TEXT */}
            <div className="z-20 md:flex-1 text-xl md:text-2xl leading-snug tracking-tighter max-w-prose">
              <TextAnimator>
                <div>
                  My background in Computer Science from the University of Leeds
                  gave me a solid foundation in software engineering and
                  algorithms. Along the way, I discovered a love for frontend
                  development, where I could blend creativity with
                  functionality. I also enjoy designing UI/UX, which helps me
                  craft intuitive and engaging digital experiences.
                </div>
              </TextAnimator>
            </div>

            {/* IMAGE */}
            <div className="w-1/2 md:w-1/4 lg:w-1/5 z-20">
              <motion.div
                whileHover={{ scale: 1.05, rotateZ: 2 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                >
                  <Image src={"/emoji.png"} alt="" width={500} height={500} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* EXPERIENCE SECTION */}
      <div className="mt-10 md:my-20 container mx-auto px-4">
        <Heading title={"My Journey"} subtitle={"Experience & Education"} />
        <TimelineSection />
      </div>
    </>
  );
};

export default AboutSection;
