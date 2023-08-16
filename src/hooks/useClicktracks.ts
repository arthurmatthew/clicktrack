import { useRef } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { STORAGE_KEYS_CLICKTRACK } from '../config';
import { Clicktrack } from '../models/Clicktrack';
import { useLocalStorage } from './useLocalStorage';

export const useClicktracks = (localStorageKey: string) => {
  const importRef = useRef<HTMLInputElement | null>(null);
  const [clicktracks, setClicktracks] = useLocalStorage<Clicktrack[]>(
    [new Clicktrack()],
    localStorageKey
  );

  const handleAdd = () =>
    setClicktracks((previousClicktracks) => [
      ...previousClicktracks,
      new Clicktrack({
        name: `New Metronome ${previousClicktracks.length + 1}`,
      }),
    ]);

  const handleRemove = (id: string) =>
    setClicktracks((previousClicktracks) => {
      if (
        !previousClicktracks.find((metronome) => metronome.id === id)?.permanant
      )
        return previousClicktracks.filter((metronome) => metronome.id !== id);
      return previousClicktracks;
    });

  const handleImport = () =>
    setClicktracks((previousClicktracks) => {
      try {
        const importedClicktrack = JSON.parse(
          atob(importRef.current?.value as string)
        ) as Clicktrack;

        return [
          ...previousClicktracks,
          new Clicktrack({
            ...importedClicktrack,
            id: undefined,
            name: importedClicktrack.name,
          }),
        ];
      } catch (error) {
        console.error(error);
        return previousClicktracks;
      }
    });

  const handleNameChange = (id: string, newName: string) =>
    setClicktracks((previousClicktracks) => {
      const clicktracksWithoutToBeNamed = previousClicktracks.filter(
        (metronome) => metronome.id !== id
      );
      const clicktrackToBeNamed = previousClicktracks.find(
        (metronome) => metronome.id === id
      );

      if (!clicktrackToBeNamed) return previousClicktracks;

      const clicktrackToBeNamedIndex =
        previousClicktracks.indexOf(clicktrackToBeNamed);

      clicktracksWithoutToBeNamed.splice(
        clicktrackToBeNamedIndex,
        0,
        new Clicktrack({ ...clicktrackToBeNamed, name: newName })
      );

      return clicktracksWithoutToBeNamed;
    });

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    setClicktracks((previousClicktracks) => {
      const result = [...previousClicktracks];
      const [removed] = result.splice(source.index, 1);
      if (removed) result.splice(destination.index, 0, removed);
      return result;
    });
  };

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
