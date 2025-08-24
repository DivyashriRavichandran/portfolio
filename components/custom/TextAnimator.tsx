"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface CopyProps {
  children: React.ReactElement;
  animateOnScroll?: boolean;
  delay?: number;
}

export default function TextAnimator({
  children,
  animateOnScroll = true,
  delay = 0,
}: CopyProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const splitRef = useRef<SplitText | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Kill old split instance before creating a new one
      splitRef.current?.revert();

      // Split text into lines
      splitRef.current = new SplitText(containerRef.current, { type: "lines" });
      const lines = splitRef.current.lines;

      gsap.set(lines, { opacity: 0, y: 50 });

      if (animateOnScroll) {
        gsap.to(lines, {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          duration: 0.8,
          delay,
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      } else {
        gsap.to(lines, {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          duration: 0.8,
          delay,
          stagger: 0.15,
        });
      }

      // Refresh ScrollTrigger after split
      ScrollTrigger.refresh();

      return () => {
        splitRef.current?.revert();
        // If you need to kill all ScrollTriggers, uncomment the next line:
        // ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    },
    {
      scope: containerRef,
      dependencies: [children, animateOnScroll, delay],
    }
  );

  // Re-split on window resize
  useEffect(() => {
    const handleResize = () => {
      splitRef.current?.revert();
      splitRef.current = new SplitText(containerRef.current, { type: "lines" });
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <span ref={containerRef}>{children}</span>;
}
