import { ClicktrackData } from '../../models/ClicktrackData';
import { Repeat } from '../../models/Repeat';
import { TNotify } from '../../types';

export const sectionMultipleRepeatForevers = (
  sections: ClicktrackData['sections'],
  notify: TNotify
) => {
  const infiniteRepeats = sections.filter(
    (section) => section instanceof Repeat && section.infinite
  );

  if (infiniteRepeats.length <= 1) return false;

  notify(
    'You have multiple infinite repeats. Only one will be used.',
    'warning'
  );
  return true;
};
