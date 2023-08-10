import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable } from '../core/StrictModeDroppable';
import { Clicktrack } from '../../models/Clicktrack';
import { IImport, Import } from './Import';
import { DraggableItem } from './DraggableItem';

interface IDragDropList extends IImport {
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
            <Import {...{ handleImport, importRef }} />
            {clicktracks.length === 0 ? (
              <h1 className="text-center  ">
                You don't have any metronomes right now.
              </h1>
            ) : (
              clicktracks.map((clicktrack, index) => (
                <DraggableItem
                  key={clicktrack.id}
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
