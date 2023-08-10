import { useRef } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { STORAGE_KEYS_CLICKTRACK } from '../config';
import { Clicktrack } from '../models/Clicktrack';
import { addNewClicktrack } from '../utils/clicktracks/addNewClicktrack';
import { changeClicktrackName } from '../utils/clicktracks/changeClicktrackName';
import { importClicktrack } from '../utils/clicktracks/importClicktrack';
import { onDragEnd } from '../utils/clicktracks/onDragEnd';
import { removeClicktrack } from '../utils/clicktracks/removeClicktrack';
import { useLocalStorage } from './useLocalStorage';

export const useLocalClicktracks = (localStorageKey: string) => {
  const importRef = useRef<HTMLInputElement | null>(null);
  const [clicktracks, setClicktracks] = useLocalStorage<Clicktrack[]>(
    [
      new Clicktrack({
        permanant: true,
        id: 'default',
      }),
    ],
    localStorageKey
  );

  const handleAdd = () => addNewClicktrack(setClicktracks);
  const handleRemove = (id: string) => removeClicktrack(setClicktracks, id);
  const handleImport = () =>
    importClicktrack(setClicktracks, importRef.current?.value as string);

  const handleNameChange = (id: string, newName: string) =>
    changeClicktrackName(setClicktracks, id, newName);

  const handleOnDragEnd = (result: DropResult) =>
    onDragEnd(setClicktracks, result);

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEYS_CLICKTRACK);
    location.reload();
  };

  return {
    clicktracks,
    importRef,
    handleAdd,
    handleImport,
    handleClear,
    handleRemove,
    handleNameChange,
    handleOnDragEnd,
  };
};
