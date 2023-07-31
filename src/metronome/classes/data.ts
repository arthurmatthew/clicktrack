import { Metronome, Repeat } from './section';

export class Data {
  children: (Metronome | Repeat)[];

  // Frequency Related
  note: [note: string, octave: number];

  // Playback Related
  volume: number; // % , default is 100%
  muted: boolean;
  noteDuration: number;

  playExtraBeat: boolean;

  constructor(options?: Partial<Data>) {
    this.children = options?.children || [new Metronome()];
    this.note = options?.note || ['C', 5];
    this.volume = options?.volume || 100;
    this.muted = options?.muted ?? false;
    this.noteDuration = options?.noteDuration || 1;
    this.playExtraBeat = options?.playExtraBeat ?? true;
  }
}
