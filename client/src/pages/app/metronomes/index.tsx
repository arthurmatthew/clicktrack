import { motion } from 'framer-motion';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';

import { TipSection } from '../../../components/app/metronomes/index/TipSection';
import { CreateSection } from '../../../components/app/metronomes/index/CreateSection';
import { MetronomeSection } from '../../../components/app/metronomes/index/MetronomeSection';
import { StrictModeDroppable } from '../../../components/app/metronomes/index/StrictModeDroppable';

import useStickyState from '../../../hooks/useStickyState';

import storage from '../../../configs/storage.config';

import Section from '../../../types/app/metronomes/Section';

import sortByPos from '../../../helpers/sortByPos';
import add from '../../../helpers/app/metronomes/add';
import remove from '../../../helpers/app/metronomes/remove';
import nameChange from '../../../helpers/app/metronomes/nameChange';
import onDragEnd from '../../../helpers/app/metronomes/onDragEnd';

import template from '../../../metronome/template';

const MetronomesIndex = () => {
  const [sections, setSections] = useStickyState<Section[]>(
    [template],
    storage.key
  );

  const handleAdd = () => {
    setSections((prev) => [...prev, add(template, prev)]);
  };

  const handleClear = () => {
    localStorage.removeItem(storage.key);
    location.reload();
  };

  const handleRemove = (id: string) => {
    setSections((prev) => remove(id, prev));
  };

  const handleNameChange = (name: string, newName: string) => {
    setSections((prev) => nameChange(name, newName, prev));
  };

  const handleOnDragEnd = (result: DropResult) => {
    setSections((prev) => onDragEnd(result, prev));
  };

  const [tipShowing, setTipShowing] = useStickyState<boolean>(
    true,
    'show-bookmark-tip'
  );

  return (
    <div className="mx-4 my-10 flex flex-grow flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <h1 className="text-3xl text-slate-900 dark:text-slate-200">
          Your Metronomes
        </h1>
        {tipShowing && (
          <TipSection remove={() => setTipShowing(false)}>
            Bookmark this page to have instant access!
          </TipSection>
        )}
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
                {sections.length == 0 ? (
                  <h1 className="text-center text-slate-700 dark:text-slate-200">
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
                          className={sections.length - i == 1 ? '' : 'mb-4'}
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
