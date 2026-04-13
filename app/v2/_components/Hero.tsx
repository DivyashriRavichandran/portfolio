"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // Added Link for navigation
import { Badge } from "@/components/ui/badge";

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

  // Menu items array for easy management
  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <section
      ref={container}
      className="w-full flex flex-col justify-end px-5 pt-28 md:pb-10 md:pt-40"
    >
      {/* HEADER */}
      <div className="reveal flex justify-between items-center text-muted-foreground/60 font-medium text-[10px] md:text-xs uppercase tracking-widest border-b border-muted-foreground/20 pb-4">
        <p>Groningen, NL</p>
        <p>{time} AST</p>
      </div>

      {/* CONTENT */}
      <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-y-6 md:items-end">
        {/* AVATAR & NAME */}
        <div className="md:col-span-12 flex flex-row items-center gap-4 md:gap-8">
          <Image
            src="/emoji.png"
            className="shrink-0 rounded-full size-24 md:size-36 border border-muted-foreground/20"
            alt="avatar"
            width={144}
            height={144}
          />

          <div className="space-y-2 md:space-y-4">
            <h1 className="reveal text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.85]">
              Divyashri <br />
              <span className="text-muted-foreground/40">Ravichandran.</span>
            </h1>

            {/* Professional Tagline - Mobile */}
            <div className="md:hidden reveal flex items-center gap-2">
              <div className="h-px w-6 bg-primary" />
              <p className="text-[9px] uppercase tracking-widest font-semibold text-muted-foreground/80">
                MSc Student / Software Engineer
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: NAV & STATUS */}
        <div className="md:col-span-8 flex flex-col gap-6">
          {/* Desktop Tagline */}
          <div className="hidden md:flex reveal items-center gap-3">
            <div className="h-px w-12 bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-widest font-semibold text-muted-foreground">
              Master Student / Software Engineer
            </p>
          </div>

          {/* MENU ITEMS / BUTTONS */}
          <nav className="reveal flex flex-wrap gap-2 md:gap-3">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <Badge>{item.label}</Badge>
              </Link>
            ))}
          </nav>
        </div>

        {/* ACADEMIC STATUS */}
        <div className="md:col-span-4 flex flex-col items-start md:items-end space-y-2 md:space-y-1 font-medium text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground/60">
          <p className="reveal">MSc Computing Science</p>
          <p className="reveal font-semibold text-primary/80">
            RUG Netherlands &apos;28
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
