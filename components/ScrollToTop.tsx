import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global component that resets scroll position and triggers reveal animations
 * whenever the route changes.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset scroll to top instantly
    window.scrollTo(0, 0);
    
    // Give React a tiny bit of time to render the new components,
    // then trigger the reveal logic for elements already in the viewport.
    const timer = setTimeout(() => {
      if ((window as any).refreshReveals) {
        (window as any).refreshReveals();
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;