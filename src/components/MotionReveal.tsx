import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface MotionRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'none';
  className?: string;
  distance?: number;
}

export const MotionReveal: React.FC<MotionRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  distance = 20,
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: direction === 'up' ? distance : 0,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, margin: '-24px' }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
