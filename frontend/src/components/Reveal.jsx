import React from "react";
import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 24, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const Equalizer = ({ className = "" }) => (
  <span className={`equalizer inline-flex items-end h-6 ${className}`} aria-hidden="true">
    <span /><span /><span /><span /><span />
  </span>
);

export default Reveal;
