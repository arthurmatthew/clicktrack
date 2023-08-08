import { ClicktrackData } from '../../models/clicktrack/ClicktrackData';
import { sectionOnlyOne } from './sectionOnlyOne';

export const validateDeleteSection = (sections: ClicktrackData['sections']) => {
  // Errors
  if (sectionOnlyOne(sections)) return false;

  return true;
};
