import { DropResult } from 'react-beautiful-dnd';
import { Clicktrack } from '../../models/clicktrack/Clicktrack';

export const onDragEnd = (result: DropResult, clicktracks: Clicktrack[]) => {
  if (!result.destination) return clicktracks;

  const previousClicktracksCopy = clicktracks;
  const [reorderedItem] = previousClicktracksCopy.splice(
    result.source.index,
    1
  );

  if (!reorderedItem) return clicktracks;

  previousClicktracksCopy.splice(result.destination.index, 0, reorderedItem);
  previousClicktracksCopy.map(
    (section, index) => (section.position = index + 1)
  );

  return previousClicktracksCopy;
};
