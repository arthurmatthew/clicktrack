import { DropResult } from 'react-beautiful-dnd';
import { Clicktrack } from '../../../metronome/classes/clicktrack';

export const onDragEnd = (result: DropResult, sections: Clicktrack[]) => {
  if (!result.destination) return sections;

  const sectionsCopy = sections;
  const [reorderedItem] = sectionsCopy.splice(result.source.index, 1);

  sectionsCopy.splice(result.destination.index, 0, reorderedItem);
  sectionsCopy.map((section, i) => (section.position = i + 1));

  return sectionsCopy;
};
