import { motion } from 'framer-motion';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';

import { CreateSection } from '../../../components/app/metronomes/index/CreateSection';
import { MetronomeSection } from '../../../components/app/metronomes/index/MetronomeSection';
import { StrictModeDroppable } from '../../../components/app/metronomes/index/StrictModeDroppable';

import useStickyState from '../../../hooks/useStickyState';

import storage from '../../../configs/storage.config';

import Clicktrack from '../../../metronome/classes/clicktrack';

import add from '../../../helpers/app/metronomes/add';
import nameChange from '../../../helpers/app/metronomes/nameChange';
import onDragEnd from '../../../helpers/app/metronomes/onDragEnd';
import remove from '../../../helpers/app/metronomes/remove';
import sortByPos from '../../../helpers/sortByPos';

/**
 * Webpage that lists metronomes from storage.
 */
const MetronomesIndex = () => {
  const [sections, setSections] = useStickyState<Clicktrack[]>(
    [new Clicktrack({ permanant: true })],
    storage.keys.metronome
  );

  const handleAdd = () => {
    setSections((previousSections) => [
      ...previousSections,
      add(new Clicktrack({ permanant: true }), previousSections),
    ]);
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
        <h1 className="text-3xl text-black dark:text-white">Your Metronomes</h1>
        <div className="flex flex-col gap-2">
          <CreateSection icon="plus-square" add={handleAdd}>
            Create New
          </CreateSection>
          <CreateSection icon="file-earmark-plus" add={handleAdd}>
            Use Template
          </CreateSection>
          <CreateSection icon="download" add={handleAdd}>
            Import
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
                {sections.length === 0 ? (
                  <h1 className="text-center text-black dark:text-white">
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
