"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useTranslations } from "next-intl";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import { useLoading } from "../LoadingProvider";
import { IoLocationSharp } from "react-icons/io5";

export default function Hero() {
  const t = useTranslations();
  const about = useQuery(api.about.get);
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    if (about === undefined) {
      startLoading();
    } else {
      stopLoading();
    }

    return () => stopLoading();
  }, [about, startLoading, stopLoading]);

  if (about === null || about === undefined) {
    return null;
  }

  return (
    <section className="space-y-3 md:space-y-5">
      {/* PROFILE */}
      <div className="flex gap-3 md:gap-4">
        <div className="relative size-12 md:size-16 shrink-0 overflow-hidden rounded-full bg-white border">
          <Image
            src={about?.imageUrl || "/logo.png"}
            alt="Divyashri Ravichandran"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="mb-1 font-serif text-xl font-medium italic leading-none text-foreground md:text-3xl">
            Divyashri Ravichandran
          </h1>

          <p className="text-xs md:text-base tracking-wide text-muted-foreground">
            {t("masters-student-at-rug")} | {t("software-engineer")}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center gap-3 text-xs md:text-sm">
        {/* LOCATION */}
        <div className="flex items-center gap-1 text-muted-foreground">
          <IoLocationSharp className="size-3 md:size-4 text-foreground" />
          <span>Groningen, Netherlands</span>
        </div>

        {/* SOCIAL + CV */}
        <div className="flex flex-wrap items-center gap-x-3 md:gap-x-5 gap-y-1">
          <Link
            href={about?.linkedin || ""}
            target="_blank"
            className="text-muted-foreground transition hover:text-foreground"
            title="LinkedIn"
          >
            <FaLinkedin className="size-4 md:size-5" />
          </Link>

          <Link
            href={about?.github || ""}
            target="_blank"
            className="text-muted-foreground transition hover:text-foreground"
            title="GitHub"
          >
            <FaGithub className="size-4 md:size-5" />
          </Link>

          <Link
            href={`mailto:${about?.email}`}
            className="text-muted-foreground transition hover:text-foreground"
            title="Email"
          >
            <MdEmail className="size-4.5 md:size-5.5" />
          </Link>

          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium group flex items-center md:gap-1.5 gap-1 text-foreground underline underline-offset-4 transition hover:opacity-80"
          >
            <span>CV.pdf</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
