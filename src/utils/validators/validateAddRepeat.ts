import { ClicktrackData } from '../../models/ClicktrackData';
import { TNotify } from '../../types';
import { sectionHasNoMetronomes } from './sectionHasNoMetronomes';

export const validateAddRepeat = (
  sections: ClicktrackData['sections'],
  notify: TNotify
) => {
  if (sectionHasNoMetronomes(sections, notify)) return false;

  return true;
};
