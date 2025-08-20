import { motion } from "framer-motion";
import React from "react";

export const Badge = ({ text }: { text: string }) => {
  return (
    <div className="bg-muted no-underline group cursor-pointer relative shadow-2xl rounded-full p-px text-xs md:text-sm font-medium leading-6 inline-block">
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
      </span>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative flex space-x-2 items-center z-10 rounded-full bg-muted py-0.5 px-4 ring-1 ring-foreground/10 "
      >
        <span className="mr-2 h-2 w-2 rounded-full gradient"></span>
        <span>{text}</span>
      </motion.div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-primary/0 via-primary/90 to-secondary/0 transition-opacity duration-500 group-hover:opacity-40"></span>
    </div>
  );
};
