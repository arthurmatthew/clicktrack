import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { Clicktrack } from '../../models/Clicktrack';
import { Metronome } from '../../models/Metronome';
import { Repeat } from '../../models/Repeat';
import { validateAddRepeat } from '../../utils/validators/validateAddRepeat';
import { SequencerControls } from './SequencerControls';
import { SequencerListMetronome } from './SequencerListMetronome';
import { SequencerListRepeat } from './SequencerListRepeat';
import { StrictModeDroppable } from '../core/StrictModeDroppable';
import { useNotify } from '../../hooks/useNotify';

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
  const { notify } = useNotify();

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
                  {(provided) => {
                    const transform = provided.draggableProps.style?.transform;
                    if (transform && provided.draggableProps.style) {
                      const transformY = transform.split(',')[1];
                      provided.draggableProps.style.transform =
                        'translate(0px,' + transformY;
                    }
                    return (
                      <li
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={
                          sequence
                            .slice(0, sequence.indexOf(section))
                            .find(
                              (section) =>
                                section instanceof Repeat && section.infinite
                            ) !== undefined
                            ? 'opacity-30'
                            : ''
                        }
                      >
                        {(() => {
                          const selected = section.id === selectedId;
                          if (section instanceof Metronome)
                            return (
                              <SequencerListMetronome
                                key={section.id}
                                selected={selected}
                                setSelectedId={setSelectedId}
                                metronome={section}
                              />
                            );
                          if (section instanceof Repeat)
                            return (
                              <SequencerListRepeat
                                key={section.id}
                                selected={selected}
                                setSelectedId={setSelectedId}
                                repeat={section}
                              />
                            );
                        })()}
                      </li>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </StrictModeDroppable>
      </DragDropContext>
      <SequencerControls
        addMetronome={() => {
          add(new Metronome());
        }}
        addRepeat={() => {
          if (validateAddRepeat(sequence, notify)) add(new Repeat());
        }}
      />
    </div>
  );
};
