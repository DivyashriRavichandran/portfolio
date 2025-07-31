"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!mounted) return null;

  // Don't show custom cursor on touch devices
  if (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0) {
    return null;
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-50 flex h-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full mix-blend-screen backdrop-blur-sm"
        animate={{
          x: position.x,
          y: position.y,
          scale: isClicking ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.5,
        }}
      >
        <div className="size-2 rounded-full gradient" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-50 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full gradient-10 p-0.5 mix-blend-screen"
        animate={{
          x: position.x,
          y: position.y,
          scale: isClicking ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 150,
          mass: 0.8,
          delay: 0.01,
        }}
      >
        <div className="bg-transparent rounded-full h-full w-full"></div>
      </motion.div>
    </>
  );
}
