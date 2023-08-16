import { inject } from '@vercel/analytics';
import { useEffect } from 'react';

export const useAnalytics = () => {
  useEffect(() => {
    inject();
  }, []);
};
