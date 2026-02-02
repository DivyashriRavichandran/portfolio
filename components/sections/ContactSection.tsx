"use client";
import React, { useRef } from "react";
import ScrollAnimation from "../animations/ScrollAnimation";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import ContactForm from "../ContactForm";
import Heading from "../Heading";
import Image from "next/image";
import shape from "@/assets/images/13.png";
import shape2 from "@/assets/images/3.png";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const ContactSection = () => {
  const contactMethods = [
    {
      label: "Linkedin",
      icon: <FaLinkedin size={28} />,
      link: "https://www.linkedin.com/in/divyashri-ravichandran/",
      description: "Connect professionally",
    },
    {
      label: "GitHub",
      icon: <FaGithub size={28} />,
      link: "https://github.com/DivyashriRavichandran",
      description: "Check out my projects",
    },
  ];
  const ref = useRef(null);
  // get scroll progress relative to section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // start animating when section enters viewport
  });

  // create a parallax transform
  const y = useTransform(scrollYProgress, [0, 1], ["-100px", "100px"]);

  return (
    <div
      ref={ref}
      className="relative py-10 md:py-20 md:container md:mx-auto px-4 overflow-y-clip"
    >
      {/* GRADIENTS */}
      <div className="-z-20 absolute left-0 md:-left-20 top-0 md:top-20 rounded-full size-20 md:size-40 bg-secondary blur-[100px] md:blur-[150px]"></div>
      <div className="-z-20 absolute right-0 top-1/4 md:top-3/4 rounded-full size-20 md:size-40 bg-tertiary blur-[80px] md:blur-[150px]"></div>

      <motion.div style={{ y }}>
        <Image
          src={shape}
          alt=""
          width={500}
          height={500}
          className="hidden md:block absolute -top-10 -left-10 -rotate-220 w-[350px] opacity-80"
        />
      </motion.div>

      <Image
        src={shape2}
        alt=""
        width={500}
        height={500}
        className="hidden md:block absolute bottom-0 -right-10 w-[200px] md:w-[300px] opacity-80"
      />
      <Heading title={"Get in Touch"} subtitle={"Contact me"} />

      <div className="backdrop-blur-2xl mt-6 md:mt-12 mx-auto grid max-w-6xl gap-6 lg:gap-12 md:grid-cols-3 lg:grid-cols-2">
        {/* CONTACT DETAILS */}
        <ScrollAnimation direction="right">
          <div className="space-y-3 md:space-y-4">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 md:gap-4 rounded-lg border border-muted-foreground/20 bg-muted/20 backdrop-blur-2xl p-3 md:p-4 transition-all duration-300 hover:border-foreground/40"
                >
                  <div className="text-primary transition-all duration-300 group-hover:scale-110">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="md:text-lg font-medium group-hover:underline">
                      {method.label}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {method.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </ScrollAnimation>

        {/* FORM */}
        <ScrollAnimation
          direction="left"
          className="md:col-span-2 lg:col-span-1"
          delay={0.2}
        >
          <div className="rounded-lg bg-muted/20 backdrop-blur-2xl p-6 md:p-8 border border-muted-foreground/20 ">
            <h3 className="mb-6 text-lg md:text-xl font-semibold">
              Send me a message
            </h3>
            <ContactForm />
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default ContactSection;
