import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Monitor the window scroll status
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const duration = 650; // duration in ms
    const start = window.scrollY;
    const startTime = performance.now();

    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animateScroll = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = easeInOutQuad(elapsed, start, -start, duration);
      
      window.scrollTo(0, progress);

      if (elapsed < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        window.scrollTo(0, 0);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ 
            scale: 1.1, 
            boxShadow: '0 0 20px rgba(77, 208, 225, 0.45)',
            borderColor: 'rgba(77, 208, 225, 0.8)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-[100] w-12 h-12 bg-brand-surface-container-high/85 backdrop-blur-md border border-brand-outline-variant/30 text-brand-primary-container rounded-full flex items-center justify-center transition-colors cursor-pointer shadow-xl group"
          aria-label="Вгору"
          id="scroll-to-top-button"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
