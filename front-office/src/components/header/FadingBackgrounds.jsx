"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DURATION = 4000; // total time each image stays fully visible (ms)
const FADE_TIME = 1200; // fade in/out duration (ms)

export default function CrossFadeBackgrounds({ images }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, DURATION);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {images.map((src, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${src})` ,  backgroundAttachment: "fixed"}}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: FADE_TIME / 1000, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
