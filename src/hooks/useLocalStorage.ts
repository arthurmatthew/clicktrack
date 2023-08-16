import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { TSaveableData } from '../types';
import { useNotify } from './useNotify';

/**
 * Normal React `setState` hook, except the state is stored and updated in local storage
 * @param defaultValue Set the state to this value if there is nothing stored under `key`
 * @param key The key where the state will be stored
 * @returns Normal React `setState` return
 */
export const useLocalStorage = <T extends TSaveableData>(
  defaultValue: T,
  key: string
): [value: T, setValue: Dispatch<SetStateAction<T>>] => {
  const { notify } = useNotify();

  const [value, setValue] = useState<T>(() => {
    const storedData = localStorage.getItem(key);
    if (storedData === null) {
      return defaultValue;
    }
    try {
      return JSON.parse(storedData) as T;
    } catch (e) {
      notify(
        'Something went wrong while loading your clicktracks. Check the browser console for details.',
        'error'
      );
      console.error(e);
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
