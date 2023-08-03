import { DropResult } from 'react-beautiful-dnd';

import { useLocalStorage } from '../../../hooks/useLocalStorage';

import { Clicktrack, ClicktrackData, Metronome } from '../../../clicktrack';

import { useRef } from 'react';

import { DragDropList } from '../../../components/clicktracks/DragDropList';
import { Footer } from '../../../components/clicktracks/Footer';
import { Heading } from '../../../components/clicktracks/Heading';

import { STORAGE_KEYS_CLICKTRACK } from '../../../config';

import { addNewClicktrack } from '../../../utils/clicktracks/addNewClicktrack';
import { changeClicktrackName } from '../../../utils/clicktracks/changeClicktrackName';
import { importClicktrack } from '../../../utils/clicktracks/importClicktrack';
import { onDragEnd } from '../../../utils/clicktracks/onDragEnd';
import { removeClicktrack } from '../../../utils/clicktracks/removeClicktrack';

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
  const importRef = useRef<HTMLInputElement | null>(null);

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
