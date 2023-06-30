import { DropResult } from 'react-beautiful-dnd';
import { Section } from '../../../types/app/metronomes/Section';

const onDragEnd = (result: DropResult, sections: Section[]) => {
  if (!result.destination) return sections;

  const sectionsCopy = sections;
  const [reorderedItem] = sectionsCopy.splice(result.source.index, 1);

  sectionsCopy.splice(result.destination.index, 0, reorderedItem);
  sectionsCopy.map((section, i) => (section.position = i + 1));

  return sectionsCopy;
};

export default onDragEnd;
