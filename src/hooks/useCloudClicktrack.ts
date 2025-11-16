import { useState, useEffect } from 'react';
import { Clicktrack } from '../models/Clicktrack';
import { getUserClicktracks } from '../lib/firebase/getUserClicktracks';
import { setUserData } from '../lib/firebase/setUserData';
import { useUser } from './useUser';
import { loadLocalClicktracks } from '../utils/loadLocalClicktracks';
import { saveLocalClicktracks } from '../utils/saveLocalClicktracks';
import { deepEqual } from '../utils/deepEqual';

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
  const [lastSavedClicktrack, setLastSavedClicktrack] = useState<Clicktrack>(
    Clicktrack.parseInternals(loadedClicktrack),
  );
  const changesSaved = deepEqual(clicktrack, lastSavedClicktrack);

  const { user } = useUser();

  useEffect(() => {
    const parsed = Clicktrack.parseInternals(loadedClicktrack);
    setClicktrack(parsed);
    setLastSavedClicktrack(parsed);
  }, [loadedClicktrack]);

  const saveChanges = async () => {
    if (saving) return false;

    if (!clicktrack.id) {
      console.error('Cannot save clicktrack without ID');
      return false;
    }

    if (!clicktrack.name || clicktrack.name.trim().length === 0) {
      console.error('Cannot save clicktrack without name');
      return false;
    }

    setSaving(true);

    try {
      const currentSavedClicktracks = !!user
        ? await getUserClicktracks()
        : loadLocalClicktracks();

      if (!currentSavedClicktracks) {
        setSaving(false);
        return false;
      }

      const indexOfEdited = currentSavedClicktracks.findIndex(
        (ct) => ct.id === lastSavedClicktrack.id,
      );
      const withoutEdited = currentSavedClicktracks.filter(
        (ct) => ct.id !== clicktrack.id,
      );
      const result = [...withoutEdited];
      result.splice(
        indexOfEdited === -1 ? result.length : indexOfEdited,
        0,
        clicktrack,
      );

      if (!!user) {
        await setUserData({
          clicktracks: result.map(Clicktrack.encode),
        });
      } else {
        saveLocalClicktracks(result);
      }

      setLastSavedClicktrack(clicktrack);
      return true;
    } catch (error) {
      console.error('Failed to save changes', error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { clicktrack, setClicktrack, saveChanges, saving, changesSaved };
};
