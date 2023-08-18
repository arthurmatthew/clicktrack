import { Clicktrack } from '../models/Clicktrack';
import { Metronome } from '../models/Metronome';
import { MinifiedClicktrack } from '../models/MinifiedClicktrack';
import { MinifiedClicktrackData } from '../models/MinifiedClicktrackData';
import { MinifiedMetronome } from '../models/MinifiedMetronome';
import { MinifiedRepeat } from '../models/MinifiedRepeat';
import { Repeat } from '../models/Repeat';

export const minifyAndEncodeClicktrack = (clicktrack: Clicktrack) => {
  const clicktrackData = clicktrack.data;
  const sections = clicktrack.data.sections
    .map((section) => {
      if (section instanceof Metronome)
        return new MinifiedMetronome({
          b: section.bpm,
          lIB: section.lengthInBars,
          m: section.muted,
          tS: section.timeSignature,
          v: section.volume,
          t: 'm',
        });
      if (section instanceof Repeat)
        return new MinifiedRepeat({
          i: section.infinite,
          ti: section.times,
          t: 'r',
        });
    })
    .filter((section) => section !== undefined) as (
    | MinifiedMetronome
    | MinifiedRepeat
  )[];

  const minifiedClicktrack = new MinifiedClicktrack({
    n: clicktrack.name,
    d: new MinifiedClicktrackData({
      s: sections,
      fOS: clicktrackData.fadeOutSound,
      m: clicktrackData.muted,
      n: clicktrackData.note,
      nD: clicktrackData.noteDuration,
      pEB: clicktrackData.playExtraBeat,
      v: clicktrackData.volume,
    }),
  });

  return btoa(JSON.stringify(minifiedClicktrack));
};
