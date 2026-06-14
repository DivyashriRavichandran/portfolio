"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiMapPinSimpleFill } from "react-icons/pi";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations();
  return (
    <section className="w-full flex flex-col-reverse md:flex-row md:items-stretch md:justify-between gap-6 md:gap-8">
      {/* LEFT SIDE: INTRO & CONTENT */}
      <div className="flex-1 max-w-2xl min-w-0 flex flex-col gap-4 md:gap-5 justify-between">
        <div className="space-y-1 md:space-y-1.5">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Divyashri Ravichandran
          </h1>

          <p className="text-sm md:text-base text-foreground antialiased leading-relaxed font-medium">
            {t("masters-student-at-rug")} & {t("software-engineer")}
          </p>
        </div>

        {/* LOCATION & CURRENT STATE */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm">
          <span className="flex items-center gap-1.5">
            <PiMapPinSimpleFill size={14} className="text-primary" />
            {t("groningen-netherlands")}
          </span>

          <span className="flex items-center gap-2 border bg-muted px-2 py-0.5 rounded-sm">
            <span className="relative flex size-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full size-1.5 bg-primary"></span>
            </span>
            Available for Internships & Part-time
          </span>
        </div>

        {/* ACTION ROW */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs md:text-sm text-muted-foreground pt-1">
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
            className="md:ml-1 flex items-center gap-1 group font-medium text-foreground transition-colors duration-200"
          >
            <span className="underline underline-offset-4 decoration-border group-hover:decoration-foreground">
              CV.pdf
            </span>
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 text-muted-foreground group-hover:text-foreground"
            />
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE: AVATAR */}
      <div className="shrink-0 size-28 md:w-40 md:h-auto">
        <div className="relative h-full w-full overflow-hidden rounded-sm">
          <Image
            src="/new_image.jpeg"
            className="object-cover object-center scale-170"
            alt="Divyashri Ravichandran"
            fill
            sizes="(max-width: 768px) 96px, 144px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
