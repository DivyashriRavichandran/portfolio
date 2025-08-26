"use client";

import React, { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const animatedRefs = new WeakSet<Element>();

interface Props {
  children: React.ReactElement;
  animateOnScroll?: boolean;
  delay?: number;
  id?: string;
}

export default function TextAnimator({
  children,
  animateOnScroll = true,
  delay = 0,
  id,
}: Props) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const splitRef = useRef<SplitText | null>(null);

  const runAnimation = useCallback(() => {
    if (!containerRef.current) return;

    // prevent double-animation
    if (
      animatedRefs.has(containerRef.current) ||
      (id && sessionStorage.getItem(`animated-${id}`))
    ) {
      gsap.set(containerRef.current, { opacity: 1, y: 0 });
      return;
    }

    // cleanup and resplit
    splitRef.current?.revert();
    splitRef.current = new SplitText(containerRef.current, { type: "lines" });
    const lines = splitRef.current.lines;

    gsap.set(lines, { opacity: 0, y: 50 });

    const animConfig = {
      opacity: 1,
      y: 0,
      ease: "power3.out",
      duration: 0.8,
      delay,
      stagger: 0.15,
      onComplete: () => {
        animatedRefs.add(containerRef.current!);
        if (id) sessionStorage.setItem(`animated-${id}`, "true");
      },
    };

    if (animateOnScroll) {
      gsap.to(lines, {
        ...animConfig,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    } else {
      gsap.to(lines, animConfig);
    }
  }, [animateOnScroll, delay, id]);

  useGSAP(() => runAnimation(), {
    scope: containerRef,
    dependencies: [children, animateOnScroll, delay],
  });

  // 🔁 Re-run on resize (if not animated yet)
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;

      runAnimation();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [runAnimation]);

  return <span ref={containerRef}>{children}</span>;
}
