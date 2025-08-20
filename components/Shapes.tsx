import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image, { StaticImageData } from "next/image";

import shape1 from "@/assets/images/hero shapes/abstract16g.png";
import shape2 from "@/assets/images/hero shapes/abstract13g.png";
import shape3 from "@/assets/images/hero shapes/abstract22g.png";

interface ShapeProps {
  src: StaticImageData;
  className?: string; // for custom positioning, size, rotation
  floatRange?: { x: number; y: number; rotate: number };
  duration?: number;
}

function Shape({ src, className, floatRange, duration = 6 }: ShapeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { x = 10, y = 20, rotate = 15 } = floatRange || {};

    // Floating animation
    gsap.to(el, {
      y: `+=${y}`,
      x: `+=${x}`,
      rotation: rotate,
      duration,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const offsetX = (e.clientX - rect.left - rect.width / 2) / 10;
      const offsetY = (e.clientY - rect.top - rect.height / 2) / 10;
      gsap.to(el, { x: offsetX, y: offsetY, rotation: offsetX });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [floatRange, duration]);

  return (
    <div ref={ref} className={`absolute ${className || ""}`}>
      <Image src={src} alt="" />
    </div>
  );
}

export default function Shapes() {
  return (
    <>
      <Shape
        src={shape1}
        className="top-20 right-1/3 w-[300px] rotate-12"
        floatRange={{ x: 10, y: 20, rotate: 15 }}
        duration={6}
      />
      <Shape
        src={shape2}
        className="top-40 right-0 w-[250px] -rotate-6"
        floatRange={{ x: 8, y: 15, rotate: -10 }}
        duration={5.5}
      />
      <Shape
        src={shape3}
        className="top-0 right-1/6 w-[200px] rotate-0"
        floatRange={{ x: 12, y: 25, rotate: 20 }}
        duration={6.5}
      />
    </>
  );
}
