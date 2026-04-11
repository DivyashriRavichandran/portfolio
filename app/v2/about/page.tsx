"use client";
import {
  Cpu,
  Music,
  Gamepad2,
  BookOpen,
  Star,
  Monitor,
  MousePointer2,
  Keyboard,
  Headphones,
  LucideIcon,
  Terminal,
  Zap,
} from "lucide-react";
import Heading from "../_components/Heading";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Navbar from "../_components/Navbar";

export default function AboutPage() {
  const t = useTranslations();

  const hardware = [
    { icon: Monitor, label: "MacBook Pro M5 & LG 27” 4K" },
    { icon: MousePointer2, label: "MX Master 3S" },
    { icon: Keyboard, label: "Logitech MX Mechanical Mini" },
    { icon: Headphones, label: "Sennheiser HD 600" },
  ];

  const books = [
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      status: "Reading",
    },
    { title: "Clean Code", author: "Robert C. Martin", status: "Completed" },
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt",
      status: "Completed",
    },
    { title: "Refactoring UI", author: "Steve Schoger", status: "Completed" },
  ];

  const software = [
    { name: "VS Code", category: "Editor", theme: "Tokyo Night" },
    { name: "Warp", category: "Terminal", theme: "Custom" },
    { name: "Arc", category: "Browser", theme: "Space Gray" },
    { name: "Raycast", category: "Productivity", theme: "Default" },
  ];

  return (
    <main className="md:max-w-4xl md:mx-auto px-5 md:px-0">
      <Navbar />

      <div className="space-y-6 mb-20 py-10 md:py-40">
        <Heading text1="More About" text2="Me" />
        <p className="text-lg text-muted-foreground leading-relaxed">
          A curated list of things I use, consume, and enjoy.
        </p>
      </div>

      <div className="space-y-12">
        {/* HARDWARE SECTION */}
        <section>
          <SectionHeader icon={Cpu} title="The Toolkit" subtitle="Hardware" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hardware.map((item, i) => (
              <div
                key={i}
                className="flex gap-2 items-center p-4 bg-muted/80 rounded-md border border-transparent hover:border-primary/20 transition-all"
              >
                <item.icon size={18} className="opacity-80 text-primary" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SOFTWARE SECTION */}
        <section>
          <SectionHeader
            icon={Terminal}
            title="The Stack"
            subtitle="Software"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {software.map((app) => (
              <div
                key={app.name}
                className="p-3 bg-muted/80 rounded-md border border-transparent hover:border-primary/20 transition-all"
              >
                <p className="text-xs md:text-sm font-semibold">{app.name}</p>
                <p className="md:mt-1 text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                  {app.category}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* BOOKS SECTION */}
        <section>
          <SectionHeader
            icon={BookOpen}
            title="Library"
            subtitle={`${books.length} Books`}
          />
          <div className="space-y-1">
            {books.map((book, i) => (
              <div
                key={i}
                className="group flex items-center justify-between py-4 border-b border-muted-foreground/20 hover:px-1 transition-all"
              >
                <div>
                  <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {book.author}
                  </p>
                </div>
                <Badge
                  variant={book.status === "Reading" ? "default" : "success"}
                >
                  {book.status}
                </Badge>
              </div>
            ))}
          </div>
        </section>

        {/* CURRENTLY LEARNING */}
        <section>
          <SectionHeader
            icon={Zap}
            title="Currently Learning"
            subtitle="2026"
          />
          <div className="flex flex-wrap gap-2">
            {["System Design", "Spring Boot", "Docker"].map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </section>

        {/* MUSIC SECTION */}
        <section>
          <SectionHeader
            icon={Music}
            title="Spotify"
            subtitle="Recent Tracks"
          />
          <div className="w-full overflow-hidden rounded-md border ">
            <iframe
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/track/10v91ZWyBr3hl766vY9pYv?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </section>

        {/* MISC INFO (GAME & HOBBIES) */}
        <section>
          <SectionHeader icon={Gamepad2} title="Gaming" />
          <div className="relative aspect-video rounded-md overflow-hidden group border">
            <div className="absolute inset-0  transition-colors z-10" />
            <Image
              src="/advent-of-code.png"
              className="object-cover w-full h-full"
              alt="Game"
              width={500}
              height={500}
            />
            <div className="absolute bottom-4 left-4 z-20">
              <p className="text-[10px] uppercase font-semibold tracking-widest">
                Favorite Game
              </p>
              <p>The Last of Us Part II</p>
            </div>
          </div>
        </section>

        {/* HOBBIES SECTION */}
        <section>
          <SectionHeader icon={Star} title="Hobbies" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Learning Dutch", emoji: "🇳🇱", detail: "Level A2" },
              { label: "Podcasts", emoji: "🎧", detail: "Tech & Comedy" },
              {
                label: "Keyboard",
                emoji: "🎹",
                detail: "Arrangers",
              },
              { label: "Travelling", emoji: "🌍", detail: "15+ Countries" },
            ].map((hobby) => (
              <div
                key={hobby.label}
                className="group flex items-center gap-4 p-3 rounded border border-muted-foreground/20 hover:border-primary/30 transition-all"
              >
                <div className="size-10 flex items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 group-hover:scale-110 transition-all text-xl">
                  {hobby.emoji}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                    {hobby.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest opacity-80">
                    {hobby.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
}) => (
  <div className="flex items-center justify-between mb-8 pb-2 border-b">
    <div className="flex items-center gap-3">
      <Icon size={20} className="text-primary" />
      <h2 className="text-sm uppercase tracking-widest font-semibold">
        {title}
      </h2>
    </div>
    {subtitle && (
      <span className="text-[10px] uppercase tracking-widest opacity-40 font-semibold hidden sm:block">
        {subtitle}
      </span>
    )}
  </div>
);
