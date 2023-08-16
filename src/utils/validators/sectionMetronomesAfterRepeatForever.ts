import { ClicktrackData } from '../../models/ClicktrackData';
import { Metronome } from '../../models/Metronome';
import { Repeat } from '../../models/Repeat';
import { TNotify } from '../../types';

export const sectionMetronomesAfterRepeatForever = (
  sections: ClicktrackData['sections'],
  notify: TNotify
) => {
  const firstInfiniteRepeat = sections.find(
    (section) => section instanceof Repeat && section.infinite === true
  );
  const indexOfFirstInfiniteRepeat = firstInfiniteRepeat
    ? sections.indexOf(firstInfiniteRepeat)
    : undefined;
  const metronomesAfterInfiniteRepeat = sections
    .slice(indexOfFirstInfiniteRepeat)
    .filter((section) => section instanceof Metronome);

  if (firstInfiniteRepeat === undefined) return false;
  if (indexOfFirstInfiniteRepeat === undefined) return false;
  if (metronomesAfterInfiniteRepeat.length === 0) return false;

  notify(
    'You have metronome sections after an infinite repeat. These sections will never play.',
    'warning'
  );
  return true;
};
