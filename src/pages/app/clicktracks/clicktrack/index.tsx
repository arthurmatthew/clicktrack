import { useParams } from 'react-router';
import { ClicktrackApp } from '../../../../components/clicktrack/ClicktrackApp';
import { ClicktrackNotFound } from '../../../../components/clicktrack/ClicktrackNotFound';
import { Clicktrack } from '../../../../models/Clicktrack';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { loadAvailableClicktrack } from '../../../../utils/loadAvailableClicktrack';
import { auth } from '../../../../firebase';
import { usePageTitle } from '../../../../hooks/usePageTitle';
import { STORAGE_KEYS_CLICKTRACK } from '../../../../config';

/**
 * Webpage which loads the metronome from storage and passes it off to the actual application.
 */
const ClicktrackPage = () => {
  const params = useParams();
  const [savedClicktrack, setSavedClicktrack] = useState<
    Clicktrack | undefined
  >(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!!user) {
        if (savedClicktrack === undefined && params.id !== undefined) {
          const availableClicktrack = await loadAvailableClicktrack(params.id);
          if (availableClicktrack)
            setSavedClicktrack(Clicktrack.parseInternals(availableClicktrack));
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
    });

    return () => unsubscribe();
  }, [params.id]);

  usePageTitle(savedClicktrack ? savedClicktrack.name : 'Loading...');

  return savedClicktrack ? (
    <ClicktrackApp loadedClicktrack={savedClicktrack} />
  ) : (
    <ClicktrackNotFound />
  );
};

export default ClicktrackPage;
