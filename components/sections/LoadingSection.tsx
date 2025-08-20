import {
  animate,
  motion,
  useAnimationControls,
  useMotionValue,
} from "framer-motion";
import React, { useEffect, useState } from "react";

const LoadingSection = () => {
  const [loading, setLoading] = useState(true);
  const [displayPercentage, setDisplayPercentage] = useState(0);

  const count = useMotionValue(0);
  const progressControls = useAnimationControls();
  const overlayControls = useAnimationControls();

  useEffect(() => {
    if (!loading) return;

    const animation = animate(count, 100, {
      duration: 5,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (latest) => setDisplayPercentage(Math.round(latest)),
      onComplete: async () => {
        // Swipe up overlay after count finishes
        await overlayControls.start({
          y: "-100%",
          transition: { duration: 1, ease: "easeInOut" },
        });
        setLoading(false); // trigger hero animations
      },
    });

    progressControls.start({
      scaleX: 1,
      transition: { duration: 5, ease: [0.33, 1, 0.68, 1] },
    });

    return animation.stop;
  }, [loading, count, progressControls, overlayControls]);

  return (
    <>
      <motion.div
        initial={{ y: 0 }}
        animate={overlayControls}
        className="absolute inset-0 z-50 flex items-center justify-center bg-background"
      >
        <div className="text-center w-full max-w-md px-4">
          {/* Percentage counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl tracking-tight flex justify-center items-center"
          >
            {displayPercentage}
          </motion.div>

          <motion.p
            className="absolute bottom-6 left-6 text-4xl text-muted-foreground tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            LOADING
          </motion.p>
        </div>
      </motion.div>
    </>
  );
};

export default LoadingSection;
