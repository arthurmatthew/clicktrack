import { ClicktrackData } from '../../models/clicktrack/ClicktrackData';
import { Metronome } from '../../models/clicktrack/Metronome';

export const sectionHasNoMetronomes = (
  sections: ClicktrackData['sections']
) => {
  if (sections.filter((section) => section instanceof Metronome).length !== 0)
    return false;

  console.error('You must have a metronome in your clicktrack.');
  return true;
};
