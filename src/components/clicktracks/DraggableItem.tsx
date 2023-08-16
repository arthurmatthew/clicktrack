import { motion } from 'framer-motion';
import { Draggable } from 'react-beautiful-dnd';
import { ClicktrackListItem } from './ClicktrackListItem';
import { Clicktrack } from '../../models/Clicktrack';

interface IDraggableItem {
  clicktrack: Clicktrack;
  index: number;
  handleRemove: (id: string) => void;
  handleNameChange: (name: string, newName: string) => void;
  handleCopy: (id: string) => void;
}

export const DraggableItem = ({
  clicktrack,
  index,
  handleRemove,
  handleNameChange,
  handleCopy,
}: IDraggableItem) => {
  return (
    <Draggable key={clicktrack.id} draggableId={clicktrack.id} index={index}>
      {(provided) => {
        const transform = provided.draggableProps.style?.transform;
        if (transform && provided.draggableProps.style) {
          const transformY = transform.split(',')[1];
          provided.draggableProps.style.transform =
            'translate(0px,' + transformY;
        }
        return (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="my-1"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <ClicktrackListItem
                handleRemove={() => {
                  handleRemove(clicktrack.id);
                }}
                handleNameChange={handleNameChange}
                handleCopy={handleCopy}
                clicktrack={clicktrack}
                dragHandle={provided.dragHandleProps}
              />
            </motion.div>
          </li>
        );
      }}
    </Draggable>
  );
};
