import { ClicktrackData } from '../../models/ClicktrackData';
import { Metronome } from '../../models/Metronome';
import { TNotify } from '../../types';

export const sectionHasNoMetronomes = (
  sections: ClicktrackData['sections'],
  notify: TNotify
) => {
  if (sections.filter((section) => section instanceof Metronome).length !== 0)
    return false;

  notify('You must have a metronome in your clicktrack.', 'error');
  return true;
};
