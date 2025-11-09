import { STORAGE_KEYS_CLICKTRACK } from '../config';
import { Clicktrack } from '../models/Clicktrack';

export const loadLocalClicktracks = (): Clicktrack[] => {
  const raw = localStorage.getItem(STORAGE_KEYS_CLICKTRACK);
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw) as unknown[];

    return arr.map((item) => {
      if (typeof item === 'string') {
        try {
          console.log(Clicktrack.decode(item));
          return Clicktrack.decode(item);
        } catch (e) {
          console.warn(
            'Failed to decode clicktrack string from localStorage',
            e
          );
          return Clicktrack.parseInternals(item as any);
        }
      }

      return Clicktrack.parseInternals(item as any);
    });
  } catch (err) {
    console.error('Failed to parse local clicktracks', err);
    return [];
  }
};
