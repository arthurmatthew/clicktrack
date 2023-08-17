import { ClicktrackData } from '../../models/ClicktrackData';
import { Metronome } from '../../models/Metronome';
import { Repeat } from '../../models/Repeat';
import { TNotify } from '../../types';

export const sectionAdjacentRepeats = (
  sections: ClicktrackData['sections'],
  notify: TNotify
) => {
  let adjacentRepeats = 0;

  sections.forEach((section, index) => {
    const previousSection = sections[index - 1];
    const nextSection = sections[index + 1];

    if (section instanceof Metronome) return;
    if (section instanceof Repeat && previousSection instanceof Repeat)
      adjacentRepeats++;
    if (section instanceof Repeat && nextSection instanceof Repeat)
      adjacentRepeats++;
  });

  if (adjacentRepeats === 0) return false;

  notify('You cannot have adjacent repeats.', 'error');
  return true;
};
