import { useRef, MutableRefObject } from 'react';
import { SCROLL_SPEED, SCROLL_INTERVAL_MS } from '../constants';

/**
 * Hook to manage index navigation scrolling
 */
export const useIndexScroll = (indexScrollRef: MutableRefObject<HTMLDivElement | null>) => {
  const scrollIntervalRef = useRef<number | null>(null);

  const startScrolling = (direction: 'left' | 'right') => {
    if (scrollIntervalRef.current) return;
    
    scrollIntervalRef.current = window.setInterval(() => {
      if (indexScrollRef.current) {
        const speed = direction === 'left' ? -SCROLL_SPEED : SCROLL_SPEED;
        indexScrollRef.current.scrollLeft += speed;
      }
    }, SCROLL_INTERVAL_MS);
  };

  const stopScrolling = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  return { startScrolling, stopScrolling };
};

