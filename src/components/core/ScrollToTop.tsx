import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Scroll to the top of the page when the URL changes.
 */
export const ScrollToTop = () => {
  const currentLocation = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentLocation]);

  return null;
};
