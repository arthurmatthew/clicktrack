import { isEqual } from 'lodash';
import { useState, useRef, useEffect } from 'react';
import { Clicktrack } from '../models/Clicktrack';
import { getUserClicktracks } from '../lib/firebase/getUserClicktracks';
import { setUserData } from '../lib/firebase/setUserData';
import { useUser } from './useUser';
import { loadLocalClicktracks } from '../utils/loadLocalClicktracks';
import { saveLocalClicktracks } from '../utils/saveLocalClicktracks';

/**
 * This hook acts as a middleware for editing the Clicktrack it returns.
 * It returns local state variables `clicktrack` and `setClicktrack` which
 * are not affected. The hook checks whether this state is in sync with
 * the clicktrack that is saved to the user's account. This is generally
 * separate from the Clicktrack storage hooks, as it must take a preloaded
 * Clicktrack as an argument.
 */
export const useCloudClicktrack = (loadedClicktrack: Clicktrack) => {
  const [clicktrack, setClicktrack] = useState<Clicktrack>(
    Clicktrack.parseInternals(loadedClicktrack),
  );
  const [saving, setSaving] = useState(false);
  const lastSavedClicktrack = useRef<Clicktrack>(
    Clicktrack.parseInternals(loadedClicktrack),
  );
  const clicktracksSynced = (): boolean => {
    return isEqual(clicktrack, lastSavedClicktrack.current);
  };

  const user = useUser();

  useEffect(() => {
    const parsed = Clicktrack.parseInternals(loadedClicktrack);
    setClicktrack(parsed);
    lastSavedClicktrack.current = parsed;

    // tiny task to wait for state
    Promise.resolve().then(() => {
      try {
        setChangesSaved(isEqual(parsed, lastSavedClicktrack));
      } catch (e) {
        console.error(e);
      }
    });
  }, [loadedClicktrack]);

  const saveChanges = async () => {
    if (saving) return false;
    setSaving(true);

    try {
      if (!!user.user) {
        // save changes for logged in users
        const currentSavedClicktracks = await getUserClicktracks();

        if (currentSavedClicktracks === undefined) {
          setSaving(false);
          return false;
        }

        const indexOfEdited = currentSavedClicktracks.findIndex(
          (currentClicktrack) =>
            currentClicktrack.id === lastSavedClicktrack.current.id,
        );
        const currentSavedWithoutEdited = currentSavedClicktracks.filter(
          (currentClicktrack) => currentClicktrack.id !== clicktrack.id,
        );

        const result = [...currentSavedWithoutEdited];
        result.splice(
          indexOfEdited === -1 ? result.length : indexOfEdited, // add to end if didnt exist yet
          0,
          clicktrack,
        );
        const minifiedClicktracks = result.map((clicktrack) =>
          Clicktrack.encode(clicktrack),
        );

        await setUserData({
          clicktracks: minifiedClicktracks,
        });

        lastSavedClicktrack.current = clicktrack;
        setChangesSaved(clicktracksSynced());
        return true;
      } else {
        // guest user saving logic
        const currentSavedClicktracks = loadLocalClicktracks();

        if (currentSavedClicktracks === undefined) {
          setSaving(false);
          return false;
        }

        const indexOfEdited = currentSavedClicktracks.findIndex(
          (currentClicktrack) =>
            currentClicktrack.id === lastSavedClicktrack.current.id,
        );
        const currentSavedWithoutEdited = currentSavedClicktracks.filter(
          (currentClicktrack) => currentClicktrack.id !== clicktrack.id,
        );

        const result = [...currentSavedWithoutEdited];
        result.splice(
          indexOfEdited === -1 ? result.length : indexOfEdited, // add to end if didnt exist yet
          0,
          clicktrack, // ! not saving encoded version?
        );

        saveLocalClicktracks(result);

        lastSavedClicktrack.current = clicktrack;
        setChangesSaved(clicktracksSynced());
        return true;
      }
    } catch (error) {
      console.error('Failed to save changes', error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const [changesSaved, setChangesSaved] = useState(clicktracksSynced());

  useEffect(() => {
    setChangesSaved(clicktracksSynced());
  }, [clicktrack]);

  return { clicktrack, setClicktrack, saveChanges, saving, changesSaved };
};
