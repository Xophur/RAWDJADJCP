import React, { useMemo } from "react";
import { motion } from "framer-motion";

const WHILE_IN_VIEW = { opacity: 1, y: 0 };
const VIEWPORT = { once: true, margin: "-60px" };
const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 24, className = "" }) => {
  const initial = useMemo(() => ({ opacity: 0, y }), [y]);
  const transition = useMemo(() => ({ duration: 0.55, delay, ease: EASE }), [delay]);

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={WHILE_IN_VIEW}
      viewport={VIEWPORT}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export const Equalizer = ({ className = "" }) => (
  <span className={`equalizer inline-flex items-end h-6 ${className}`} aria-hidden="true">
    <span /><span /><span /><span /><span />
  </span>
);

export default Reveal;
