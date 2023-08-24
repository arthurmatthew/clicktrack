import { isEqual } from 'lodash';
import { useState, useRef, useEffect } from 'react';
import { Clicktrack } from '../models/Clicktrack';
import { getUserClicktracks } from '../lib/firebase/getUserClicktracks';
import { setUserData } from '../lib/firebase/setUserData';

/**
 * This hook acts as a middleware for editing the Clicktrack it returns.
 * It returns local state variables `clicktrack` and `setClicktrack` which
 * are not affected. The hook checks whether this state is in sync with
 * the clicktrack that is saved to the user's account.
 */
export const useCloudClicktrack = (loadedClicktrack: Clicktrack) => {
  const [clicktrack, setClicktrack] = useState<Clicktrack>(
    Clicktrack.parseInternals(loadedClicktrack)
  );
  const [saving, setSaving] = useState(false);
  const lastSavedClicktrack = useRef<Clicktrack>(
    Clicktrack.parseInternals(loadedClicktrack)
  );
  const clicktracksSynced = (): boolean => {
    return isEqual(clicktrack, lastSavedClicktrack.current);
  };

  const saveChanges = async () => {
    setSaving(true);
    const currentSavedClicktracks = await getUserClicktracks();

    if (currentSavedClicktracks === undefined) {
      setSaving(false);
      return;
    }

    const indexOfEdited = currentSavedClicktracks.indexOf(
      lastSavedClicktrack.current
    );
    const currentSavedWithoutEdited = currentSavedClicktracks.filter(
      (currentClicktrack) => currentClicktrack.id !== clicktrack.id
    );

    const result = [...currentSavedWithoutEdited];
    result.splice(
      indexOfEdited === -1 ? result.length : indexOfEdited, // add to end if didnt exist yet
      0,
      clicktrack
    );
    const minifiedClicktracks = result.map((clicktrack) =>
      Clicktrack.encode(clicktrack)
    );

    await setUserData({
      clicktracks: minifiedClicktracks,
    });

    lastSavedClicktrack.current = clicktrack;
    setChangesSaved(clicktracksSynced());
    setSaving(false);
  };

  const [changesSaved, setChangesSaved] = useState(clicktracksSynced());

  useEffect(() => {
    setChangesSaved(clicktracksSynced());
  }, [clicktrack]);

  return { clicktrack, setClicktrack, saveChanges, saving, changesSaved };
};
