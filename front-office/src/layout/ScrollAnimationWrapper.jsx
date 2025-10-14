"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollAnimationWrapper({ children, className, ...props }) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // 🟢 Sur mobile : déclenche immédiatement
    if (window.innerWidth < 768) {
      setShouldAnimate(true);
    } else {
      // 🖥️ Sur desktop : comportement normal (scroll)
      setShouldAnimate(false);
    }
  }, []);

  return (
    <motion.div
      initial="offscreen"
      // 🧩 Si mobile => animation visible directement
      animate={shouldAnimate ? "onscreen" : undefined}
      whileInView={shouldAnimate ? undefined : "onscreen"}
      viewport={{ once: true, amount: 0.8 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
