import { STORAGE_KEYS_CLICKTRACK } from '../config';
import { Clicktrack } from '../models/Clicktrack';

export const saveLocalClicktracks = (clicktracks: Clicktrack[]) => {
  const encoded = clicktracks.map((ct) => Clicktrack.encode(ct));
  localStorage.setItem(STORAGE_KEYS_CLICKTRACK, JSON.stringify(encoded));
};
