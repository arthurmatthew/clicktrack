import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';
import { Clicktrack } from '../../clicktrack';
import { IImport, Import } from './Import';
import { DraggableItem } from './DraggableItem';

interface DragDropList extends IImport {
  clicktracks: Clicktrack[];
  handleOnDragEnd: (result: DropResult) => void;
  handleRemove: (id: string) => void;
  handleNameChange: (name: string, newName: string) => void;
}

export const DragDropList = ({
  clicktracks,
  handleOnDragEnd,
  handleImport,
  handleRemove,
  handleNameChange,
  importRef,
}: DragDropList) => {
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <StrictModeDroppable droppableId="metronomes">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col"
          >
            <Import {...{ handleImport, importRef }} />
            {clicktracks.length === 0 ? (
              <h1 className="text-center  ">
                You don't have any metronomes right now.
              </h1>
            ) : (
              clicktracks
                .sort((a, b) => a.position - b.position)
                .map((clicktrack, index) => (
                  <DraggableItem
                    {...{ handleNameChange, handleRemove, clicktrack, index }}
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
