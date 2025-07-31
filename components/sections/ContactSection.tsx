"use client";
import React from "react";
import ScrollAnimation from "../custom/ScrollAnimation";
import Link from "next/link";
import { motion } from "framer-motion";
import ContactForm from "../ContactForm";
import Heading from "../Heading";

const ContactSection = () => {
  const contactMethods = [
    {
      label: "Linkedin",
      icon: (
        <div className="size-6 bg-gradient-to-t from-primary to-secondary mask-linkedin-icon" />
      ),
      link: "https://www.linkedin.com/in/divyashri-ravichandran/",
      description: "Connect professionally",
    },
    {
      label: "GitHub",
      icon: (
        <div className="size-6 bg-gradient-to-t from-primary to-secondary mask-github-icon" />
      ),
      link: "https://github.com/DivyashriRavichandran",
      description: "Check out my projects",
    },
  ];

  return (
    <div className="my-10 md:my-20 container mx-auto px-4">
      <Heading title={"Get in Touch"} subtitle={"Contact me"} />

      <div className="mt-6 md:mt-12 mx-auto grid max-w-6xl gap-4 md:gap-6 lg:gap-12 md:grid-cols-3 lg:grid-cols-2">
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
                  className="group flex items-center gap-2 md:gap-4 rounded-lg border bg-muted/10 p-3 md:p-4 transition-all duration-300 hover:border-primary/20 hover:bg-muted/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-10 text-primary transition-all duration-300 group-hover:scale-110">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-medium group-hover:underline">
                      {method.label}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
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
        >
          <div className="rounded-lg bg-muted/70 p-6 md:p-8 border border-muted-foreground/10">
            <h3 className="mb-6 text-lg md:text-xl font-bold">
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
