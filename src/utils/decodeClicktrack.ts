import { Clicktrack } from '../models/Clicktrack';
import { ClicktrackData } from '../models/ClicktrackData';
import { Metronome } from '../models/Metronome';
import { MinifiedClicktrack } from '../models/MinifiedClicktrack';
import { MinifiedMetronome } from '../models/MinifiedMetronome';
import { MinifiedRepeat } from '../models/MinifiedRepeat';
import { Repeat } from '../models/Repeat';

export const decodeClicktrack = (code: string) => {
  try {
    const minifiedClicktrack = JSON.parse(atob(code)) as MinifiedClicktrack;
    const minifiedClicktrackData = minifiedClicktrack.d;
    const minifiedSections = minifiedClicktrackData.s.map((section) => {
      if (section.t === 'm') {
        const mSection = section as MinifiedMetronome;
        return new Metronome({
          bpm: mSection.b,
          lengthInBars: mSection.lIB,
          muted: mSection.m,
          timeSignature: mSection.tS,
          volume: mSection.v,
          type: 'metronome',
        });
      }
      if (section.t === 'r') {
        const rSection = section as MinifiedRepeat;
        return new Repeat({
          infinite: rSection.i,
          times: rSection.ti,
          type: 'repeat',
        });
      }
    }) as (Metronome | Repeat)[];

    const clicktrack = new Clicktrack({
      name: minifiedClicktrack.n,
      id: minifiedClicktrack.id,
      data: new ClicktrackData({
        fadeOutSound: minifiedClicktrackData.fOS,
        muted: minifiedClicktrackData.m,
        note: minifiedClicktrackData.n,
        noteDuration: minifiedClicktrackData.nD,
        playExtraBeat: minifiedClicktrackData.pEB,
        sections: minifiedSections,
        volume: minifiedClicktrackData.v,
      }),
    });

    return clicktrack;
  } catch (error) {
    console.error(error);
    return new Clicktrack();
  }
};
