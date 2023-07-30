import { motion } from 'framer-motion';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';

import { CreateSection } from '../../../components/app/metronomes/index/CreateSection';
import { MetronomeSection } from '../../../components/app/metronomes/index/MetronomeSection';
import { StrictModeDroppable } from '../../../components/app/metronomes/index/StrictModeDroppable';

import useStickyState from '../../../hooks/useStickyState';

import storage from '../../../configs/storage.config';

import Clicktrack from '../../../metronome/classes/clicktrack';

import nameChange from '../../../helpers/app/metronomes/nameChange';
import onDragEnd from '../../../helpers/app/metronomes/onDragEnd';
import remove from '../../../helpers/app/metronomes/remove';
import sortByPos from '../../../helpers/sortByPos';
import { useRef } from 'react';
import makeUnique from '../../../helpers/makeUnique';

/**
 * Webpage that lists metronomes from storage.
 */
const MetronomesIndex = () => {
  const [sections, setSections] = useStickyState<Clicktrack[]>(
    [new Clicktrack({ permanant: true, id: 'default', position: -1 })],
    storage.keys.metronome
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
      const importedClicktrack = JSON.parse(
        atob(importRef.current?.value as string)
      ) as Clicktrack;

      setSections((previousSections) => [
        ...previousSections,
        new Clicktrack({
          ...importedClicktrack,
          id: undefined,
          position: previousSections.length + 1,
          name: makeUnique('', importedClicktrack.name, previousSections),
        }),
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = () => {
    localStorage.removeItem(storage.keys.metronome);
    location.reload();
  };

  const handleRemove = (id: string) => {
    setSections((previousSections) => remove(id, previousSections));
  };

  const handleNameChange = (name: string, newName: string) => {
    setSections((previousSections) =>
      nameChange(name, newName, previousSections)
    );
  };

  const handleOnDragEnd = (result: DropResult) => {
    setSections((previousSections) => onDragEnd(result, previousSections));
  };

  return (
    <div className="mx-4 my-10 flex flex-grow flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <h1 className="text-3xl  ">Your Metronomes</h1>
        <div className="flex flex-col gap-2">
          <CreateSection icon="plus-square" add={handleAdd}>
            Create New
          </CreateSection>
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
                      <i className="bi-clipboard2 cursor-grab text-3xl text-neutral-600 dark:text-neutral-400" />
                      <input
                        className="w-full bg-transparent text-2xl text-white placeholder:text-white/50 focus:outline-none"
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
                  sortByPos(sections).map((metronome, i) => (
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
        <CreateSection icon="trash" add={handleClear}>
          Clear Storage
        </CreateSection>
      </div>
    </div>
  );
};

export default MetronomesIndex;
