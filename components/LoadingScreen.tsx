"use client";

import {
  motion,
  useMotionValue,
  animate,
  useAnimationControls,
} from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const count = useMotionValue(0);
  const progressControls = useAnimationControls();
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    const animation = animate(count, 100, {
      duration: 5,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (latest) => {
        setDisplayPercentage(Math.round(latest));
      },
      onComplete: () => {
        onFinish(); // ✅ notify parent when animation completes
      },
    });

    progressControls.start({
      scaleX: 1,
      transition: { duration: 5, ease: [0.33, 1, 0.68, 1] },
    });

    return animation.stop;
  }, [count, progressControls, onFinish]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br bg-background flex items-center justify-center z-50 overflow-hidden">
      <div className="text-center z-10 w-full max-w-md px-4">
        {/* Percentage counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl md:text-9xl font-bold flex justify-center items-center"
        >
          <motion.span>{displayPercentage}</motion.span>
          <span>%</span>
        </motion.div>

        {/* Progress bar */}
        <div className="mt-6 w-full h-2 bg-background/40 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-secondary to-primary"
            initial={{ scaleX: 0 }}
            animate={progressControls}
            style={{ originX: 0 }}
          />
        </div>
        <motion.p
          className="mt-6 text-lg text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading portfolio...
        </motion.p>
      </div>
    </div>
  );
}
