import { useState, useEffect } from 'react';
import { usePageContext } from 'vike-react/usePageContext';
import { ClicktrackApp } from '../../../../components/clicktrack/ClicktrackApp';
import { ClicktrackNotFound } from '../../../../components/clicktrack/ClicktrackNotFound';
import { STORAGE_KEYS_CLICKTRACK } from '../../../../config';
import { useUser } from '../../../../hooks/useUser';
import { Clicktrack } from '../../../../models/Clicktrack';
import { loadAvailableClicktrack } from '../../../../utils/loadAvailableClicktrack';

export const Page = () => {
  const pageContext = usePageContext();
  const params = pageContext.routeParams;
  const [savedClicktrack, setSavedClicktrack] = useState<
    Clicktrack | undefined
  >(undefined);
  const { user } = useUser();

  useEffect(() => {
    if (!!user) {
      if (savedClicktrack === undefined && params.clicktrack !== undefined) {
        loadAvailableClicktrack(params.clicktrack).then(
          (availableClicktrack) => {
            if (availableClicktrack)
              setSavedClicktrack(
                Clicktrack.parseInternals(availableClicktrack),
              );
          },
        );
      }
    } else {
      const localClicktracks = localStorage.getItem(STORAGE_KEYS_CLICKTRACK);
      const localParsedClicktracks = localClicktracks
        ? (JSON.parse(localClicktracks) as Clicktrack[])
        : undefined;
      const availableClicktrack = (localParsedClicktracks || []).find(
        (clicktrack) => clicktrack.id === params.clicktrack,
      );
      if (availableClicktrack)
        setSavedClicktrack(
          Clicktrack.parseInternals(availableClicktrack || []),
        );
    }
  }, [params.clicktrack, user]);

  return savedClicktrack ? (
    <ClicktrackApp loadedClicktrack={savedClicktrack} />
  ) : (
    <ClicktrackNotFound />
  );
};
