import { DropResult } from 'react-beautiful-dnd';
import { Clicktrack } from '../../models/Clicktrack';

export const onDragEnd = (
  setClicktracks: (value: React.SetStateAction<Clicktrack[]>) => void,
  result: DropResult
) => {
  if (!result.destination) return;
  const { source, destination } = result;
  setClicktracks((previousClicktracks) => {
    const result = [...previousClicktracks];
    const [removed] = result.splice(source.index, 1);
    if (removed) result.splice(destination.index, 0, removed);
    return result;
  });
};
