import { ClicktrackData } from '../../models/ClicktrackData';
import { TNotify } from '../../types';

export const sectionEmpty = (
  sections: ClicktrackData['sections'],
  notify: TNotify
) => {
  if (sections.length !== 0) return false;

  notify(
    'You must have a section in your clicktrack. How did you even get in this position?',
    'error'
  );
  return true;
};
