import { ClicktrackData } from '../../models/ClicktrackData';
import { sectionHasNoMetronomes } from './sectionHasNoMetronomes';

export const validateAddRepeat = (sections: ClicktrackData['sections']) => {
  if (sectionHasNoMetronomes(sections)) return false;

  return true;
};
