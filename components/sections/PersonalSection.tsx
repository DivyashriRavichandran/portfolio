"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollAnimation from "../animations/ScrollAnimation";
import Heading from "../Heading";
import shape1 from "@/assets/images/13.png";
import shape2 from "@/assets/images/cube.png";

import { RotateWords } from "../animations/RotateWords";

export default function PersonalSection() {
  const hobbies = [
    "play the last of us 🎮",
    "binge sci-fi series 👽",
    "design UI/UX for apps 🎨",
    "make music 🎶",
  ];
  // SPOTIFY TRACKS
  const tracks = [
    { id: "3c0IzRLA4OtKgcsaub6Yv9" },
    { id: "2WfaOiMkCvy7F5fcp2zZ8L" },
    { id: "13M4YIND38VDlSfdxKLgpl" },
  ];
  return (
    <section className="relative py-10 md:py-20 overflow-clip">
      {/* GRADIENT */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 h-40 w-60 rounded-full bg-radial from-primary/50 to-secondary/50 blur-[200px]" />

      {/* TITLE - MOBILE */}
      <div className="lg:hidden text-center">
        <Heading title={"Beyond Portfolio"} subtitle={"More about me"} />
      </div>

      <div className="md:container md:mx-auto px-4 mt-8 lg:mt-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TITLE */}
        <div className="hidden lg:inline-block relative col-start-1 row-start-1 lg:row-span-2">
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
            className="relative h-full rounded-xl bg-card p-0 border shadow-sm"
          >
            <Image
              src="/map.png"
              alt=""
              width={1000}
              height={1000}
              className="zoom-in-90 w-full h-full rounded-xl object-cover object-left"
            />
            <div className="absolute bottom-4 left-4 bg-card/20 dark:bg-card border backdrop-blur-sm px-2.5 py-2 rounded-full flex items-center gap-1">
              <div className="size-4 bg-gradient-to-t from-primary to-secondary mask-location-icon" />
              <span className="text-xs tracking-tight">Doha, Qatar</span>
            </div>
            <div className="p-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-12 rounded-full gradient-light flex items-center justify-center">
              <Image
                src="/emoji.png"
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
          className="relative lg:col-start-2 lg:row-span-6 h-[250px] lg:h-auto"
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="z-0 relative h-full rounded-xl bg-muted/20 p-6 border shadow-sm overflow-clip"
          >
            <Image
              src={shape1}
              alt=""
              width={500}
              height={500}
              className="blur-[80px] absolute -left-5 top-1/2 -rotate-20 w-full object-cover opacity-70"
            />

            {/* Heading */}
            <div className="flex items-center gap-2">
              <div className="size-5 bg-gradient-to-t from-primary to-secondary mask-sparkle-icon" />
              <h3 className="text-xl font-bold tracking-tight">
                When I&apos;m Not Coding
              </h3>
            </div>

            <div className="absolute inset-0 px-6 justify-center mx-auto items-center flex">
              <RotateWords words={hobbies} />
            </div>
          </motion.div>
        </ScrollAnimation>

        {/* MUSIC */}
        <ScrollAnimation
          delay={0.5}
          className="lg:col-start-3 lg:row-span-6 relative"
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="relative overflow-clip h-full rounded-xl bg-muted/20 p-6 border shadow-sm"
          >
            <Image
              src={shape2}
              alt=""
              width={500}
              height={500}
              className="blur-2xl absolute rotate-20 top-0 right-0 w-[250px] object-cover"
            />
            <div className="flex items-center gap-2 mb-4">
              <div className="size-5 bg-gradient-to-t from-primary to-secondary mask-music-icon" />
              <h3 className="text-lg md:text-xl font-semibold">
                Currently listening to
              </h3>
            </div>
            <div className="space-y-4">
              {tracks.map((track, i) => (
                <div key={i} className="lg:hover:scale-[1.02] transition">
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
