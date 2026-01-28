"use client";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/button";
import { LuMouse } from "react-icons/lu";
import { useRef } from "react";
import Image from "next/image";
import shape2 from "@/assets/images/2.png";
import pyramid from "@/assets/images/pyramid.png";

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4 }); // fade out when <30% visible

  // get scroll progress relative to section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // start animating when section enters viewport
  });

  // create a parallax transform
  const y = useTransform(scrollYProgress, [0, 1], ["-100px", "100px"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["70px", "-70px"]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div
      ref={ref}
      className="md:container px-4 md:mx-auto h-[100svh] md:overflow-hidden"
    >
      {/* INTRO */}
      <div className="relative h-full flex flex-col justify-center pt-16">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col text-6xl md:text-8xl font-mono tracking-tight font-semibold text-gradient2"
          >
            Divyashri
            <span>Ravichandran</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Image
              src={pyramid}
              alt=""
              width={500}
              height={500}
              className="absolute -top-40 rotate-30 -right-5 md:hidden size-[180px]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <Image
              src={shape2}
              alt=""
              width={500}
              height={500}
              className="absolute top-66 right-0 md:hidden size-[150px]"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-6 md:mt-10 text-2xl md:text-3xl leading-tight tracking-tighter max-w-[800px]"
        >
          I&apos;m a{" "}
          <span className="tracking-normal playfair-display italic">
            Frontend Developer
          </span>{" "}
          currently working at KP Platforms in Qatar. I build web applications
          with a focus on animations and user interaction using{" "}
          <span className="tracking-normal playfair-display italic">React</span>{" "}
          and{" "}
          <span className="tracking-normal playfair-display italic">
            Next.js
          </span>
          .
        </motion.div>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 14,
            duration: 0.6,
            delay: 1.4,
          }}
          className="mt-6 flex gap-3"
        >
          <Button
            className="group relative"
            onClick={() => {
              handleNavClick("#works");
            }}
          >
            See Projects
            <span className="max-w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[1.5rem] group-hover:opacity-100">
              <ArrowRight className="size-4" />
            </span>
          </Button>
          <a
            href="/Divyashri_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="group relative font-normal">
              Resume
              <span className="ml-2 md:ml-0 max-w-[1.5rem] md:max-w-0 overflow-hidden md:opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[1.5rem] group-hover:opacity-100">
                <ArrowRight className="size-4" />
              </span>
            </Button>
          </a>
        </motion.div>

        {/* PYRAMID */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ y, willChange: "transform" }}
          className="hidden md:block -z-10 absolute rotate-30 md:rotate-0 top-1/2 md:top-1/2 md:-translate-y-1/2 right-0 md:right-10 w-[200px] md:w-1/4"
        >
          {/* scroll / parallax */}
          <motion.div
            animate={{
              rotate: [0, -5, 0], // gentle rocking rotation
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <Image src={pyramid} alt="" width={500} height={500} />
          </motion.div>
        </motion.div>

        {/* CUBE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ y: y2, willChange: "transform" }}
          className="hidden md:block -z-10 absolute bottom-16 md:top-1/6 right-0 md:right-1/4 w-[150px] md:w-1/6"
        >
          {/* scroll / parallax */}
          <motion.div
            animate={{
              rotate: [0, 5, 0], // gentle rocking rotation
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <Image src={shape2} alt="" width={500} height={500} />
          </motion.div>
        </motion.div>

        {/* SCROLL DOWN MOUSE ICON */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-4 md:bottom-6"
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
    </div>
  );
};

export default HeroSection;
