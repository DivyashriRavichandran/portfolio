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
    <>
      {/* MOBILE */}
      <section className="md:hidden w-full flex flex-col gap-2">
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

          <h1 className="text-3xl font-semibold">Divyashri Ravichandran</h1>
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
        <div className="mx-auto justify-center flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-0.5 bg-muted/40 p-1 rounded-full border border-border/60 backdrop-blur-sm">
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
                <div className="flex items-center gap-0 group-hover:gap-2 px-2.5 py-1 rounded-full bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                  <link.icon className="size-4" />
                  <span className="overflow-hidden whitespace-nowrap text-xs font-medium opacity-0 max-w-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:max-w-24 group-hover:opacity-100">
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

      {/* DESKTOP */}
      <section className="hidden md:flex w-full pt-10 items-center">
        {/* HEADER CONTAINER */}
        <div className="flex gap-6 items-center">
          {/* AVATAR */}
          <div className="relative group shrink-0">
            <Image
              src="/emoji.png"
              className="relative shrink-0 rounded-full size-40 border bg-background object-cover"
              alt="avatar"
              width={144}
              height={144}
              priority
            />
            <span
              className="absolute bottom-1 right-1 text-3xl"
              role="img"
              aria-label="waving hand"
            >
              👋
            </span>
          </div>

          {/* PROFILE INFO & ACTIONS */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold">Divyashri Ravichandran</h1>

            {/* Tagline & Location */}
            <div className="flex flex-col gap-0.5">
              <p className="text-base font-medium antialiased">
                Masters Student @ RUG | Software Engineer
              </p>
              <p className="text-sm flex items-center gap-1.5 text-muted-foreground">
                <FaMapMarkerAlt className="size-4" />
                <span>Groningen, Netherlands</span>
              </p>
            </div>

            {/* CONNECT ACTIONS ROW */}
            <div className="mt-2 flex items-center gap-5">
              {/* Social Pill Links */}
              <div className="flex items-center gap-0.5 bg-muted/40 p-1 rounded-full border border-border/60 backdrop-blur-sm">
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
                    <div className="flex items-center gap-0 group-hover:gap-2 px-2.5 py-1 rounded-full bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                      <link.icon className="size-5" />
                      <span className="overflow-hidden whitespace-nowrap text-xs font-medium opacity-0 max-w-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:max-w-24 group-hover:opacity-100">
                        {link.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Vertical Divider */}
              <div className="h-6 w-px bg-border" />

              {/* Resume */}
              <Link
                href="#"
                className="flex items-center gap-1.5 group text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <span className="text-sm transition-all duration-300 decoration-[0.5px] underline underline-offset-4 group-hover:decoration-primary">
                  resume.pdf
                </span>
                <ArrowUpRight
                  size={15}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
