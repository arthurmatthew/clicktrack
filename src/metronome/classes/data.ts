import { Metronome } from './metronome';

export default class Data {
  children: Metronome[];

  // Frequency Related
  note: [note: string, octave: number];

  // Playback Related
  volume: number; // %
  noteDuration: number;

  constructor(options?: Partial<Data>) {
    this.children = options?.children || [new Metronome()];
    this.note = options?.note || ['C', 5];
    this.volume = options?.volume || 100;
    this.noteDuration = options?.noteDuration || 1;
  }
}
