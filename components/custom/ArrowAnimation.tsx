"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useCallback } from "react";
import rough from "roughjs";

export default function ArrowAnimation() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { theme } = useTheme();

  const drawArrow = useCallback(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    svg.innerHTML = "";

    const rc = rough.svg(svg);
    const strokeColor =
      theme === "dark" ? "rgb(250, 250, 250)" : "rgb(24, 24, 27)";

    // --- Split arrow into two paths ---
    const linePath = "M5 20 L40 20"; // long horizontal line
    const chevronPath = "M40 20 L32 14 M40 20 L32 26"; // chevron head

    const roughLine = rc.path(linePath, {
      stroke: strokeColor,
      strokeWidth: 2,
      roughness: 1,
    });

    const roughChevron = rc.path(chevronPath, {
      stroke: strokeColor,
      strokeWidth: 2,
      roughness: 1,
    });

    svg.appendChild(roughLine);
    svg.appendChild(roughChevron);

    // Animate the line first
    const lineEl = roughLine.querySelector("path");
    const chevronEl = roughChevron.querySelector("path");

    if (lineEl) {
      const totalLength = lineEl.getTotalLength();
      lineEl.style.strokeDasharray = `${totalLength}`;
      lineEl.style.strokeDashoffset = `${totalLength}`;
      setTimeout(() => {
        lineEl.style.transition = "stroke-dashoffset 0.4s ease-out";
        lineEl.style.strokeDashoffset = "0";
      }, 50);
    }

    // Animate the chevron after line finishes
    if (chevronEl) {
      const totalLength = chevronEl.getTotalLength();
      chevronEl.style.strokeDasharray = `${totalLength}`;
      chevronEl.style.strokeDashoffset = `${totalLength}`;
      setTimeout(() => {
        chevronEl.style.transition = "stroke-dashoffset 0.4s ease-out";
        chevronEl.style.strokeDashoffset = "0";
      }, 200); // delay until after line is done
    }
  }, [theme]);

  useEffect(() => {
    drawArrow();
  }, [drawArrow]);

  return (
    <svg
      ref={svgRef}
      width="50"
      height="40"
      onMouseEnter={drawArrow} // redraw on hover
      style={{ cursor: "pointer" }}
    />
  );
}
