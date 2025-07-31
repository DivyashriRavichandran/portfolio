import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

const items = [
  { emoji: "🎮", label: "Last of Us" },
  { emoji: "🎧", label: "Piano is my therapy" },
  { emoji: "🧠", label: "Tabs over spaces" },
  { emoji: "🍿", label: "Knows IMDb by heart" },
  { emoji: "🌙", label: "Code hits at midnight" },
];

const ScrollingRow = ({
  paused,
  startOffset = 0,
}: {
  paused: boolean;
  startOffset?: number;
}) => {
  const allItems = [...items, ...items];
  const x = useMotionValue(startOffset);
  const xTransformed = useTransform(x, (val) => `-${val}px`);
  const containerRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    if (!paused && containerRef.current) {
      const width = containerRef.current.scrollWidth / 2;
      const prev = x.get();
      const next = prev + delta * 0.05;
      x.set(next >= width ? 0 : next);
    }
  });

  return (
    <div ref={containerRef} className="w-full">
      <motion.div
        style={{ x: xTransformed }}
        className="flex flex-row w-max gap-4"
      >
        {allItems.map((item, index) => (
          <div
            key={index}
            className="gradient-10 px-4 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <span className="text-lg">{item.emoji}</span>
            <span className="text-gradient">{item.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const ScrollingBadges = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute w-full -left-2 right-4 -rotate-12 mt-5 md:mt-10 flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        <ScrollingRow paused={hovered} />
      </div>
      <div className="mt-5">
        {/* Add offset here */}
        <ScrollingRow paused={hovered} startOffset={150} />
      </div>
    </div>
  );
};

export default ScrollingBadges;
