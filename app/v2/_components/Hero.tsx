"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

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

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <section
      ref={container}
      className="w-full flex flex-col justify-end pt-28 md:pt-32"
    >
      {/* HEADER */}
      <div className=" flex justify-between items-center text-muted-foreground/80 font-medium text-[10px] md:text-xs uppercase tracking-widest">
        <p>Groningen, NL</p>
        <p>{time} AST</p>
      </div>

      {/* CONTENT */}
      <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-y-6 md:items-end">
        {/* AVATAR & NAME */}
        <div className="md:col-span-12 flex flex-row items-center gap-4 md:gap-8">
          <div className="relative inline-block w-fit">
            <Image
              src="/emoji.png"
              className="shrink-0 rounded-full size-24 md:size-36 border"
              alt="avatar"
              width={144}
              height={144}
              priority
            />

            <span
              className="absolute bottom-1 -right-1 md:-right-2 text-3xl md:text-5xl"
              role="img"
              aria-label="waving hand"
            >
              👋
            </span>
          </div>

          <div className="space-y-2 md:space-y-4">
            <h1 className=" text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight uppercase leading-[0.85]">
              Divyashri <br />
              <span className="text-muted-foreground/60">Ravichandran.</span>
            </h1>

            {/* Professional Tagline - Mobile */}
            <div className="md:hidden  flex items-center gap-2">
              <div className="h-px w-6 bg-primary" />
              <p className="text-[9px] uppercase tracking-widest font-semibold text-muted-foreground/80">
                Master Student / Software Engineer
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: NAV & STATUS */}
        <div className="md:col-span-8 flex flex-col gap-6">
          {/* Desktop Tagline */}
          <div className="hidden md:flex  items-center gap-3">
            <div className="h-px w-12 bg-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-widest font-semibold text-muted-foreground">
              Master Student / Software Engineer
            </p>
          </div>

          {/* MENU ITEMS / BUTTONS */}
          <nav className="flex flex-wrap items-center gap-3 md:gap-4 mt-2">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <Button size={"sm"}>{item.label}</Button>
              </Link>
            ))}

            <Link href="/resume.pdf" target="_blank">
              <Button variant="outline" size={"sm"}>
                Resume
                <DownloadIcon />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Hero;
