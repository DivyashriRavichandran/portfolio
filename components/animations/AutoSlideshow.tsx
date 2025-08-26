"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

const AutoSlideshow = ({
  images,
  interval = 1200,
  className,
}: {
  images: StaticImageData[];
  interval?: number;
  className?: string;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className || ""}`}
    >
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img}
          alt=""
          fill
          className={`absolute inset-0 object-cover rounded-lg transition-opacity duration-300 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default AutoSlideshow;
