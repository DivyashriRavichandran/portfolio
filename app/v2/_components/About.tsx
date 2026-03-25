"use client";
import React, { useRef, useState } from "react";
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
  ChevronDown,
  BookIcon,
  LanguagesIcon,
  StarIcon,
  CompassIcon,
  PodcastIcon,
} from "lucide-react";
import data from "@/data/data.json";
import Subheading from "./Subheading";
import Image from "next/image";
import Heading from "./Heading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const containerRef = useRef(null);
  const extraRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const personalSections = [
    {
      logo: BookIcon,
      title: "Reading",
      content: "Designing Data Intensive Applications",
      image: "/superman.jpg",
    },
    {
      logo: PodcastIcon,
      title: "Podcasts",
      content: "Syntax, Smosh Mouth, Barend & Benner",
      image: "/st.jpg",
    },
    {
      logo: Gamepad2Icon,
      title: "Gaming",
      content: "The Last of Us Part II",
      image: "/tlou.jpg",
    },
    {
      logo: LanguagesIcon,
      title: "Languages",
      content: "Learning Dutch",
    },
  ];

  const setup = [
    { icon: <Laptop size={16} />, name: "MacBook Pro M5" },
    { icon: <Monitor size={16} />, name: "27' LG 4K Monitor" },
    { icon: <Mouse size={16} />, name: "Logitech MX Master 3S" },
    { icon: <Keyboard size={16} />, name: "Logitech MX Keys Mini" },
    { icon: <HeadphonesIcon size={16} />, name: "Sennheiser HD 458BT" },
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

  const toggleSection = () => {
    if (!extraRef.current) return;

    const el = extraRef.current;

    if (!isOpen) {
      gsap.set(el, { display: "block" });

      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: el.scrollHeight,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        },
      );

      // stagger children
      gsap.fromTo(
        el.querySelectorAll(".about-panel"),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          delay: 0.2,
          duration: 0.6,
          ease: "power2.out",
        },
      );
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    }

    setIsOpen(!isOpen);
  };

  return (
    <section
      ref={containerRef}
      className="px-6 md:container md:mx-auto py-10 md:py-16"
    >
      {/* Header */}
      <Heading text1={"About"} text2={"Me"} total={0} />

      {/* Intro */}
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* 1. INTRO & TECH STACK */}
        <div className="lg:col-span-7 space-y-8">
          <p className="reveal-text text-xl md:text-2xl max-w-2xl">
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
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          {/* Tech */}
          <div className="about-panel">
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

          {/* BUTTON */}
          <button
            onClick={toggleSection}
            className="ml-auto mt-8 flex items-center gap-3 group"
          >
            <span className="text-sm uppercase tracking-widest opacity-60 group-hover:opacity-100 transition relative">
              Explore beyond code
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
            </span>

            <ChevronDown
              size={18}
              className={`transition-all duration-500 ${
                isOpen ? "rotate-180 text-primary" : "opacity-60"
              }`}
            />
          </button>
        </div>
      </div>

      {/* EXPANDABLE */}
      <div
        ref={extraRef}
        style={{ display: "none", height: 0 }}
        className="overflow-hidden relative pt-10 md:pt-16 space-y-8 md:space-y-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Spotify */}
          <div className="lg:col-span-9 about-panel">
            <Subheading icon={Music} text="Spotify Currently Listening" />
            <div className="grid grid-cols-2 gap-4">
              {data.about.spotify_tracks.map((id, i) => (
                <iframe
                  key={i}
                  src={`https://open.spotify.com/embed/track/${id}?theme=0`}
                  width="100%"
                  height="152"
                  loading="lazy"
                  className="rounded-2xl opacity-80 hover:opacity-100 transition"
                />
              ))}
            </div>
          </div>

          {/* Setup */}
          <div className="lg:col-span-3 about-panel">
            <Subheading icon={CpuIcon} text="Hardware Setup" />
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {setup.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-foreground/[0.03] border border-foreground/5"
                >
                  <span className="text-primary opacity-80">{item.icon}</span>
                  <span className="text-sm opacity-80">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Personal */}
        <div className="about-panel">
          <Subheading icon={StarIcon} text="Interests" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {personalSections.map((item, i) => (
              <div
                key={i}
                className="relative group overflow-hidden p-6 rounded-3xl border border-foreground/5 bg-foreground/[0.03]"
              >
                {/* image */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <Image
                    src={item.image ?? "/fallback.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-br from-black via-black/70 to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <item.logo className="text-primary mb-6" />

                  <div className="mt-auto">
                    <h4 className="text-xs uppercase opacity-60 font-medium mb-1 group-hover:text-primary">
                      {item.title}
                    </h4>
                    <p className="text-sm font-medium">{item.content}</p>
                  </div>
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
