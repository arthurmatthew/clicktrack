import { STORAGE_KEYS_CLICKTRACK } from '../config';
import { Clicktrack } from '../models/Clicktrack';

export const getClicktrackFromLocalStorageByID = (id: string | undefined) => {
  if (id === undefined) return undefined;

  const getClicktrack = (id: string) => {
    const clicktracks = JSON.parse(
      localStorage.getItem(STORAGE_KEYS_CLICKTRACK) as string
    ) as Clicktrack[];
    return clicktracks.find((clicktrack) => clicktrack.id === id);
  };

  const clicktrack = getClicktrack(decodeURIComponent(id));

  return clicktrack;
};
