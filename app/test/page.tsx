"use client";
import Heading from "@/components/Heading";
import { Projects } from "@/components/sections/ProjectsSection";
import { useEffect, useState } from "react";

export default function TestPage() {
  useEffect(() => {
    const elements = document.querySelectorAll(".text");
    elements.forEach((element) => {
      const innerText = element.textContent || "";
      element.innerHTML = "";

      const textContainer = document.createElement("div");
      textContainer.classList.add("block");

      for (const letter of innerText) {
        const span = document.createElement("span");
        span.innerText = letter.trim() === "" ? "\xa0" : letter;
        span.classList.add("letter");
        textContainer.appendChild(span);
      }

      element.appendChild(textContainer);
      element.appendChild(textContainer.cloneNode(true));
    });
  }, []);
  const [pos, setPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);
  return (
    <>
      <section className="md:container md:mx-auto px-4 mt-10 md:mt-20">
        <Heading title={"Latest Works"} subtitle={"Featured Projects"} />

        {/* PROJECT */}
        <div className="mt-6 md:mt-20 overflow-hidden">
          {Projects.map((project, index) => (
            <h1
              key={index}
              className="pathway-gothic text text-[120px] leading-[140px] h-[140px] text-muted-foreground overflow-hidden"
            >
              {project.title}
            </h1>
          ))}
        </div>
      </section>

      <section className="hidden relative h-screen flex items-center justify-center overflow-hidden">
        {/* Your gradient background blobs */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 opacity-80 blur-3xl" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply blur-3xl animate-pulse" />

        {/* Cursor distortion glass */}
        <div
          className="hidden pointer-events-none fixed z-20 rounded-full"
          style={{
            width: "220px",
            height: "220px",
            left: pos.x - 110,
            top: pos.y - 110,
            backdropFilter: "blur(40px) saturate(150%)",
            WebkitBackdropFilter: "blur(40px) saturate(150%)",
          }}
        />

        {/* Content */}
        <h1 className="relative z-10 text-white text-6xl font-bold">
          Hero Section
        </h1>
      </section>
    </>
  );
}
