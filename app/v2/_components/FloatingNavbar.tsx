import { motion } from "framer-motion";
import React from "react";

const pillItems = [
  { id: "motivation", label: "Intro" },
  { id: "execution", label: "Build" },
  { id: "impact", label: "Impact" },
  { id: "stack", label: "Stack" },
  { id: "challenge", label: "Challenge" },
  { id: "future", label: "Future" },
  { id: "links", label: "Links" },
];

function FloatingNavbar({
  items,
  activeId,
}: {
  items: typeof pillItems;
  activeId: string;
}) {
  return (
    <div className="hidden fixed bottom-6 left-0 right-0 px-4 z-50 pointer-events-none md:flex justify-center">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-1 p-1.5 bg-background/60 backdrop-blur-sm border border-white/10 rounded-full pointer-events-auto max-w-full overflow-x-auto no-scrollbar shadow-2xl"
      >
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-semibold transition-all whitespace-nowrap ${
              activeId === item.id
                ? "bg-primary text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
          </a>
        ))}
      </motion.div>
    </div>
  );
}

export default FloatingNavbar;
