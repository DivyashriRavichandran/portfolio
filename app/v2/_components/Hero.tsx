"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="w-full flex flex-col md:pt-10 gap-4">
      {/* AVATAR & NAME */}
      <div className="flex flex-col items-center mx-auto gap-3">
        <div className="relative group">
          <Image
            src="/emoji.png"
            className="shrink-0 rounded-full w-20 h-fit border"
            alt="avatar"
            width={144}
            height={144}
            priority
          />

          <span
            className="absolute bottom-0 -right-1 text-2xl"
            role="img"
            aria-label="waving hand"
          >
            👋
          </span>
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold uppercase leading-[0.9]">
            Divyashri <br />
            <span className="text-muted-foreground/80">Ravichandran</span>
          </h1>
        </div>
      </div>

      {/* Tagline */}
      <div className="flex flex-col gap-1 justify-center mx-auto text-center">
        <p className="text-sm font-medium antialiased">
          Masters Student @ RUG | Software Engineer
        </p>
        <p className="text-xs flex items-center gap-1.5 text-muted-foreground mx-auto">
          <FaMapMarkerAlt className="size-3.5" />
          <span>Groningen, Netherlands</span>
        </p>
      </div>

      {/* SOCIALS & RESUME */}
      <div className="mx-auto justify-center flex flex-col gap-1">
        <div className="flex items-center">
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
                <span className="overflow-hidden whitespace-nowrap text-xs font-medium opacity-0 max-w-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:max-w-30 group-hover:opacity-100">
                  {link.label}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="#"
          className="mx-auto flex items-center gap-1 md:gap-2 group text-muted-foreground"
        >
          <span className="text-xs md:text-sm transition-all duration-300 decoration-[0.5px] group-hover:decoration-primary group-hover:text-primary underline underline-offset-4">
            resume.pdf
          </span>

          <ArrowUpRight
            size={16}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary transition"
          />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
