"use client";

import { type ReactNode, useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  threshold?: number; // optional threshold for intersection
}

export default function ScrollAnimation({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.5,
  once = true,
  threshold = 0.2,
}: ScrollAnimationProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);

  // Detect mobile for smaller animation offsets
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isInView = useInView(ref, { once, amount: isMobile ? 0.1 : threshold });

  // Compute initial positions based on direction & device
  const offset = isMobile ? 20 : 40;
  const getInitialState = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: offset };
      case "down":
        return { opacity: 0, y: -offset };
      case "left":
        return { opacity: 0, x: offset };
      case "right":
        return { opacity: 0, x: -offset };
      case "none":
        return { opacity: 0 };
      default:
        return { opacity: 0, y: offset };
    }
  };

  const getTargetState = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 };
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      case "none":
        return { opacity: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start(getTargetState());
    }
  }, [isInView, controls, direction]);

  return (
    <motion.div
      ref={ref}
      initial={getInitialState()}
      animate={controls}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
