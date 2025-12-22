import { useState, useEffect, MutableRefObject } from 'react';
import { Step } from '../types';
import { SCROLL_SPY_CONFIG } from '../constants';

interface UseScrollSpyOptions {
  step: Step;
  loading: boolean;
  categoryRefs: MutableRefObject<Record<string, HTMLDivElement | null>>;
  indexScrollRef: MutableRefObject<HTMLDivElement | null>;
}

/**
 * Hook to manage scroll spy functionality for category navigation
 */
export const useScrollSpy = ({ step, loading, categoryRefs, indexScrollRef }: UseScrollSpyOptions) => {
  const [activeCategory, setActiveCategory] = useState<string>('');

  // Intersection Observer for scroll spy
  useEffect(() => {
    if (step !== 'SERVICE' || loading) return;

    const options = {
      root: null,
      rootMargin: SCROLL_SPY_CONFIG.ROOT_MARGIN,
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    }, options);

    (Object.values(categoryRefs.current) as (HTMLDivElement | null)[]).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [step, loading, categoryRefs]);

  // Auto-scroll active category button into view
  useEffect(() => {
    if (activeCategory && indexScrollRef.current) {
      const activeButton = indexScrollRef.current.querySelector(`[data-category="${activeCategory}"]`);
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeCategory, indexScrollRef]);

  const scrollToCategory = (category: string) => {
    const el = categoryRefs.current[category];
    if (el) {
      const yOffset = SCROLL_SPY_CONFIG.Y_OFFSET;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return { activeCategory, scrollToCategory };
};

