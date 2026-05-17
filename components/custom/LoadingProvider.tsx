"use client";
import React, { createContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingContext = createContext({ isDone: false });

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateProgress = () => {
      setProgress((prev) => {
        if (prev >= 100) return 100;

        // 1. Organic Jump: Randomly pick how much to increase
        const jump = Math.floor(Math.random() * 10) + 1;
        const next = prev + jump;

        // 2. Variable Timing:
        // Fast at the start, slows down significantly near the end (90%+)
        // to build anticipation, then snaps to finish.
        let delay = Math.random() * 150 + 50;
        if (prev > 80) delay += 200;

        if (next < 100) {
          timeoutId = setTimeout(updateProgress, delay);
        }

        return next > 100 ? 100 : next;
      });
    };

    timeoutId = setTimeout(updateProgress, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // A slightly shorter delay for the exit feels more "responsive"
      const timeout = setTimeout(() => setIsDone(true), 600);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <LoadingContext.Provider value={{ isDone }}>
      <AnimatePresence mode="wait">
        {!isDone ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
            }}
            className="fixed inset-0 z-9999 flex flex-col gap-2 items-center justify-center bg-background"
          >
            <div className="flex flex-col gap-2 items-start w-48">
              <p>{progress}%</p>

              <div className="w-full h-0.5 bg-muted/20 overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="absolute inset-y-0 left-0 bg-primary"
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  );
};
