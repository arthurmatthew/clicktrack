import { ClicktrackData } from '../../models/ClicktrackData';
import { TNotify } from '../../types';

export const sectionOnlyOne = (
  sections: ClicktrackData['sections'],
  notify: TNotify
) => {
  if (sections.length !== 1) return false;

  notify('You must have at least one section.', 'error');
  return true;
};
