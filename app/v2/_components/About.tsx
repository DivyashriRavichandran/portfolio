"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Terminal,
  Music,
  Monitor,
  Keyboard,
  CpuIcon,
  Laptop,
  Mouse,
  Gamepad2Icon,
  HeadphonesIcon,
  ChevronDown,
  BookIcon,
  LanguagesIcon,
  StarIcon,
  PodcastIcon,
  Speaker,
  MusicIcon,
} from "lucide-react";
import data from "@/data/data.json";
import Subheading from "./Subheading";
import Image from "next/image";
import Heading from "./Heading";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const techBooks = [
  {
    title: "Designing Data Intensive Applications",
    author: "Martin Kleppmann",
    status: "Currently Reading",
    cover: "/book1.jpeg",
    category: "System Design",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    status: "Completed",
    cover: "/book1.jpeg",
    category: "Architecture",
  },
];

const personalFocus = [
  {
    logo: LanguagesIcon,
    title: "Linguistics",
    subtitle: "Dutch (A2 Level)",
  },
  {
    logo: MusicIcon,
    title: "Instrument",
    subtitle: "Piano & Guitar",
  },
  {
    logo: Gamepad2Icon,
    title: "Gaming",
    subtitle: "The Last of Us Part II",
  },
  {
    logo: PodcastIcon,
    title: "Podcast",
    subtitle: "Syntax, Smosh Mouth",
  },
];

const About = () => {
  const about = useQuery(api.about.get);
  const containerRef = useRef(null);
  const extraRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const setup = [
    { icon: <Laptop size={14} />, name: "MacBook Pro M5" },
    { icon: <Monitor size={14} />, name: "27' LG 4K" },
    { icon: <Mouse size={14} />, name: "MX Master 3S" },
    { icon: <Keyboard size={14} />, name: "Logitech Mini" },
    { icon: <HeadphonesIcon size={14} />, name: "Sennheiser HD" },
    { icon: <Speaker size={14} />, name: "Bose 2921" },
  ];

  const toggleSection = () => {
    if (!extraRef.current) return;
    const el = extraRef.current;
    if (!isOpen) {
      gsap.set(el, { display: "block" });
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.7, ease: "power3.out" },
      );
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          gsap.set(el, { display: "none" });
        },
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <section
      ref={containerRef}
      className="px-5 md:container md:mx-auto py-8 md:py-16"
    >
      <Heading text1={"About"} text2={"Me"} />

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <p className="reveal-text text-lg md:text-2xl max-w-2xl">
            <span>
              Hi! I&apos;m Divyashri, a frontend developer based in Qatar. I
              have a passion for crafting immersive digital experiences that
              blend creativity with code.
            </span>
            <br />
            <span className="mt-6 block">
              With a background in software engineering and a love for design, I
              specialize in building visually stunning and highly functional web
              applications.
            </span>
            <br />
            <span className="block">
              Currently learning Java and Spring Boot to expand into full-stack
              developer. I also have a high-focus of system design and
              architecture.
            </span>
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="about-panel p-6 rounded-lg border bg-foreground/5">
            <Subheading icon={Terminal} text="Tech Stack" />
            <div className="flex flex-wrap gap-2">
              {about?.tech_stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
            <button
              onClick={toggleSection}
              className="w-full mt-8 flex items-center justify-between group pt-4 border-t border-foreground/5"
            >
              <span className="text-xs uppercase tracking-widest opacity-50 group-hover:opacity-100 transition">
                Explore Life Beyond Code
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={extraRef}
        style={{ display: "none" }}
        className="overflow-hidden pt-12 space-y-12"
      >
        {/* ROW 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 about-panel p-6 rounded-lg border bg-foreground/5">
            <Subheading icon={CpuIcon} text="Hardware" />
            <div className="grid grid-cols-2 gap-3">
              {setup.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-3 rounded-lg bg-foreground/5 border border-transparent hover:border-primary/20 transition"
                >
                  <span className="text-primary">{item.icon}</span>
                  <span className="text-[10px] md:text-xs font-medium">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 about-panel p-6 rounded-lg border bg-foreground/5">
            <Subheading icon={Music} text="Current Rotation" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.about.spotify_tracks.map((id, i) => (
                <iframe
                  key={i}
                  src={`https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`}
                  width="100%"
                  height="80"
                  loading="lazy"
                  className="rounded-xl"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="about-panel">
          <Subheading icon={BookIcon} text="Tech Books I've Read" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techBooks.map((book, i) => (
              <div
                key={i}
                className="group flex gap-5 p-5 rounded-lg border bg-foreground/5 hover:bg-foreground/5 transition"
              >
                <div className="relative w-24 h-32 shrink-0 shadow-2xl rounded overflow-hidden border border-foreground/10 group-hover:scale-105 transition-transform">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <Badge className="capitalize">{book.category}</Badge>
                  <h4 className="mt-3 text-sm font-medium leading-snug">
                    {book.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {book.author}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${book.status === "Completed" ? "bg-green-500" : "bg-primary"}`}
                    />
                    <span className="text-[10px] uppercase font-semibold text-muted-foreground">
                      {book.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 3 */}
        <div className="about-panel mt-12 p-8 rounded-lg border bg-foreground/5 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-[80px] -z-10" />

          <Subheading icon={StarIcon} text="Hobbies" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {personalFocus.map((item, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="p-3 rounded-2xl bg-foreground/5 border border-transparent group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-300">
                  <item.logo
                    size={20}
                    className="text-primary opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div>
                  <h4 className="text-muted-foreground text-[10px] uppercase tracking-widest font-semibold mb-0.5">
                    {item.title}
                  </h4>
                  <p className="text-sm truncate">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
