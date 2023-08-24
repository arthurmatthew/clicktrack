import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable } from '../core/StrictModeDroppable';
import { Clicktrack } from '../../models/Clicktrack';
import { DraggableItem } from './DraggableItem';
import { NoClicktracksPlaceholder } from './NoClicktracksPlaceholder';

interface IDragDropList {
  clicktracks: Clicktrack[];
  handleOnDragEnd: (result: DropResult) => void;
  handleRemove: (id: string) => void;
  handleNameChange: (name: string, newName: string) => void;
  handleCopy: (id: string) => void;
}

export const DragDropList = ({
  clicktracks,
  handleOnDragEnd,
  handleRemove,
  handleNameChange,
  handleCopy,
}: IDragDropList) => {
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <StrictModeDroppable droppableId="metronomes">
        {(provided) => (
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
                  clicktracks={clicktracks}
                  key={clicktrack.id}
                  {...{
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
