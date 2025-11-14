import { useEffect, useState } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia('(max-width: 1024px)').matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)'); // 1024 is lg tailwind

    const handleChange = (e: MediaQueryListEvent) => {
      console.count('useIsMobile fired'); // Count how many times it fires
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return { isMobile };
};
