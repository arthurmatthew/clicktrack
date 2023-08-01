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
  const [sections, setSections] = useStickyState<Clicktrack[]>(
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
    setSections((previousSections) => [
      ...previousSections,
      new Clicktrack({
        name: `New Metronome ${previousSections.length + 1}`,
        position: previousSections.length + 1,
      }),
    ]);
  };

  const importRef = useRef<HTMLInputElement | null>(null);
  const handleImport = () => {
    try {
      const clicktrackCode = importRef.current?.value as string;
      const importedClicktrack = JSON.parse(atob(clicktrackCode)) as Clicktrack;

      setSections((previousSections) => [
        ...previousSections,
        new Clicktrack({
          ...importedClicktrack,
          id: undefined,
          position: previousSections.length + 1,
          name: Clicktrack.generateUniqueName(
            '',
            importedClicktrack.name,
            previousSections
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
    setSections((previousSections) => {
      if (!previousSections.find((metronome) => metronome.id === id)?.permanant)
        return previousSections.filter((metronome) => metronome.id != id);
      return previousSections;
    });
  };

  const handleNameChange = (name: string, newName: string) => {
    setSections((previousSections) => [
      ...previousSections.filter((metronome) => metronome.name != name),
      {
        ...previousSections.filter((metronome) => metronome.name === name)[0],
        name: Clicktrack.generateUniqueName(name, newName, previousSections),
      },
    ]);
  };

  const handleOnDragEnd = (result: DropResult) => {
    setSections((previousSections) => {
      if (!result.destination) return previousSections;

      const previousSectionsCopy = previousSections;
      const [reorderedItem] = previousSectionsCopy.splice(
        result.source.index,
        1
      );

      previousSectionsCopy.splice(result.destination.index, 0, reorderedItem);
      previousSectionsCopy.map(
        (section, index) => (section.position = index + 1)
      );

      return previousSectionsCopy;
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
                {sections.length === 0 ? (
                  <h1 className="text-center  ">
                    You don't have any metronomes right now.
                  </h1>
                ) : (
                  sections
                    .sort((a, b) => a.position - b.position)
                    .map((metronome, i) => (
                      <Draggable
                        key={metronome.id}
                        draggableId={metronome.id}
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
                                remove={() => handleRemove(metronome.id)}
                                changeName={handleNameChange}
                                metronome={metronome}
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
