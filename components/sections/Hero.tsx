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
    <section className="space-y-4 md:space-y-6">
      {/* PROFILE */}
      <div className="flex gap-3 md:gap-4">
        <div className="relative size-12 md:size-16 shrink-0 overflow-hidden rounded-full bg-white">
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

      {/* INFO */}
      <div className="hidden flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-foreground" />
          <span>Doha, Qatar</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-primary" />
          <span>
            Open to <span className="text-foreground">Internship</span> &{" "}
            <span className="text-foreground">Part-time</span>
          </span>
        </div>
      </div>

      {/* SOCIAL + CV */}
      <div className="flex flex-wrap items-center gap-x-4 md:gap-x-6 gap-y-1 text-xs md:text-sm">
        <Link
          href={about?.linkedin || ""}
          target="_blank"
          className="flex items-center md:gap-1.5 gap-1 text-muted-foreground transition hover:text-foreground hover:underline underline-offset-4"
          title="LinkedIn"
        >
          <FaLinkedin className="size-3 md:size-4" />
          LinkedIn
        </Link>

        <Link
          href={about?.github || ""}
          target="_blank"
          className="flex items-center md:gap-1.5 gap-1 text-muted-foreground transition hover:text-foreground hover:underline underline-offset-4"
          title="GitHub"
        >
          <FaGithub className="size-3 md:size-4" />
          GitHub
        </Link>

        <Link
          href={`mailto:${about?.email}`}
          className="flex items-center md:gap-1.5 gap-1 text-muted-foreground transition hover:text-foreground hover:underline underline-offset-4"
          title="Email"
        >
          <MdEmail className="size-3 md:size-4" />
          Email
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
    </section>
  );
}
