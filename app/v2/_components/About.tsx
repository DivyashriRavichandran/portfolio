"use client";
import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Terminal,
  Layers,
  Music,
  MousePointer2,
  Monitor,
  Keyboard,
  CpuIcon,
  FilmIcon,
  BookIcon,
  Laptop,
} from "lucide-react";
import data from "@/data/data.json";
import Subheading from "./Subheading";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const containerRef = useRef(null);

  const personalSections = [
    {
      logo: FilmIcon,
      title: "Favourite Film",
      content: "Harry Potter and the Prisoner of Azkaban (2004)",
    },
    {
      logo: BookIcon,
      title: "Favourite Book",
      content: "The Alchemist by Paulo Coelho",
    },
    {
      logo: MousePointer2,
      title: "Hobbies",
      content: "Traveling, Cooking, Football, Photography",
    },
    {
      logo: CpuIcon,
      title: "Fun Fact",
      content: "I have a collection of over 100 vinyl records.",
    },
  ];

  const setup = [
    { icon: <MousePointer2 size={14} />, name: "Logitech MX Master 3S" },
    { icon: <Keyboard size={14} />, name: "Keychron Q1 Pro (Brown Switches)" },
    { icon: <Monitor size={14} />, name: '34" Dell UltraSharp Curved' },
    { icon: <Laptop size={14} />, name: "MacBook Pro M5" },
  ];

  // Replace these with your actual Spotify track IDs
  const spotifyTrackIds = [
    "3c0IzRLA4OtKgcsaub6Yv9",
    "2WfaOiMkCvy7F5fcp2zZ8L",
    "13M4YIND38VDlSfdxKLgpl",
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
      className="px-6 md:px-16 py-10 md:py-24 space-y-16"
    >
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
            {data.about.skills.map((tech) => (
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
        <div className="lg:col-span-8 about-panel">
          <Subheading icon={Music} text="Spotify Top Tracks" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {spotifyTrackIds.map((id, i) => (
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
        <div className="lg:col-span-4 about-panel">
          <Subheading icon={CpuIcon} text="Hardware Setup" />
          <div className="space-y-3">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {personalSections.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-[2rem] bg-foreground/[0.03] border border-foreground/5 hover:bg-foreground/[0.05] transition-all group"
            >
              <div className="size-10 rounded-xl bg-background mb-6 flex items-center justify-center border border-foreground/10 group-hover:border-[#d0fe38]/50 transition-colors">
                <item.logo
                  size={20}
                  className="text-[#d0fe38] opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <h4 className="text-[10px] uppercase font-semibold tracking-widest opacity-60 mb-2">
                {item.title}
              </h4>
              <p className="text-base">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
