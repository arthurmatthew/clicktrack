import { ClicktrackData } from '../../models/clicktrack/ClicktrackData';
import { sectionEmpty } from './sectionEmpty';
import { sectionHasNoMetronomes } from './sectionHasNoMetronomes';
import { sectionMetronomesAfterRepeatForever } from './sectionMetronomesAfterRepeatForever';
import { sectionStartsWithRepeat } from './sectionStartsWithRepeat';

export const validatePlay = (sections: ClicktrackData['sections']) => {
  // Warnings
  sectionMetronomesAfterRepeatForever(sections);

  // Errors
  if (sectionEmpty(sections)) return false;
  if (sectionHasNoMetronomes(sections)) return false;
  if (sectionStartsWithRepeat(sections)) return false;

  return true;
};
