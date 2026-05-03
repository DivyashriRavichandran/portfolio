"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

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
      className="w-full flex flex-col justify-end pt-28 md:pt-32"
    >
      {/* HEADER */}
      <div className=" flex justify-between items-center text-muted-foreground/80 font-medium text-[10px] md:text-xs uppercase tracking-widest">
        <p>Groningen, NL</p>
        <p>{time} AST</p>
      </div>

      {/* CONTENT */}
      <div className="mt-8 md:mt-12 flex flex-col gap-y-8 md:gap-y-12">
        {/* AVATAR & NAME */}
        <div className="flex flex-row items-center gap-4 md:gap-8">
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
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-[0.85]">
              Divyashri <br />
              <span className="text-muted-foreground/80">Ravichandran.</span>
            </h1>

            {/* Tagline */}
            <div className="flex items-center gap-2">
              <p className="text-sm md:text-lg font-medium text-muted-foreground">
                Masters Student @ RUG / Software Engineer
              </p>
            </div>
          </div>
        </div>

        {/* SOCIALS & RESUME */}
        <div className="w-full flex flex-wrap items-center gap-x-5 px-2">
          {[
            { label: "LinkedIn", href: "#", icon: FaLinkedin },
            { label: "Github", href: "#", icon: FaGithub },
            {
              label: "Email",
              href: "mailto:contact@divyashri.nl",
              icon: MdEmail,
            },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-2"
            >
              <link.icon className="size-5 md:size-6" />
              <span className="text-sm hidden md:block">{link.label}</span>
            </Link>
          ))}

          <Link href="" target="_blank" className="ml-auto">
            <Button size={"sm"}>
              Resume
              <DownloadIcon />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
