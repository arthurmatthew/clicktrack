import { useEffect } from 'react';
import { STORAGE_KEYS_CLICKTRACK } from '../../config';
import { Clicktrack } from '../../models/Clicktrack';

export const useClicktrackUpdater = (clicktrack: Clicktrack) => {
  useEffect(() => {
    const storedClicktracks = JSON.parse(
      localStorage.getItem(STORAGE_KEYS_CLICKTRACK) as string
    ) as Clicktrack[];
    const updatedClicktracks = JSON.stringify([
      ...storedClicktracks.filter(
        (storedClicktrack) => storedClicktrack.id !== clicktrack.id
      ),
      clicktrack,
    ]);
    localStorage.setItem(STORAGE_KEYS_CLICKTRACK, updatedClicktracks);
  }, [clicktrack]);
};
