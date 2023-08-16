import { ClicktrackData } from '../../models/ClicktrackData';
import { Repeat } from '../../models/Repeat';
import { TNotify } from '../../types';

export const sectionStartsWithRepeat = (
  sections: ClicktrackData['sections'],
  notify: TNotify
) => {
  if (!(sections[0] instanceof Repeat)) return false;

  notify('The first section in your clicktrack cannot be a repeat.', 'warning');
  return true;
};
