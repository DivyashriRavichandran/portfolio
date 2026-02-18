"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const container = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Text reveal animation
      tl.from(".hero-text span", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
      })
        .from(
          ".hero-sub",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.5",
        )
        .from(
          ".hero-badge",
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative h-svh w-full flex flex-col justify-end px-6 md:px-16 pb-12 md:pb-24 overflow-hidden"
    >
      {/* Background Decorative Element (Optional) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
        <h2 className="text-[40vw] font-black leading-none uppercase"></h2>
      </div>

      <div className="flex flex-col gap-6">
        {/* Status Badge */}
        <div className="hero-badge flex items-center gap-2 w-fit px-4 py-2 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d0fe38] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d0fe38]"></span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">
            Doha, Qatar
          </span>
        </div>

        {/* Main Title */}
        <div className="hero-text overflow-hidden">
          <h1 className="text-6xl md:text-8xl lg:text-[10vw] font-black leading-[0.9] tracking-tighter uppercase">
            <span className="inline-block">Frontend</span> <br />
            <span className="text-foreground/30">Developer.</span>
          </h1>
        </div>

        {/* Sub-info */}
        <div className="hero-sub flex flex-col md:flex-row md:items-end justify-between gap-8 mt-4 border-t border-foreground/10 pt-8">
          <p className="max-w-xl text-lg md:text-xl opacity-80 leading-tight">
            Crafting immersive digital experiences with a blend of creativity
            and code. Let&apos;s build the future of the web together.
          </p>

          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="text-right hidden md:block">
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">
                Scroll
              </p>
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">
                To Explore
              </p>
            </div>
            <div className="size-12 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-[#d0fe38] group-hover:text-black transition-all animate-bounce">
              <ArrowDown size={20} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
