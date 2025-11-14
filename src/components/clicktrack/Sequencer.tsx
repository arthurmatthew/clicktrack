import { Clicktrack } from '../../models/Clicktrack';
import { Metronome } from '../../models/Metronome';
import { Repeat } from '../../models/Repeat';
import { validateAddRepeat } from '../../utils/validators/validateAddRepeat';
import { SequencerControls } from './SequencerControls';
import { StrictModeDroppable } from '../core/StrictModeDroppable';
import { useNotify } from '../../hooks/useNotify';
import { Transition } from '../../models/Transition';
import {
  SequencerListMetronome,
  SequencerListRepeat,
  SequencerListTransition,
} from './SequencerList';
import {
  DropResult,
  DragDropContext,
  Draggable,
  DroppableProvided,
} from '@hello-pangea/dnd';

export interface ISequencer {
  addSection: (child: Clicktrack['data']['sections'][number]) => void;
  copySection: (id: string) => void;
  deleteSection: (id: string) => void;
  selectedId: string;
  setSelectedId: (id: string) => void;
  sequence: Clicktrack['data']['sections'];
  sequencerOnDragEnd: (result: DropResult) => void;
  isPlaying: boolean;
}

export const Sequencer = ({
  addSection,
  selectedId,
  setSelectedId,
  sequence,
  sequencerOnDragEnd,
  isPlaying,
  copySection,
  deleteSection,
}: ISequencer) => {
  const { notify } = useNotify();

  return (
    <div className="relative flex min-h-0 w-full flex-col select-none">
      <SequencerControls
        addMetronome={() => {
          addSection(new Metronome());
        }}
        addRepeat={() => {
          if (validateAddRepeat(sequence, notify)) addSection(new Repeat());
        }}
        addTransition={() => {
          addSection(new Transition());
        }}
      />
      <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-auto">
        <DragDropContext onDragEnd={sequencerOnDragEnd}>
          <StrictModeDroppable droppableId="sequencer">
            {(provided: DroppableProvided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-col text-xl"
              >
                {sequence.map((section, index) => (
                  <Draggable
                    index={index}
                    draggableId={section.id}
                    key={section.id}
                    isDragDisabled={isPlaying}
                  >
                    {(provided) => {
                      const transform =
                        provided.draggableProps.style?.transform;
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
                        >
                          {(() => {
                            const selected = section.id === selectedId;
                            const hidden =
                              sequence
                                .slice(0, sequence.indexOf(section))
                                .find(
                                  (section) =>
                                    section instanceof Repeat &&
                                    section.infinite,
                                ) !== undefined;
                            if (section instanceof Metronome)
                              return (
                                <SequencerListMetronome
                                  disableControls={isPlaying}
                                  key={section.id}
                                  {...{ hidden, selected, setSelectedId }}
                                  metronome={section}
                                  {...{ copySection, deleteSection }}
                                />
                              );
                            if (section instanceof Repeat)
                              return (
                                <SequencerListRepeat
                                  disableControls={isPlaying}
                                  key={section.id}
                                  {...{ hidden, selected, setSelectedId }}
                                  repeat={section}
                                  {...{ copySection, deleteSection }}
                                />
                              );
                            if (section instanceof Transition)
                              return (
                                <SequencerListTransition
                                  disableControls={isPlaying}
                                  key={section.id}
                                  {...{ hidden, selected, setSelectedId }}
                                  transition={section}
                                  {...{ copySection, deleteSection }}
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
        <p className="mb-20 py-4 text-center opacity-50">End of sequence</p>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 h-32 w-full rounded-b-sm bg-linear-to-t from-black to-transparent"></div>
    </div>
  );
};
