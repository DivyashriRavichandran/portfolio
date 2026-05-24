"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FaLinkedin, FaGithub, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiMapPinSimpleFill } from "react-icons/pi";

export default function Hero() {
  return (
    <section className="w-full pt-5 md:pt-10 flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-6 md:gap-8">
      {/* LEFT SIDE: INTRO & CONTENT */}
      <div className="flex-1 max-w-2xl min-w-0 flex flex-col gap-3 md:gap-5">
        <div className="space-y-1.5 md:space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Divyashri Ravichandran
          </h1>

          <p className="text-sm md:text-base font-medium text-foreground antialiased leading-relaxed">
            Master’s Student at RUG{" "}
            <span className="text-muted-foreground px-1 font-normal">•</span>{" "}
            Software Engineer
          </p>
        </div>

        {/* LOCATION & CURRENT STATE */}
        <div className="flex flex-wrap items-center gap-x-2 md:gap-x-4 text-xs md:text-sm text-muted-foreground">
          <span className="flex items-center gap-0.5 md:gap-1">
            <PiMapPinSimpleFill size={14} className="text-primary" />
            Groningen, Netherlands
          </span>
          <span className="flex items-center gap-1 md:gap-1.5">
            <span className="size-1.5 md:size-2 rounded-full bg-primary" />
            Available for Fall Internships
          </span>
        </div>

        {/* ACTION ROW */}
        <div className="mt-2 md:mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs md:text-sm text-muted-foreground">
          {[
            { label: "LinkedIn", href: "#", icon: FaLinkedin },
            { label: "GitHub", href: "#", icon: FaGithub },
            {
              label: "Email",
              href: "mailto:contact@divyashri.nl",
              icon: MdEmail,
            },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-200 group"
            >
              <link.icon className="size-3.5 md:size-4" />
              <span className="underline-offset-4 group-hover:underline">
                {link.label}
              </span>
            </Link>
          ))}

          {/* Resume */}
          <Link
            href="#"
            className="md:ml-2 flex items-center gap-1 group font-medium text-foreground hover:text-foreground transition-colors duration-200"
          >
            <span className="underline underline-offset-4 decoration-muted-foreground/40 group-hover:decoration-foreground">
              resume.pdf
            </span>
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 text-muted-foreground group-hover:text-foreground"
            />
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE: AVATAR */}
      <div className="relative shrink-0 self-start md:self-auto md:ml-8">
        <div className="relative size-32 md:size-40 overflow-hidden border">
          <Image
            src="/new_image.jpeg"
            className="object-cover scale-160"
            alt="Divyashri Ravichandran"
            fill
            sizes="(max-width: 768px) 96px, 128px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
