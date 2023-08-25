import { useParams } from 'react-router-dom';
import { ClicktrackApp } from '../../../../components/clicktrack/ClicktrackApp';
import { ClicktrackNotFound } from '../../../../components/clicktrack/ClicktrackNotFound';
import { Clicktrack } from '../../../../models/Clicktrack';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { loadAvailableClicktrack } from '../../../../utils/loadAvailableClicktrack';
import { auth } from '../../../../firebase';
import { usePageTitle } from '../../../../hooks/usePageTitle';

/**
 * Webpage which loads the metronome from storage and passes it off to the actual application.
 */
const ClicktrackPage = () => {
  const params = useParams();
  const [savedClicktrack, setSavedClicktrack] = useState<
    Clicktrack | undefined
  >(undefined);

  useEffect(() => {
    onAuthStateChanged(auth, async () => {
      if (savedClicktrack === undefined && params.id !== undefined) {
        const availableClicktrack = await loadAvailableClicktrack(params.id);
        if (availableClicktrack)
          setSavedClicktrack(Clicktrack.parseInternals(availableClicktrack));
      }
    });
  });

  usePageTitle(savedClicktrack ? savedClicktrack.name : 'Loading...');

  return savedClicktrack ? (
    <ClicktrackApp loadedClicktrack={savedClicktrack} />
  ) : (
    <ClicktrackNotFound />
  );
};

export default ClicktrackPage;
