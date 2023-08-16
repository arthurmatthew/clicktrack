import { ClicktrackData } from '../../models/ClicktrackData';
import { sectionEmpty } from './sectionEmpty';
import { sectionHasNoMetronomes } from './sectionHasNoMetronomes';
import { sectionMetronomesAfterRepeatForever } from './sectionMetronomesAfterRepeatForever';
import { sectionMultipleRepeatForevers } from './sectionMultipleRepeatForevers';
import { sectionStartsWithRepeat } from './sectionStartsWithRepeat';

export const validatePlay = (sections: ClicktrackData['sections']) => {
  // Warnings
  sectionMetronomesAfterRepeatForever(sections);
  sectionMultipleRepeatForevers(sections);

  // Errors
  if (sectionEmpty(sections)) return false;
  if (sectionHasNoMetronomes(sections)) return false;
  if (sectionStartsWithRepeat(sections)) return false;

  return true;
};
