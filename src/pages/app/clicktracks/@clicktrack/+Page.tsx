import { useState, useEffect } from 'react';
import { usePageContext } from 'vike-react/usePageContext';
import { ClicktrackApp } from '../../../../components/clicktrack/ClicktrackApp';
import { ClicktrackNotFound } from '../../../../components/clicktrack/ClicktrackNotFound';
import { useUser } from '../../../../hooks/useUser';
import { Clicktrack } from '../../../../models/Clicktrack';
import { loadAvailableClicktrack } from '../../../../utils/loadAvailableClicktrack';
import { loadLocalClicktracks } from '../../../../utils/loadLocalClicktracks';

export const Page = () => {
  const pageContext = usePageContext();
  const params = pageContext.routeParams;
  const [savedClicktrack, setSavedClicktrack] = useState<
    Clicktrack | undefined
  >(undefined);
  const { user, initialized } = useUser();

  useEffect(() => {
    if (!initialized) return;

    const loadClicktrack = async () => {
      if (params.clicktrack === undefined) return;

      if (user) {
        const availableClicktrack = await loadAvailableClicktrack(
          params.clicktrack,
        );
        if (availableClicktrack) {
          setSavedClicktrack(Clicktrack.parseInternals(availableClicktrack));
        }
      } else {
        const localParsedClicktracks = loadLocalClicktracks();
        const availableClicktrack = (localParsedClicktracks || []).find(
          (clicktrack) => clicktrack.id === params.clicktrack,
        );
        if (availableClicktrack) {
          setSavedClicktrack(Clicktrack.parseInternals(availableClicktrack));
        } else {
          setSavedClicktrack(undefined);
        }
      }
    };

    loadClicktrack();
  }, [params.clicktrack, user, initialized]);

  if (!initialized) {
    return <ClicktrackNotFound />;
  }

  return savedClicktrack ? (
    <ClicktrackApp loadedClicktrack={savedClicktrack} />
  ) : (
    <ClicktrackNotFound />
  );
};
