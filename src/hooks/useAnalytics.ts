import { inject } from '@vercel/analytics';
import { useEffect } from 'react';

export const useAnalytics = () => {
  useEffect(() => {
    inject({
      beforeSend: (event) => {
        if (event.url.includes('clicktracks')) {
          const parsedString = event.url.replace(
            /\/[0-9a-f-]+$/,
            '/user-clicktrack'
          );
          event.url = parsedString;
        }
        return event;
      },
    });
  }, []);
};
