import React, { useState, useEffect, useRef } from 'react';

export interface AnimatedCounterProps {
  start?: number;
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  isInView: boolean;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  start = 0,
  target,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.6,
  isInView,
}) => {
  const [value, setValue] = useState(start);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number | null = null;
    let animFrame: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setValue(start + easeOut * (target - start));

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    animFrame = requestAnimationFrame(animate);

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [isInView, start, target, duration]);

  return (
    <span className="tabular-nums">
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
};
