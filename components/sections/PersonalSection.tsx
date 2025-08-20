"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollAnimation from "../custom/ScrollAnimation";
import Heading from "../Heading";
import { RotateWords } from "../custom/RotateWords";
import shape1 from "@/assets/images/hero shapes/controller.png";
import shape2 from "@/assets/images/hero shapes/headphones.png";
import { useState } from "react";

const hobbies = [
  {
    word: "play the last of us",
    shape: shape1, // controller
  },
  {
    word: "binge sci-fi series 👽",
    shape: shape1, // e.g., alien/TV shape
  },
  {
    word: "design UI/UX for apps 🎨",
    shape: shape1, // paintbrush
  },
  {
    word: "make music 🎶",
    shape: shape2, // music note
  },
];

export default function PersonalSection() {
  const tracks = [
    { id: "3c0IzRLA4OtKgcsaub6Yv9" },
    { id: "2WfaOiMkCvy7F5fcp2zZ8L" },
    { id: "13M4YIND38VDlSfdxKLgpl" },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="relative py-10 md:py-20 bg-muted/30">
      {/* Title */}
      <div className="md:hidden text-center">
        <Heading title={"Beyond Portfolio"} subtitle={"More about me"} />
      </div>

      <div className="md:container md:mx-auto px-4 mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-3 md:grid-rows-6 gap-6">
        {/* TITLE */}
        <div className="hidden md:inline-block relative col-start-1 row-start-1 row-span-2">
          <Heading
            title={"Beyond Portfolio"}
            subtitle={"More about me"}
            className="text-left"
          />
        </div>

        {/* MAP */}
        <ScrollAnimation
          delay={0.1}
          className="md:col-start-1 md:row-start-3 md:row-span-4"
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="relative h-60 rounded-xl bg-muted p-0 border shadow-sm"
          >
            <Image
              src="/map.png"
              alt=""
              width={1000}
              height={1000}
              className="zoom-in-90 w-full h-60 rounded-xl object-cover object-left"
            />
            <div className="absolute bottom-4 left-4 bg-card border font-medium backdrop-blur-xs px-2.5 py-2 rounded-full flex items-center gap-1">
              <div className="size-4 bg-gradient-to-t from-primary to-secondary mask-location-icon" />
              <span className="text-xs">Doha, Qatar</span>
            </div>
            <div className="p-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-12 rounded-full gradient-light flex items-center justify-center">
              <Image
                src="/emoji2.png"
                alt="Memoji"
                width={200}
                height={200}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </motion.div>
        </ScrollAnimation>

        {/* HOBBIES */}
        <ScrollAnimation
          delay={0.3}
          className="lg:col-start-2 lg:row-span-6 h-[250px] lg:h-auto "
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="z-0 relative h-full rounded-xl bg-muted p-6 border shadow-sm overflow-clip"
          >
            {/* Heading */}
            <div className="flex items-center gap-2">
              <div className="size-5 bg-gradient-to-t from-primary to-secondary mask-sparkle-icon" />
              <h3 className="text-xl font-bold tracking-tight">
                When I&apos;m Not Coding
              </h3>
            </div>

            {/* title */}
            <div className="w-full text-center left-1/2 -translate-x-1/2 absolute bottom-6 z-20">
              <span className="hidden italic tracking-tight bg-black font-semibold text-4xl px-1">
                {hobbies[currentIndex].word}
              </span>
            </div>

            {/* Floating Shape */}
            <motion.div className="-z-10 absolute -bottom-10 w-full opacity-80">
              <Image
                src={hobbies[currentIndex].shape}
                alt=""
                className="w-full object-contain"
              />
            </motion.div>

            <div className="-z-20 absolute bg-gradient-to-b w-full h-40 bottom-0 blur-3xl from-primary to-secondary" />
          </motion.div>
        </ScrollAnimation>

        {/* MUSIC */}
        <ScrollAnimation delay={0.5} className="lg:col-start-3 lg:row-span-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="relative overflow-clip h-full rounded-xl bg-muted p-6 border shadow-sm backdrop-blur-md"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="size-5 bg-gradient-to-t from-primary to-secondary mask-music-icon" />
              <h3 className="text-lg md:text-xl font-semibold">
                Currently listening to
              </h3>
            </div>
            <div className="space-y-4">
              {tracks.map((track, i) => (
                <div key={i} className="hover:scale-[1.02] transition">
                  <iframe
                    style={{ borderRadius: "16px" }}
                    src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                </div>
              ))}
            </div>
          </motion.div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
