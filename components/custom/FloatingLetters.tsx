"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

import DLetter from "@/assets/images/hero shapes/D.png";
import RLetter from "@/assets/images/hero shapes/R.png";

gsap.registerPlugin(Draggable);

export default function FloatingLetters() {
  const dRef = useRef<HTMLDivElement>(null);
  const rRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dRef.current || !rRef.current || !containerRef.current) return;

    let draggables: Draggable[] = [];

    const createDraggables = () => {
      // kill old ones before recreating (for resize)
      draggables.forEach((d) => d.kill());
      draggables = [dRef.current!, rRef.current!].map(
        (el) =>
          Draggable.create(el, {
            type: "x,y",
            inertia: true,
            bounds: containerRef.current!, // invisible wall = container
            onDrag: checkCollision,
            onRelease: checkCollision,
            onThrowUpdate: checkCollision,
          })[0]
      );
    };

    function checkCollision() {
      const rect1 = dRef.current!.getBoundingClientRect();
      const rect2 = rRef.current!.getBoundingClientRect();

      const overlapX =
        rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
      const overlapY =
        rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;

      if (overlapX && overlapY) {
        // push away smoothly
        const dx = rect1.x + rect1.width / 2 - (rect2.x + rect2.width / 2);
        const dy = rect1.y + rect1.height / 2 - (rect2.y + rect2.height / 2);

        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = 50; // strength of push

        const moveX = (dx / dist) * force;
        const moveY = (dy / dist) * force;

        gsap.to(dRef.current, {
          x: `+=${moveX}`,
          y: `+=${moveY}`,
          duration: 0.3,
        });
        gsap.to(rRef.current, {
          x: `-=${moveX}`,
          y: `-=${moveY}`,
          duration: 0.3,
        });
      }
    }

    createDraggables();

    // Recalculate bounds on resize
    window.addEventListener("resize", createDraggables);

    return () => {
      draggables.forEach((d) => d.kill());
      window.removeEventListener("resize", createDraggables);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      {/* D Letter */}
      <div ref={dRef} className="absolute left-1/3 top-1/3 pointer-events-auto">
        <Image src={DLetter} alt="D Letter" className="w-[500px] -rotate-12" />
      </div>

      {/* R Letter */}
      <div ref={rRef} className="absolute left-1/2 top-1/2 pointer-events-auto">
        <Image src={RLetter} alt="R Letter" className="w-[500px] rotate-12" />
      </div>
    </div>
  );
}
