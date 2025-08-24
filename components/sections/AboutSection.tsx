"use client";

import React, { useEffect, useRef } from "react";
import Heading from "../Heading";
import TimelineSection from "./TimelineSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextAnimator from "../custom/TextAnimator";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    // Split text into words while preserving inner <span> elements
    textEl.querySelectorAll("p").forEach((p) => {
      const newHTML = Array.from(p.childNodes)
        .map((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            // Split plain text nodes into word spans
            return node
              .textContent!.split(" ")
              .map(
                (w) =>
                  `<span class="word text-muted-foreground/50 transition-colors duration-300">${w}</span>`
              )
              .join(" ");
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Wrap existing elements (like italic) in word spans
            const el = node as HTMLElement;
            const words = el.innerText.split(" ");
            return `<span class="word text-muted-foreground/50 transition-colors duration-300">${words
              .map((w) => `<span class="${el.className}">${w}</span>`)
              .join(" ")}</span>`;
          }
          return "";
        })
        .join(" ");

      p.innerHTML = newHTML;
    });

    const words = textEl.querySelectorAll<HTMLElement>(".word");

    // Timeline with pinning the whole section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: true,
      },
    });

    tl.to(words, {
      className: "word text-foreground",
      stagger: 0.08,
      duration: 0.2,
      ease: "none",
    });
  }, []);

  return (
    <>
      {/* ABOUT SECTION */}
      <div ref={sectionRef} className="pt-10 md:pt-20">
        <div className="bg-muted/50 py-10 md:py-20">
          <div className="md:container md:mx-auto px-4 md:max-w-6xl">
            <Heading title={"About Me"} subtitle={"Know who am I"} />

            <div className="mt-6 md:my-12 mx-auto">
              <TextAnimator animateOnScroll={true} delay={0.2}>
                <div className="text-xl md:text-4xl leading-snug text-muted-foreground">
                  My background in{" "}
                  <span className="tracking-normal playfair-display italic">
                    Computer Science
                  </span>{" "}
                  from the University of Leeds gave me a solid foundation in
                  software engineering and algorithms. Along the way, I
                  discovered a love for{" "}
                  <span className="tracking-normal playfair-display italic">
                    frontend development
                  </span>
                  , where I could blend creativity with functionality. I also
                  enjoy designing{" "}
                  <span className="tracking-normal playfair-display italic">
                    UI/UX
                  </span>
                  , which helps me craft intuitive and engaging digital
                  experiences.
                </div>
              </TextAnimator>
            </div>
          </div>
        </div>
      </div>

      {/* EXPERIENCE SECTION */}
      <div className="mt-10 md:my-20 container mx-auto px-4">
        <Heading title={"My Journey"} subtitle={"Experience & Education"} />
        <TimelineSection />
      </div>
    </>
  );
};

export default AboutSection;
