import { DropResult } from 'react-beautiful-dnd';
import Metronome from '../../../metronome/classes/clicktrack';

const onDragEnd = (result: DropResult, sections: Metronome[]) => {
  if (!result.destination) return sections;

  const sectionsCopy = sections;
  const [reorderedItem] = sectionsCopy.splice(result.source.index, 1);

  sectionsCopy.splice(result.destination.index, 0, reorderedItem);
  sectionsCopy.map((section, i) => (section.position = i + 1));

  return sectionsCopy;
};

export default onDragEnd;
