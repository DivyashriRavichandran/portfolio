"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export default function ScrollAnimation({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.5,
  once = true,
}: //   threshold = 0.2,
ScrollAnimationProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Set initial animation states based on direction
  const getInitialState = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 40 };
      case "down":
        return { opacity: 0, y: -40 };
      case "left":
        return { opacity: 0, x: 40 };
      case "right":
        return { opacity: 0, x: -40 };
      case "none":
        return { opacity: 0 };
      default:
        return { opacity: 0, y: 40 };
    }
  };

  // Set animation target states based on direction
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
    if (isInView && !hasAnimated) {
      controls.start(getTargetState());
      if (once) {
        setHasAnimated(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, controls, hasAnimated, once]);

  return (
    <motion.div
      ref={ref}
      initial={getInitialState()}
      animate={controls}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
