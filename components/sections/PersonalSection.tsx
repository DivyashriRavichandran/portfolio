/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollAnimation from "../custom/ScrollAnimation";
import Map from "@/assets/images/map.png";
import ScrollingBadges from "../ScrollingBadges";
import Heading from "../Heading";
import { RotateWords } from "../custom/RotateWords";

export default function PersonalSection() {
  return (
    <section className="py-10 md:py-20 bg-muted/30">
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
              className="w-full h-full rounded-xl object-cover object-left"
            />
            <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-xs px-2.5 py-2 rounded-full flex items-center gap-1">
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
          <div className="relative h-full rounded-xl bg-muted p-6 border shadow-sm">
            {/* HEADING */}
            <div className="flex items-center gap-2">
              <div className="size-5 bg-gradient-to-t from-primary to-secondary mask-sparkle-icon" />
              <h3 className="text-xl font-bold tracking-tight">
                When I&apos;m Not Coding
              </h3>
            </div>

            {/* ROTATION WORDS */}
            <div className="px-6 mt-4 absolute inset-0 flex justify-center items-center mx-auto h-full">
              <RotateWords
                words={[
                  "replay The Last of Us 🎮",
                  "binge sci-fi series 👽",
                  "play piano 🎹",
                  "cook new recipes 🍳",
                  "explore new tech 🤖",
                ]}
              />
            </div>
          </div>
        </ScrollAnimation>

        {/* MUSIC */}
        <ScrollAnimation delay={0.5} className="lg:col-start-3 lg:row-span-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="h-full rounded-xl bg-muted p-6 border shadow-sm backdrop-blur-md"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="size-5 bg-gradient-to-t from-primary to-secondary mask-music-icon" />
              <h3 className="text-lg md:text-xl font-semibold">
                Currently listening to
              </h3>
            </div>
            <div className="space-y-4">
              {[
                "3c0IzRLA4OtKgcsaub6Yv9",
                "2WfaOiMkCvy7F5fcp2zZ8L",
                "13M4YIND38VDlSfdxKLgpl",
              ].map((track, i) => (
                <iframe
                  key={i}
                  style={{ borderRadius: "16px" }}
                  src={`https://open.spotify.com/embed/track/${track}?utm_source=generator`}
                  width="100%"
                  height="80"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              ))}
            </div>
          </motion.div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
