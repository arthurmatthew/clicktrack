import { useParams } from 'react-router';
import { ClicktrackApp } from '../../../../components/clicktrack/ClicktrackApp';
import { ClicktrackNotFound } from '../../../../components/clicktrack/ClicktrackNotFound';
import { Clicktrack } from '../../../../models/Clicktrack';
import { useEffect, useState } from 'react';
import { loadAvailableClicktrack } from '../../../../utils/loadAvailableClicktrack';
import { usePageTitle } from '../../../../hooks/usePageTitle';
import { STORAGE_KEYS_CLICKTRACK } from '../../../../config';
import { useUser } from '../../../../hooks/useUser';

/**
 * Webpage which loads the metronome from storage and passes it off to the actual application.
 */
const ClicktrackPage = () => {
  const params = useParams();
  const [savedClicktrack, setSavedClicktrack] = useState<
    Clicktrack | undefined
  >(undefined);
  const { user } = useUser();

  useEffect(() => {
    if (!!user) {
      if (savedClicktrack === undefined && params.id !== undefined) {
        loadAvailableClicktrack(params.id).then((availableClicktrack) => {
          if (availableClicktrack)
            setSavedClicktrack(Clicktrack.parseInternals(availableClicktrack));
        });
      }
    } else {
      const localClicktracks = localStorage.getItem(STORAGE_KEYS_CLICKTRACK);
      const localParsedClicktracks = localClicktracks
        ? (JSON.parse(localClicktracks) as Clicktrack[])
        : undefined;
      const availableClicktrack = (localParsedClicktracks || []).find(
        (clicktrack) => clicktrack.id === params.id
      );
      if (availableClicktrack)
        setSavedClicktrack(
          Clicktrack.parseInternals(availableClicktrack || [])
        );
    }
  }, [params.id, user]);

  usePageTitle(savedClicktrack ? savedClicktrack.name : 'Loading...');

  return savedClicktrack ? (
    <ClicktrackApp loadedClicktrack={savedClicktrack} />
  ) : (
    <ClicktrackNotFound />
  );
};

export default ClicktrackPage;
