import { DropResult } from 'react-beautiful-dnd';
import { STORAGE_KEYS_CLICKTRACK } from '../config';
import { Clicktrack } from '../models/clicktrack/Clicktrack';
import { ClicktrackData } from '../models/clicktrack/ClicktrackData';
import { Metronome } from '../models/clicktrack/Metronome';
import { addNewClicktrack } from '../utils/clicktracks/addNewClicktrack';
import { changeClicktrackName } from '../utils/clicktracks/changeClicktrackName';
import { importClicktrack } from '../utils/clicktracks/importClicktrack';
import { onDragEnd } from '../utils/clicktracks/onDragEnd';
import { removeClicktrack } from '../utils/clicktracks/removeClicktrack';
import { useLocalStorage } from './useLocalStorage';
import { useRef } from 'react';

export const useLocalClicktracks = (localStorageKey: string) => {
  const importRef = useRef<HTMLInputElement | null>(null);
  const [clicktracks, setClicktracks] = useLocalStorage<Clicktrack[]>(
    [
      new Clicktrack({
        permanant: true,
        id: 'default',
        position: -1,
        data: new ClicktrackData({ children: [new Metronome()] }),
      }),
    ],
    localStorageKey
  );

  const handleAdd = () => {
    setClicktracks((previousClicktracks) =>
      addNewClicktrack(previousClicktracks)
    );
  };
  const handleImport = () => {
    setClicktracks((previousClicktracks) =>
      importClicktrack(importRef.current?.value as string, previousClicktracks)
    );
  };
  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEYS_CLICKTRACK);
    location.reload();
  };
  const handleRemove = (id: string) => {
    setClicktracks((previousClicktracks) =>
      removeClicktrack(previousClicktracks, id)
    );
  };
  const handleNameChange = (name: string, newName: string) => {
    setClicktracks((previousClicktracks) =>
      changeClicktrackName(previousClicktracks, name, newName)
    );
  };
  const handleOnDragEnd = (result: DropResult) => {
    setClicktracks((previousClicktracks) =>
      onDragEnd(result, previousClicktracks)
    );
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
