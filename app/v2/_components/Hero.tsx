"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

const Hero = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative h-svh w-full flex flex-col justify-center px-6 md:px-24 bg-background"
    >
      <div className="space-y-12">
        <div className="space-y-4">
          <p className="reveal text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            Frontend Developer based in Doha, Qatar
          </p>
          <h1 className="reveal text-5xl md:text-9xl font-semibold tracking-tighter uppercase leading-[0.9]">
            Divyashri <br />
            <span className="text-foreground/30 font-medium">
              Ravichandran.
            </span>
          </h1>
        </div>

        <div className="reveal max-w-3xl">
          <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
            I build modern, scalable web applications using React, Next.js and
            TypeScript, focusing on clean UI, smooth interactions and scalable
            architecture.
          </p>
        </div>

        <div className="reveal pt-4">
          <Link
            href="#project"
            className="group flex items-center text-[10px] uppercase tracking-[0.3em] font-black"
          >
            <span className="text-primary transition-transform group-hover:-translate-x-1">
              [
            </span>
            <span className="px-4">My Projects</span>
            <span className="text-primary transition-transform group-hover:translate-x-1">
              ]
            </span>
          </Link>
        </div>
      </div>

      {/* Footer - good */}
      <div className="absolute bottom-12 right-6 md:right-24 flex items-center gap-6 rotate-90 origin-right translate-y-full">
        <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/80 whitespace-nowrap">
          Scroll to explore
        </p>
        <div className="h-px w-24 bg-border overflow-hidden">
          <div className="h-full bg-primary w-1/3 animate-scroll-progress" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
