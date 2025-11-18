import { useRef } from 'react';
import { Clicktrack } from '../models/Clicktrack';
import { useNotify } from './useNotify';
import { useClicktrackStorage } from './useClicktrackStorage';
import { DropResult } from '@hello-pangea/dnd';
import {
  CLICKTRACK_NAME_MAX_LENGTH,
  CLICKTRACK_NAME_MIN_LENGTH,
} from '../config';
import { shareClicktrack } from '../lib/firebase/shareClicktrack';
import { useUser } from './useUser';

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
  const { user, initialized } = useUser();

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
    if (importRef.current?.value === undefined) return;

    const inputValue = importRef.current.value;

    try {
      const importedClicktrack = Clicktrack.decode(inputValue);

      if (importedClicktrack === undefined)
        throw new Error('Clicktrack code returns undefined.');

      setClicktracks((previousClicktracks) => {
        if (previousClicktracks === undefined) return;

        return [
          ...previousClicktracks,
          new Clicktrack({
            ...importedClicktrack,
            id: undefined,
            name: importedClicktrack.name,
          }),
        ];
      });

      notify(`Import successful.`, 'info');

      if (importRef.current) {
        importRef.current.value = '';
      }
    } catch (error) {
      notify(
        `We couldn't parse your code. Check your browser console for more details.`,
        'error',
      );
      console.error(error);
    }
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
          'error',
        );
        console.error(error);
        return previousClicktracks;
      }
    });
  };

  const handleNameChange = (id: string, newName: string) => {
    const trimmedName = newName.trim();

    if (trimmedName.length > CLICKTRACK_NAME_MAX_LENGTH) {
      notify('Name is too long', 'error');
      return;
    }

    if (trimmedName.length < CLICKTRACK_NAME_MIN_LENGTH) {
      notify('Name is too short', 'error');
      return;
    }

    setClicktracks((previousClicktracks) => {
      if (previousClicktracks === undefined) return;

      return previousClicktracks.map((clicktrack) =>
        clicktrack.id === id
          ? new Clicktrack({ ...clicktrack, name: newName })
          : clicktrack,
      );
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
        (clicktrack) => clicktrack.id === id,
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

  const handleShare = async (id: string): Promise<string | undefined> => {
    const clicktrack = clicktracks?.find((ct) => ct.id === id);
    if (!clicktrack) return;
    if (!initialized || user === null) return;

    try {
      const shareableLink = await shareClicktrack(clicktrack.id, user.uid, {
        name: clicktrack.name,
        data: Clicktrack.encode(clicktrack),
        isPublic: false,
        description: '',
        createdBy: user.uid,
      });

      if (shareableLink === null) return;

      await navigator.clipboard.writeText(shareableLink);
      notify('Share link copied to clipboard!', 'info');

      return shareableLink;
    } catch (error) {
      notify('Failed to create share link', 'error');
      return;
    }
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
    handleShare,
  };
};
