// 📁 client/src/components/ui/card.jsx

import React from 'react';
import { motion } from 'framer-motion';

export function Card({ children, className = '' }) {
  return (
    <motion.div
      className={`rounded-2xl shadow-xl bg-white/10 backdrop-blur-md ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
