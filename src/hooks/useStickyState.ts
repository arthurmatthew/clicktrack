import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type SaveableData = string | number | object | boolean | undefined | null;

/**
 * Normal React `setState` hook, except the state is stored and updated in local storage
 * @param defaultValue Set the state to this value if there is nothing stored under `key`
 * @param key The key where the state will be stored
 * @returns Normal React `setState` return
 */
export function useStickyState<T extends SaveableData>(
  defaultValue: T,
  key: string
): [value: T, setValue: Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const v = localStorage.getItem(key);
    if (v === null) {
      return defaultValue;
    }
    try {
      return JSON.parse(v);
    } catch (e) {
      console.error('Could not parse data');
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
