"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Animate title words
      tl.from(".hero-title span", {
        y: 120,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out",
      })
        // Animate subtitle
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
        // Animate scroll indicator
        .from(
          ".hero-scroll",
          { scale: 0, opacity: 0, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.3",
        );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative h-svh w-full flex flex-col justify-center px-6 md:px-16 overflow-hidden pt-16"
    >
      <div className="flex flex-col gap-8">
        {/* Hero Title */}
        <div className="overflow-hidden hero-title">
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase flex flex-col gap-2">
            <span className="inline-block">Frontend</span>{" "}
            <span className="inline-block text-primary">Developer</span>
          </h1>
        </div>

        {/* Hero Subtitle */}
        <p className="px-3 hero-sub max-w-3xl text-lg md:text-2xl opacity-80 leading-tight">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          iusto repellat, architecto maiores facilis quidem cumque.
        </p>

        {/* Scroll Indicator */}
        <div className="absolute hero-scroll flex items-center gap-4 group cursor-pointer right-16 bottom-16">
          <div className="text-right hidden md:block">
            <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">
              Scroll
            </p>
            <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">
              To Explore
            </p>
          </div>
          <div className="size-12 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all animate-bounce">
            <ArrowDown size={20} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
