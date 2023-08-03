import {
  CLICKTRACK_DEFAULT_NOTE,
  CLICKTRACK_DEFAULT_MASTER_VOLUME,
  CLICKTRACK_DEFAULT_MUTED,
  CLICKTRACK_DEFAULT_NOTE_DURATION,
  CLICKTRACK_DEFAULT_PLAY_EXTRA_BEAT,
} from '../../config';
import { Metronome } from './Metronome';
import { Repeat } from './Repeat';

export class ClicktrackData {
  children: (Metronome | Repeat)[];

  note: [note: string, octave: number];

  volume: number; // % , default is 100%
  noteDuration: number;

  muted: boolean;
  playExtraBeat: boolean;

  constructor(options?: Partial<ClicktrackData>) {
    this.children = options?.children ?? [new Metronome()];
    this.note = options?.note ?? CLICKTRACK_DEFAULT_NOTE;
    this.volume = options?.volume ?? CLICKTRACK_DEFAULT_MASTER_VOLUME;
    this.muted = options?.muted ?? CLICKTRACK_DEFAULT_MUTED;
    this.noteDuration =
      options?.noteDuration ?? CLICKTRACK_DEFAULT_NOTE_DURATION;
    this.playExtraBeat =
      options?.playExtraBeat ?? CLICKTRACK_DEFAULT_PLAY_EXTRA_BEAT;
  }
}
