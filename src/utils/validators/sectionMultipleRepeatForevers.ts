import { ClicktrackData } from '../../models/ClicktrackData';
import { Repeat } from '../../models/Repeat';

export const sectionMultipleRepeatForevers = (
  sections: ClicktrackData['sections']
) => {
  const infiniteRepeats = sections.filter(
    (section) => section instanceof Repeat && section.infinite === true
  );

  if (infiniteRepeats === undefined) return false;
  if (infiniteRepeats.length <= 1) return false;

  console.warn('You have multiple infinite repeats. Only one will be used.');
  return true;
};
