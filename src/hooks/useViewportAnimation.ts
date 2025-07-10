import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface UseViewportAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export function useViewportAnimation(options: UseViewportAnimationOptions = {}) {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isInView = useInView(ref, {
    amount: options.threshold || 0.3,
  });

  useEffect(() => {
    if (isInView && !hasAnimated && options.triggerOnce !== false) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, options.triggerOnce]);

  // For triggerOnce mode, return whether it should animate
  // For continuous mode, return current in-view state
  const shouldAnimate = options.triggerOnce !== false ? hasAnimated : isInView;

  return {
    ref,
    shouldAnimate,
    hasAnimated,
    isInView
  };
}

// Animation variants for common patterns
export const animationVariants = {
  // Fade in from bottom
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  },
  
  // Scale in
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  },
  
  // Stagger children
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  
  // Stagger item
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }
};

// Hook for chart animations that should only play once
export function useChartAnimation(delay: number = 0) {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [shouldStartAnimation, setShouldStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldStartAnimation(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const onAnimationComplete = () => {
    setIsAnimationComplete(true);
  };

  return {
    animationDuration: isAnimationComplete ? 0 : 1500,
    animationBegin: shouldStartAnimation ? 0 : undefined,
    isAnimationActive: !isAnimationComplete,
    onAnimationComplete
  };
}

// Hook to prevent re-animations on tab/view switches
export function useStableAnimation() {
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    setHasAnimated(true);
  }, []);

  return {
    initial: hasAnimated ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };
}