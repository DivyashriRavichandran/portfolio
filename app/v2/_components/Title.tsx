"use client";
import { motion } from "framer-motion";
import React from "react";

const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: -40 }}
      whileInView={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3 }}
      className={`font-semibold text-2xl md:text-4xl lg:text-5xl ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Title;
