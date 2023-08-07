import { ClicktrackData } from '../../models/clicktrack/ClicktrackData';
import { Repeat } from '../../models/clicktrack/Repeat';

export const sectionStartsWithRepeat = (
  sections: ClicktrackData['sections']
) => {
  if (!(sections[0] instanceof Repeat)) return false;

  console.error('The first section in your clicktrack cannot be a repeat.');
  return true;
};
