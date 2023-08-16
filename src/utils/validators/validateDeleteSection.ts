import { ClicktrackData } from '../../models/ClicktrackData';
import { TNotify } from '../../types';
import { sectionOnlyOne } from './sectionOnlyOne';

export const validateDeleteSection = (
  sections: ClicktrackData['sections'],
  notify: TNotify
) => {
  // Errors
  if (sectionOnlyOne(sections, notify)) return false;

  return true;
};
