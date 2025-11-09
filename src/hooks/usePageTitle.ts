import { useEffect, useRef } from 'react';

export const usePageTitle = (title: string) => {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = `${title} - clicktrack`;

    return () => {
      document.title = defaultTitle.current;
    };
  }, [title]);
};
