import { ClicktrackData } from '../../models/clicktrack/ClicktrackData';
import { sectionHasNoMetronomes } from './sectionHasNoMetronomes';

export const validateAddRepeat = (sections: ClicktrackData['sections']) => {
  if (sectionHasNoMetronomes(sections)) return false;

  return true;
};
