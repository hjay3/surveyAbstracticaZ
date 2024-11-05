import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuoteDisplayProps {
  quote: string;
}

export function QuoteDisplay({ quote }: QuoteDisplayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [scale, setScale] = useState(1);
  const [displayedQuote, setDisplayedQuote] = useState(quote);
  const [hue, setHue] = useState(0);

  useEffect(() => {
    setIsVisible(false);
    setScale(0.95);
    setHue((prev) => (prev + 40) % 360);
    
    const timer = setTimeout(() => {
      setDisplayedQuote(quote);
      setIsVisible(true);
      setScale(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [quote]);

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none z-[5]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div 
          style={{
            transform: `scale(${scale})`,
            transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundColor: `hsla(${hue}, 30%, 10%, 0.4)`,
            boxShadow: `0 0 50px hsla(${hue}, 50%, 20%, 0.2)`,
            borderColor: `hsla(${hue}, 50%, 50%, 0.2)`,
          }}
          className={`
            text-center p-8 rounded-xl
            backdrop-blur-sm
            border
            max-w-4xl
            ${isVisible ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <p 
            style={{
              color: `hsla(${hue}, 20%, 90%, 0.7)`,
              textShadow: `0 0 20px hsla(${hue}, 50%, 50%, 0.4)`,
            }}
            className="text-2xl md:text-3xl font-light tracking-wide leading-relaxed"
          >
            {displayedQuote}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}