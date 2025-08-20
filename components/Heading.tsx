import React from "react";
import ScrollAnimation from "./custom/ScrollAnimation";
import { cn } from "@/lib/utils";

const Heading = ({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle: string;
  className?: string;
}) => {
  return (
    <ScrollAnimation className={cn("text-center", className)}>
      <p className="text-xs md:text-sm font-medium uppercase tracking-wider text-gradient">
        {title}
      </p>
      <h2 className="mt-1 md:mt-2 text-3xl md:text-5xl italic playfair-display">
        {subtitle}
      </h2>
    </ScrollAnimation>
  );
};

export default Heading;
