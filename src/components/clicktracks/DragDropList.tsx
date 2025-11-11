import { StrictModeDroppable } from '../core/StrictModeDroppable';
import { Clicktrack } from '../../models/Clicktrack';
import { DraggableItem } from './DraggableItem';
import { NoClicktracksPlaceholder } from './NoClicktracksPlaceholder';
import { DropResult, DragDropContext, DroppableProvided } from '@hello-pangea/dnd';

interface IDragDropList {
  clicktracks: Clicktrack[];
  limitSaves: boolean;
  handleOnDragEnd: (result: DropResult) => void;
  handleRemove: (id: string) => void;
  handleNameChange: (name: string, newName: string) => void;
  handleCopy: (id: string) => void;
}

export const DragDropList = ({
  clicktracks,
  limitSaves,
  handleOnDragEnd,
  handleRemove,
  handleNameChange,
  handleCopy,
}: IDragDropList) => {
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <StrictModeDroppable droppableId="metronomes">
        {(provided: DroppableProvided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col"
          >
            {clicktracks.length === 0 ? (
              <NoClicktracksPlaceholder />
            ) : (
              clicktracks.map((clicktrack, index) => (
                <DraggableItem
                  key={clicktrack.id}
                  {...{
                    limitSaves,
                    handleNameChange,
                    handleRemove,
                    clicktrack,
                    index,
                    handleCopy,
                  }}
                />
              ))
            )}
            {provided.placeholder}
          </ul>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};
