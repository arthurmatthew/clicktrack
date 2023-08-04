import { DropResult } from 'react-beautiful-dnd';
import { Clicktrack } from '../../models/clicktrack/Clicktrack';

export const onDragEnd = (
  setClicktracks: (value: React.SetStateAction<Clicktrack[]>) => void,
  result: DropResult
) => {
  setClicktracks((previousClicktracks) => {
    if (!result.destination) return previousClicktracks;

    const previousClicktracksCopy = previousClicktracks;
    const [reorderedItem] = previousClicktracksCopy.splice(
      result.source.index,
      1
    );

    if (!reorderedItem) return previousClicktracks;

    previousClicktracksCopy.splice(result.destination.index, 0, reorderedItem);
    previousClicktracksCopy.map(
      (section, index) => (section.position = index + 1)
    );

    return previousClicktracksCopy;
  });
};
