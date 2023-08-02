import { motion } from 'framer-motion';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';

import { InteractableListItem } from '../../../components/InteractableListItem';
import { MetronomeSection } from '../../../components/ClicktrackListItem';
import { StrictModeDroppable } from '../../../components/StrictModeDroppable';

import { useStickyState } from '../../../hooks/useStickyState';

import { Clicktrack } from '../../../clicktrack';

import { useRef } from 'react';
import { Metronome, ClicktrackData } from '../../../clicktrack';
import { STORAGE_KEYS_CLICKTRACK } from '../../../config';

/**
 * Webpage that lists metronomes from storage.
 */
const ClicktracksIndex = () => {
  const [clicktracks, setClicktracks] = useStickyState<Clicktrack[]>(
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
        <h1 className="text-3xl  ">Your Clicktracks</h1>
        <div className="flex flex-col gap-2">
          <InteractableListItem icon="plus-square" interaction={handleAdd}>
            Create New
          </InteractableListItem>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <StrictModeDroppable droppableId="metronomes">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-col"
              >
                <div className="my-2 rounded-sm border-[1px] border-neutral-200 p-4 dark:border-neutral-900">
                  <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                    <div className="flex w-full grid-cols-3 items-center gap-3">
                      <i className="bi-clipboard2 text-3xl text-neutral-600 dark:text-neutral-400" />
                      <input
                        className="w-full bg-transparent text-2xl placeholder:text-black/50 focus:outline-none dark:placeholder:text-white/50"
                        placeholder="Have a code? Paste it here."
                        ref={importRef}
                      />
                    </div>
                    <div className="my-2 block h-px w-full bg-gradient-to-r from-neutral-300 to-transparent dark:from-neutral-700 sm:hidden" />
                    <button
                      onClick={handleImport}
                      className="rounded-sm bg-neutral-500 px-10 py-2 text-white"
                    >
                      Import
                    </button>
                  </div>
                </div>
                {clicktracks.length === 0 ? (
                  <h1 className="text-center  ">
                    You don't have any metronomes right now.
                  </h1>
                ) : (
                  clicktracks
                    .sort((a, b) => a.position - b.position)
                    .map((clicktrack, i) => (
                      <Draggable
                        key={clicktrack.id}
                        draggableId={clicktrack.id}
                        index={i}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="my-2"
                          >
                            <motion.div
                              initial={{ opacity: 0, x: -50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, ease: 'easeOut' }}
                            >
                              <MetronomeSection
                                remove={() => handleRemove(clicktrack.id)}
                                changeName={handleNameChange}
                                metronome={clicktrack}
                                dragHandle={provided.dragHandleProps}
                              />
                            </motion.div>
                          </li>
                        )}
                      </Draggable>
                    ))
                )}
                {provided.placeholder}
              </ul>
            )}
          </StrictModeDroppable>
        </DragDropContext>
        <InteractableListItem icon="trash" interaction={handleClear}>
          Clear Storage
        </InteractableListItem>
      </div>
    </div>
  );
};

export default ClicktracksIndex;
