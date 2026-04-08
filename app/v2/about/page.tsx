"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import LangSwitcher from "../_components/LangSwitcher";
import Heading from "../_components/Heading";
import Subheading from "../_components/Subheading";
import { CpuIcon, Music, Gamepad2, Book, Star } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations();
  return (
    <main className="min-h-screen">
      {/* NAVBAR */}
      <nav className="border-b sticky top-0 z-50 backdrop-blur-sm">
        <div className="md:container md:mx-auto px-5 flex items-center justify-between py-4">
          <Link
            href="/v2"
            className="group text-xs md:text-sm font-medium flex items-center gap-2"
          >
            <div className="size-10 rounded-full border flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
              <ChevronLeft size={16} />
            </div>
            <span className="hidden md:block">{t("back-to-portfolio")}</span>
          </Link>
          <LangSwitcher />
        </div>
      </nav>

      <section className="md:container md:mx-auto px-5 py-12 md:py-16">
        <Heading text1="More About" text2="Me" />

        <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[180px] gap-6 mt-12">
          {/* reorder, add more sections, redesign ui/bento box */}
          {/* HARDWARE */}
          <div className="md:col-span-3 md:row-span-2 group rounded-2xl border bg-foreground/5 p-6 hover:border-primary/30 transition-all hover:-translate-y-1">
            <Subheading icon={CpuIcon} text="Hardware I Use" />

            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li>MacBook Pro M5</li>
              <li>LG 27” 4K Monitor</li>
              <li>MX Master 3S</li>
              <li>Logitech Mini Keyboard</li>
              <li>Sennheiser HD Headphones</li>
              {/* add icons */}
            </ul>
          </div>

          {/* SPOTIFY */}
          <div className="md:col-span-3 md:row-span-2 group rounded-2xl border bg-foreground/5 p-6 hover:border-primary/30 transition-all hover:-translate-y-1">
            <Subheading icon={Music} text="Currently Listening" />

            <div className="mt-6 space-y-3">
              <iframe
                src="https://open.spotify.com/embed/track/..."
                width="100%"
                height="80"
                loading="lazy"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* FAVOURITE GAME */}
          <div className="md:col-span-3 group rounded-2xl border bg-foreground/5 p-6 hover:border-primary/30 transition-all hover:-translate-y-1">
            <Subheading icon={Gamepad2} text="Favourite Game" />
            {/* add image background */}
            <p className="mt-4 text-sm text-muted-foreground">
              The Last of Us Part II
            </p>
          </div>

          {/* TECH BOOKS */}
          <div className="md:col-span-3 group rounded-2xl border bg-foreground/5 p-6 hover:border-primary/30 transition-all hover:-translate-y-1">
            <Subheading icon={Book} text="Tech Books" />

            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">
                  Designing Data-Intensive Applications
                </span>
                <div className="text-xs opacity-70">Martin Kleppmann</div>
                {/* add status, image */}
              </li>

              <li>
                <span className="font-medium text-foreground">Clean Code</span>
                <div className="text-xs opacity-70">Robert C. Martin</div>
              </li>
            </ul>
          </div>

          {/* HOBBIES */}
          <div className="md:col-span-6 group rounded-2xl border bg-foreground/5 p-6 hover:border-primary/30 transition-all hover:-translate-y-1">
            <Subheading icon={Star} text="Hobbies" />

            <div className="flex flex-wrap gap-4 mt-6">
              <div className="px-4 py-2 rounded-full bg-foreground/10 text-sm">
                🎧 Podcasts
              </div>

              <div className="px-4 py-2 rounded-full bg-foreground/10 text-sm">
                🌍 Learning Dutch
              </div>

              <div className="px-4 py-2 rounded-full bg-foreground/10 text-sm">
                🎮 Gaming
              </div>

              <div className="px-4 py-2 rounded-full bg-foreground/10 text-sm">
                📚 Tech books
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
