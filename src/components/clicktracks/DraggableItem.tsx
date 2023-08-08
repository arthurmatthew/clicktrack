import { motion } from 'framer-motion';
import { Draggable } from 'react-beautiful-dnd';
import { ClicktrackListItem } from './ClicktrackListItem';
import { Clicktrack } from '../../models/Clicktrack';

interface IDraggableItem {
  clicktrack: Clicktrack;
  index: number;
  handleRemove: (id: string) => void;
  handleNameChange: (name: string, newName: string) => void;
}

export const DraggableItem = ({
  clicktrack,
  index,
  handleRemove,
  handleNameChange,
}: IDraggableItem) => {
  return (
    <Draggable key={clicktrack.id} draggableId={clicktrack.id} index={index}>
      {(provided) => (
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
              remove={() => handleRemove(clicktrack.id)}
              changeName={handleNameChange}
              metronome={clicktrack}
              dragHandle={provided.dragHandleProps}
            />
          </motion.div>
        </li>
      )}
    </Draggable>
  );
};
