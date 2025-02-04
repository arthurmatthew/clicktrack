import { useRef } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { Clicktrack } from '../models/Clicktrack';
import { useNotify } from './useNotify';
import { useClicktrackStorage } from './useClicktrackStorage';

/**
 * Built upon the `useClicktrackStorage` hook, this hook provides functions to interact with the
 * stored Clicktracks. This is seperate from actual Clicktrack individual storage functionality,
 * as inside of the app the only data passed into the Clicktrack page is the Clicktrack ID. Is
 * this redundant?!
 */
export const useClicktracks = () => {
  const { clicktracks, setClicktracks } = useClicktrackStorage();
  const { notify } = useNotify();
  const importRef = useRef<HTMLInputElement | null>(null);

  const handleAdd = () => {
    setClicktracks((previousClicktracks) => {
      if (previousClicktracks === undefined) return;
      return [
        ...previousClicktracks,
        new Clicktrack({
          name: `New Metronome ${previousClicktracks.length + 1}`,
        }),
      ];
    });
  };

  const handleRemove = (id: string) => {
    setClicktracks((previousClicktracks) => {
      if (previousClicktracks === undefined) return;
      if (
        !previousClicktracks.find((metronome) => metronome.id === id)?.permanant
      )
        return previousClicktracks.filter((metronome) => metronome.id !== id);
      return previousClicktracks;
    });
  };

  const handleImport = () => {
    setClicktracks((previousClicktracks) => {
      if (
        previousClicktracks === undefined ||
        importRef.current?.value === undefined
      )
        return;
      try {
        const importedClicktrack = Clicktrack.decode(importRef.current.value);

        if (importedClicktrack === undefined)
          throw new Error('Clicktrack code returns undefined.');
        notify(`Import successful.`, 'info');

        return [
          ...previousClicktracks,
          new Clicktrack({
            ...importedClicktrack,
            id: undefined,
            name: importedClicktrack.name,
          }),
        ];
      } catch (error) {
        notify(
          `We couldn't parse your code. Check your browser console for more details.`,
          'error'
        );
        console.error(error);
        return previousClicktracks;
      }
    });
  };

  const handleTemplate = (code: string) => {
    setClicktracks((previousClicktracks) => {
      if (previousClicktracks === undefined) return;
      try {
        const template = Clicktrack.decode(code);

        if (template === undefined)
          throw new Error('Clicktrack from code is undefined');
        notify(`Template added!`, 'info');

        return [
          ...previousClicktracks,
          new Clicktrack({
            ...template,
            id: undefined,
            name: template.name,
          }),
        ];
      } catch (error) {
        notify(
          `We couldn't import this template. Check your browser console for more details.`,
          'error'
        );
        console.error(error);
        return previousClicktracks;
      }
    });
  };

  const handleNameChange = (id: string, newName: string) => {
    setClicktracks((previousClicktracks) => {
      if (previousClicktracks === undefined) return;
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
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    setClicktracks((previousClicktracks) => {
      if (previousClicktracks === undefined) return;
      const result = [...previousClicktracks];
      const [removed] = result.splice(source.index, 1);
      if (removed) result.splice(destination.index, 0, removed);
      return result;
    });
  };

  const handleCopy = (id: string) => {
    setClicktracks((previousClicktracks) => {
      if (previousClicktracks === undefined) return;
      const clicktrackToCopy = previousClicktracks.find(
        (clicktrack) => clicktrack.id === id
      );
      if (!clicktrackToCopy) return previousClicktracks;

      return [
        ...previousClicktracks,
        new Clicktrack({
          ...clicktrackToCopy,
          id: undefined,
        }),
      ];
    });
  };

  return {
    clicktracks,
    importRef,
    handleAdd,
    handleImport,
    handleTemplate,
    handleRemove,
    handleNameChange,
    handleOnDragEnd,
    handleCopy,
  };
};
