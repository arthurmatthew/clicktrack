import { ClicktrackData } from '../../models/clicktrack/ClicktrackData';
import { Metronome } from '../../models/clicktrack/Metronome';
import { Repeat } from '../../models/clicktrack/Repeat';

export const sectionMetronomesAfterRepeatForever = (
  sections: ClicktrackData['sections']
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

  console.warn(
    'You have metronome sections after an infinite repeat. These sections will never play.'
  );
  return true;
};
