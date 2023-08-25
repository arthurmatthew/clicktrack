import { useEffect, useRef } from 'react';

export const usePageTitle = (title: string) => {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = `clicktrack | ${title}`;

    return () => {
      document.title = defaultTitle.current;
    };
  }, [title]);
};
