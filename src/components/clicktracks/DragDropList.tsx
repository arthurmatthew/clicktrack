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
  handleCopy: (id: string) => void;
}

export const DragDropList = ({
  clicktracks,
  handleOnDragEnd,
  handleImport,
  handleRemove,
  handleNameChange,
  importRef,
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
            <Import {...{ handleImport, importRef }} />
            {clicktracks.length === 0 ? (
              <h1 className="my-20 text-center text-3xl">
                You don&apos;t have any clicktracks made. Make a new one,
                it&apos;s super easy!
              </h1>
            ) : (
              clicktracks.map((clicktrack, index) => (
                <DraggableItem
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
