import { useState, useEffect } from 'react';

/**
 * Hook to calculate responsive column count based on viewport width
 * Mobile (< 640px): 3 columns
 * Tablet (640px - 1024px): 4 columns
 * Desktop (1024px - 1440px): 5 columns
 * Large Desktop (> 1440px): 6 columns
 */
export function useResponsiveColumns(): number {
  const [columns, setColumns] = useState<number>(() => {
    if (typeof window === 'undefined') return 3; // Default for SSR
    return calculateColumns(window.innerWidth);
  });

  useEffect(() => {
    const handleResize = () => {
      setColumns(calculateColumns(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return columns;
}

function calculateColumns(width: number): number {
  if (width < 640) return 3; // Mobile - 3 columns
  if (width < 1024) return 4; // Tablet - 4 columns
  if (width < 1440) return 5; // Desktop - 5 columns
  return 6; // Large Desktop - 6 columns
}

