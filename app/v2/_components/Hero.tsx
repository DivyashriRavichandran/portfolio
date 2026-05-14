"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="w-full flex flex-col pt-20 md:pt-32 gap-y-4 md:gap-y-8">
      {/* AVATAR & NAME */}
      <div className="flex flex-row gap-4 md:gap-8">
        <div className="relative group">
          <Image
            src="/emoji.png"
            className="shrink-0 rounded-full w-24 h-fit md:size-40 border"
            alt="avatar"
            width={144}
            height={144}
            priority
          />

          <span
            className="absolute bottom-10 md:bottom-6 -right-1 md:-right-2 text-xl md:text-5xl"
            role="img"
            aria-label="waving hand"
          >
            👋
          </span>
        </div>

        <div className="space-y-2 md:space-y-3">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-[0.85]">
            Divyashri <br />
            <span className="text-muted-foreground/80">Ravichandran.</span>
          </h1>

          {/* Tagline */}
          <div className="flex flex-col gap-0.5">
            <p className="text-sm md:text-lg font-medium">
              Masters Student @ RUG / Software Engineer
            </p>
            <p className="text-xs md:text-sm flex items-center gap-1 text-muted-foreground">
              <FaMapMarkerAlt size={16} className="size-3 md:size-3" />
              Groningen, NL
            </p>
          </div>
        </div>
      </div>

      {/* SOCIALS & RESUME */}
      <div className="w-full flex flex-wrap items-center gap-x-1">
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
            className="group relative flex items-center"
          >
            <div className="flex items-center gap-0 group-hover:gap-3 px-2 md:px-3 py-2 rounded-full bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
              <link.icon className="size-5 md:size-6" />
              <span className="overflow-hidden whitespace-nowrap text-xs md:text-sm font-medium opacity-0 max-w-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:max-w-30 group-hover:opacity-100">
                {link.label}
              </span>
            </div>
          </Link>
        ))}

        <Link href="" target="_blank" className="ml-auto">
          <Button variant={"outline"}>
            Resume
            <DownloadIcon />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
