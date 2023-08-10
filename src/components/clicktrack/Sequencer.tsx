import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { Clicktrack } from '../../models/Clicktrack';
import { Metronome } from '../../models/Metronome';
import { Repeat } from '../../models/Repeat';
import { validateAddRepeat } from '../../utils/validators/validateAddRepeat';
import { SequencerControls } from './SequencerControls';
import { SequencerListMetronome } from './SequencerListMetronome';
import { SequencerListRepeat } from './SequencerListRepeat';
import { StrictModeDroppable } from '../core/StrictModeDroppable';

interface ISequencer {
  add: (child: Clicktrack['data']['sections'][number]) => void;
  selectedId: string;
  setSelectedId: (id: string) => void;
  sequence: Clicktrack['data']['sections'];
  sequencerOnDragEnd: (result: DropResult) => void;
  playingDisplay: boolean;
}

export const Sequencer = ({
  add,
  selectedId,
  setSelectedId,
  sequence,
  sequencerOnDragEnd,
  playingDisplay,
}: ISequencer) => {
  return (
    <div className="flex h-full select-none flex-col gap-2">
      <DragDropContext onDragEnd={sequencerOnDragEnd}>
        <StrictModeDroppable droppableId="sequencer">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex h-full flex-col text-xl"
            >
              {sequence.map((section, index) => (
                <Draggable
                  index={index}
                  draggableId={section.id}
                  key={section.id}
                  isDragDisabled={playingDisplay}
                >
                  {(provided) => (
                    <li
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      {(() => {
                        const selected = section.id === selectedId;
                        if (section instanceof Metronome)
                          return (
                            <SequencerListMetronome
                              key={section.id}
                              selected={selected}
                              setSelectedId={setSelectedId}
                              metronome={section as Metronome}
                            />
                          );
                        if (section instanceof Repeat)
                          return (
                            <SequencerListRepeat
                              key={section.id}
                              selected={selected}
                              setSelectedId={setSelectedId}
                              repeat={section as Repeat}
                            />
                          );
                      })()}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </StrictModeDroppable>
      </DragDropContext>
      <SequencerControls
        addMetronome={() => add(new Metronome())}
        addRepeat={() => {
          if (validateAddRepeat(sequence)) add(new Repeat());
        }}
      />
    </div>
  );
};
