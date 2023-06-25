import { TipSection } from '../../components/app/TipSection';
import { CreateSection } from '../../components/app/CreateSection';
import { MetronomeSection } from '../../components/app/MetronomeSection';
import { motion } from 'framer-motion';
import useStickyState from '../../hooks/useStickyState';
import sortByPos from '../../helpers/sortByPos';
import makeUnique from '../../helpers/makeUnique';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable } from '../../components/app/StrictModeDroppable';

export interface Section {
  name: string;
  id: string;
  position: number;
  data: {
    bpm: number;
  };
  opened?: boolean;
}

const defaultMetronome: Section = {
  name: 'Basic Metronome',
  id: 'default',
  opened: false,
  position: 1,
  data: {
    bpm: 120,
  },
} as Section;

const Metronomes = () => {
  const [sections, setSections] = useStickyState<Section[]>(
    [defaultMetronome],
    'metronomes'
  );

  const handleAdd = () => {
    setSections((prev) => [
      ...prev,
      {
        ...defaultMetronome,
        name: 'New Metronome ' + (prev.length + 1),
        id: uuidv4(),
        position: prev.length + 1,
      },
    ]);
  };

  const handleRemove = (id: string) => {
    setSections((prev) => prev.filter((metronome) => metronome.id != id));
  };

  const handleNameChange = (name: string, newName: string) => {
    setSections((prev) => [
      ...prev.filter((metronome) => metronome.name != name),
      {
        ...prev.filter((metronome) => metronome.name == name)[0],
        name: makeUnique(name, newName, prev),
      },
    ]);
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sectionsCopy = sections;
    const [reorderedItem] = sectionsCopy.splice(result.source.index, 1);
    sectionsCopy.splice(result.destination.index, 0, reorderedItem);

    sectionsCopy.map((section, i) => (section.position = i + 1));

    setSections(sectionsCopy);
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
                className="flex flex-col gap-4"
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
      </div>
    </div>
  );
};

export default Metronomes;
