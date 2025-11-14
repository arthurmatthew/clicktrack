import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { TSaveableData } from '../types';

/**
 * Normal React `setState` hook, except the state is stored and updated in local storage
 * @param defaultValue Set the state to this value if there is nothing stored under `key`
 * @param key The key where the state will be stored
 * @returns Normal React `setState` return
 */
export const useLocalStorage = <T extends TSaveableData>(
  defaultValue: T,
  key: string,
): [value: T, setValue: Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    const storedData = localStorage.getItem(key);
    if (storedData === null) {
      return defaultValue;
    }
    try {
      return JSON.parse(storedData) as T;
    } catch (e) {
      console.error(e);
      return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
};
