"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingContext = createContext({
  isDone: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [activeRequests, setActiveRequests] = useState(0);

  const mountTime = useRef(Date.now());
  const MIN_LOADING_MS = 1200;

  const startLoading = useCallback(
    () => setActiveRequests((prev) => prev + 1),
    [],
  );
  const stopLoading = useCallback(
    () => setActiveRequests((prev) => Math.max(0, prev - 1)),
    [],
  );

  // Progress Bar Ticking
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const updateProgress = () => {
      setProgress((prev) => {
        if (activeRequests > 0 && prev >= 90) return 90;
        if (prev >= 100) return 100;

        const jump = Math.floor(Math.random() * 8) + 4;
        const next = prev + jump;
        const delay = prev > 75 ? 150 : 50;

        if (next < 100) timeoutId = setTimeout(updateProgress, delay);
        return next > 100 ? 100 : next;
      });
    };
    timeoutId = setTimeout(updateProgress, 40);
    return () => clearTimeout(timeoutId);
  }, [activeRequests]);

  // Clear loader only when request balance handles out
  useEffect(() => {
    if (activeRequests === 0 && progress >= 90) {
      const elapsed = Date.now() - mountTime.current;
      const remainingTime = Math.max(0, MIN_LOADING_MS - elapsed);

      const timeout = setTimeout(() => {
        setProgress(100);
        setIsDone(true);
      }, remainingTime);

      return () => clearTimeout(timeout);
    }
  }, [activeRequests, progress]);

  return (
    <LoadingContext.Provider value={{ isDone, startLoading, stopLoading }}>
      <AnimatePresence>
        {!isDone && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 mountaineer z-9999 flex flex-col gap-2 items-center justify-center bg-background"
          >
            <div className="flex flex-col gap-2 items-start w-48">
              <p className="font-mono text-sm text-muted-foreground">
                {progress}%
              </p>
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
        )}
      </AnimatePresence>

      <div
        className={!isDone ? "pointer-events-none select-none invisible" : ""}
      >
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 8 }}
          animate={isDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </LoadingContext.Provider>
  );
};
