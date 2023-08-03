import { DropResult } from 'react-beautiful-dnd';

import { useLocalStorage } from '../../../hooks/useLocalStorage';

import { Clicktrack } from '../../../clicktrack';

import { useRef } from 'react';
import { Metronome, ClicktrackData } from '../../../clicktrack';
import { STORAGE_KEYS_CLICKTRACK } from '../../../config';
import { Heading } from '../../../components/clicktracks/Heading';
import { DragDropList } from '../../../components/clicktracks/DragDropList';
import { Footer } from '../../../components/clicktracks/Footer';

/**
 * Webpage that lists metronomes from storage.
 */
const ClicktracksIndex = () => {
  const [clicktracks, setClicktracks] = useLocalStorage<Clicktrack[]>(
    [
      new Clicktrack({
        permanant: true,
        id: 'default',
        position: -1,
        data: new ClicktrackData({ children: [new Metronome()] }),
      }),
    ],
    STORAGE_KEYS_CLICKTRACK
  );

  const handleAdd = () => {
    setClicktracks((previousClicktracks) => [
      ...previousClicktracks,
      new Clicktrack({
        name: `New Metronome ${previousClicktracks.length + 1}`,
        position: previousClicktracks.length + 1,
      }),
    ]);
  };

  const importRef = useRef<HTMLInputElement | null>(null);
  const handleImport = () => {
    try {
      const clicktrackCode = importRef.current?.value as string;
      const importedClicktrack = JSON.parse(atob(clicktrackCode)) as Clicktrack;

      setClicktracks((previousClicktracks) => [
        ...previousClicktracks,
        new Clicktrack({
          ...importedClicktrack,
          id: undefined,
          position: previousClicktracks.length + 1,
          name: Clicktrack.generateUniqueName(
            '',
            importedClicktrack.name,
            previousClicktracks
          ),
        }),
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEYS_CLICKTRACK);
    location.reload();
  };

  const handleRemove = (id: string) => {
    setClicktracks((previousClicktracks) => {
      if (
        !previousClicktracks.find((metronome) => metronome.id === id)?.permanant
      )
        return previousClicktracks.filter((metronome) => metronome.id !== id);
      return previousClicktracks;
    });
  };

  const handleNameChange = (name: string, newName: string) => {
    setClicktracks((previousClicktracks) => {
      const clicktracksWithoutToBeNamed = previousClicktracks.filter(
        (metronome) => metronome.name !== name
      );
      const clicktrackToBeNamed = previousClicktracks.find(
        (metronome) => metronome.name === name
      );

      if (!clicktrackToBeNamed) return previousClicktracks;

      return [
        ...clicktracksWithoutToBeNamed,
        {
          ...clicktrackToBeNamed,
          name: Clicktrack.generateUniqueName(
            name,
            newName,
            previousClicktracks
          ),
        },
      ];
    });
  };

  const handleOnDragEnd = (result: DropResult) => {
    setClicktracks((previousClicktracks) => {
      if (!result.destination) return previousClicktracks;

      const previousClicktracksCopy = previousClicktracks;
      const [reorderedItem] = previousClicktracksCopy.splice(
        result.source.index,
        1
      );

      if (!reorderedItem) return previousClicktracks;

      previousClicktracksCopy.splice(
        result.destination.index,
        0,
        reorderedItem
      );
      previousClicktracksCopy.map(
        (section, index) => (section.position = index + 1)
      );

      return previousClicktracksCopy;
    });
  };

  return (
    <div className="mx-4 my-10 flex flex-grow flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <Heading {...{ handleAdd }} />
        <DragDropList
          {...{
            clicktracks,
            handleNameChange,
            handleImport,
            handleRemove,
            handleOnDragEnd,
            importRef,
          }}
        />
        <Footer {...{ handleClear }} />
      </div>
    </div>
  );
};

export default ClicktracksIndex;
