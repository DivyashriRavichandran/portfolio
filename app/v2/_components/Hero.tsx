"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const Hero = () => {
  const container = useRef(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Qatar",
        }),
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={container}
      className="relative w-full flex flex-col justify-end px-5 max-w-4xl mx-auto pt-28 md:pb-10 md:pt-40"
    >
      {/* HEADER: Adjusted text size and tracking for mobile */}
      <div className="reveal flex justify-between items-center text-muted-foreground/60 font-semibold text-[10px] md:text-xs uppercase tracking-widest border-b border-muted-foreground/10 pb-4">
        <p>Groningen, NL</p>
        <p>{time} AST</p>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-y-4 md:items-end">
        {/* AVATAR & NAME: Switched to items-start for better mobile flow */}
        <div className="md:col-span-12 flex flex-row items-center gap-4">
          <Image
            src="/emoji.png"
            className="shrink-0 rounded-full size-24 md:size-36 border border-muted-foreground/20"
            alt="avatar"
            width={80}
            height={80}
          />

          <div className="space-y-2 md:space-y-4">
            <h1 className="reveal text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-[0.9]">
              Divyashri <br />
              <span className="text-muted-foreground/80">Ravichandran.</span>
            </h1>

            {/* Mobile-only  */}
            <div className="md:hidden reveal flex items-center gap-2">
              <div className="h-px w-8 bg-primary" />
              <p className="text-[9px] uppercase tracking-widest font-semibold text-muted-foreground/80">
                Master Student / Software Engineer
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: ROLE & EDUCATION */}
        <div className="hidden md:flex md:col-span-8 reveal items-center gap-3">
          <div className="h-px w-12 bg-primary" />
          <p className="text-[10px] md:text-xs uppercase tracking-widest font-semibold text-muted-foreground">
            Master Student / Software Engineer
          </p>
        </div>

        {/* MOBILE EDUCATION INFO: Clean stack on small screens */}
        <div className="md:col-span-4 flex-col hidden md:flex md:items-end md:space-y-6 font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground/60">
          <div className="reveal text-right md:space-y-1">
            <p>MSc Computing Science</p>
            <p>RUG Netherlands &apos;28</p>
          </div>
        </div>
      </div>

      {/* BACKGROUND WATERMARK: Responsive sizing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.02] pointer-events-none select-none">
        <span className="text-[25vw] md:text-[12vw] font-black uppercase tracking-tighter leading-none">
          {/* INDEX */}
        </span>
      </div>
    </section>
  );
};

export default Hero;
