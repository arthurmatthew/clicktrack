import { ClicktrackData } from '../../models/ClicktrackData';
import { TNotify } from '../../types';
import { sectionAdjacentRepeats } from './sectionAdjacentRepeats';
import { sectionEmpty } from './sectionEmpty';
import { sectionHasNoMetronomes } from './sectionHasNoMetronomes';
import { sectionMetronomesAfterRepeatForever } from './sectionMetronomesAfterRepeatForever';
import { sectionMultipleRepeatForevers } from './sectionMultipleRepeatForevers';
import { sectionStartsWithRepeat } from './sectionStartsWithRepeat';

export const validatePlay = (
  sections: ClicktrackData['sections'],
  notify: TNotify
) => {
  // Warnings
  sectionMetronomesAfterRepeatForever(sections, notify);
  sectionMultipleRepeatForevers(sections, notify);

  // Errors
  if (sectionEmpty(sections, notify)) return false;
  if (sectionHasNoMetronomes(sections, notify)) return false;
  if (sectionStartsWithRepeat(sections, notify)) return false;
  if (sectionAdjacentRepeats(sections, notify)) return false;

  return true;
};
