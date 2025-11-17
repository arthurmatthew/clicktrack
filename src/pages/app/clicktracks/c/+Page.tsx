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
  const clicktrackId = pageContext.urlParsed.search.id;
  const [savedClicktrack, setSavedClicktrack] = useState<
    Clicktrack | undefined
  >(undefined);
  const { user, initialized } = useUser();

  useEffect(() => {
    if (!initialized) return;
    if (!clicktrackId) return;

    const loadClicktrack = async () => {
      if (user) {
        const availableClicktrack = await loadAvailableClicktrack(clicktrackId);
        if (availableClicktrack) {
          setSavedClicktrack(Clicktrack.parseInternals(availableClicktrack));
        } else {
          setSavedClicktrack(undefined);
        }
      } else {
        const localParsedClicktracks = loadLocalClicktracks();
        const availableClicktrack = (localParsedClicktracks || []).find(
          (clicktrack) => clicktrack.id === clicktrackId,
        );
        if (availableClicktrack) {
          setSavedClicktrack(Clicktrack.parseInternals(availableClicktrack));
        } else {
          setSavedClicktrack(undefined);
        }
      }
    };

    loadClicktrack();
  }, [clicktrackId, user, initialized]);

  if (!initialized) {
    return <ClicktrackNotFound />;
  }

  return savedClicktrack ? (
    <ClicktrackApp loadedClicktrack={savedClicktrack} />
  ) : (
    <ClicktrackNotFound />
  );
};
