import { STORAGE_KEYS_CLICKTRACK } from '../config';

export const clearLocalClicktracks = () => {
  localStorage.removeItem(STORAGE_KEYS_CLICKTRACK);
};
