"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Terminal,
  Layers,
  Music,
  Monitor,
  Keyboard,
  CpuIcon,
  FilmIcon,
  Laptop,
  Mouse,
  ZapIcon,
  TvIcon,
  Gamepad2Icon,
  HeadphonesIcon,
} from "lucide-react";
import data from "@/data/data.json";
import Subheading from "./Subheading";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const containerRef = useRef(null);

  const personalSections = [
    {
      logo: FilmIcon,
      title: "Favourite Film",
      content: "Superman (2025)",
      image: "/superman.jpg",
    },
    {
      logo: TvIcon,
      title: "Currently Binging",
      content: "Stranger Things",
      image: "/st.jpg",
    },
    {
      logo: Gamepad2Icon,
      title: "Favourite Game",
      content: "The Last of Us Part II",
      image: "/tlou.jpg",
    },
    {
      logo: ZapIcon,
      title: "Fun Fact",
      content: "I can solve the Rubik's Cube in under a minute.",
    },
  ];

  const setup = [
    { icon: <Laptop size={14} />, name: "MacBook Pro M5" },
    { icon: <Monitor size={14} />, name: "27' LG 4K Monitor" },
    { icon: <Mouse size={14} />, name: "Logitech MX Master 3S" },
    { icon: <Keyboard size={14} />, name: "Logitech MX Keys Mini" },
    { icon: <HeadphonesIcon size={14} />, name: "Sennheiser HD 458BT" },
  ];

  useGSAP(
    () => {
      gsap.from(".about-panel", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ".about-panel", start: "top 90%" },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="px-6 md:container md:mx-auto py-10 md:py-24 space-y-16"
    >
      {/* Section Header */}
      <div className="flex justify-between items-end mb-16 border-b border-foreground/10 pb-6">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
          About <span className="text-[#d0fe38]">Me.</span>
        </h2>
        <p className="text-[10px] uppercase font-medium tracking-[0.2em] opacity-40 text-right"></p>
      </div>
      {/* 1. INTRO & TECH STACK */}
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-8">
          <p className="reveal-text text-xl md:text-2xl max-w-2xl">
            Hi! I&apos;m Divyashri, a frontend developer based in Qatar. I have
            a passion for crafting immersive digital experiences that blend
            creativity with code.
            <br />
            <span className="mt-6 block">
              With a background in software engineering and a love for design, I
              specialize in building visually stunning and highly functional web
              applications.
            </span>
          </p>
        </div>
        <div className="lg:col-span-5 about-panel">
          <Subheading icon={Terminal} text="Tech Stack" />
          <div className="flex flex-wrap gap-2">
            {data.about.tech_stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-foreground/5 border border-foreground/10 rounded-lg text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 2. SPOTIFY TOP TRACKS (Left Side) */}
        <div className="lg:col-span-9 about-panel">
          <Subheading icon={Music} text="Spotify Top Tracks" />
          <div className="grid grid-cols-2  gap-4">
            {data.about.spotify_tracks.map((id, i) => (
              <iframe
                key={i}
                src={`https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-2xl opacity-80 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>

        {/* 3. HARDWARE SETUP (Right Side) */}
        <div className="lg:col-span-3 about-panel">
          <Subheading icon={CpuIcon} text="Hardware Setup" />
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {setup.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-foreground/[0.03] border border-foreground/5 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#d0fe38] opacity-50">{item.icon}</span>
                  <span className="text-sm opacity-80 font-medium">
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. PERSONAL SYSTEM LOG (Beyond Code) */}
      <div className="about-panel">
        <Subheading icon={Layers} text="Beyond Code" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {personalSections.map((item, i) => (
            <div
              key={i}
              className="relative overflow-hidden flex flex-col min-h-[220px] p-5 md:p-7 rounded-[2rem] bg-foreground/[0.03] border border-foreground/5 hover:border-[#d0fe38]/30 transition-all duration-500 group"
            >
              {/* BACKGROUND IMAGE REVEAL */}
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <Image
                  src={
                    item.image ??
                    "https://images.pexels.com/photos/34879499/pexels-photo-34879499.jpeg"
                  }
                  alt={item.title}
                  fill
                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
                />
                {/* Dark Aesthetic Gradient - Masks the left side for text readability */}
                <div className="absolute inset-0 bg-linear-to-br from-background via-background/80 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="relative z-10 flex flex-col h-full">
                <item.logo
                  size={20}
                  className="size-10 p-2.5 rounded-xl bg-background border border-foreground/10 text-[#d0fe38] group-hover:scale-110 transition-transform duration-500"
                />

                <div className="mt-auto">
                  <h4 className="text-[10px] uppercase font-semibold tracking-widest opacity-40 mb-1 group-hover:opacity-100 group-hover:text-[#d0fe38] transition-all">
                    {item.title}
                  </h4>
                  <p className="text-sm md:text-base font-medium">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
