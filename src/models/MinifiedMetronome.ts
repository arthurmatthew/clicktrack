import {
  METRONOME_DEFAULT_BPM,
  METRONOME_DEFAULT_TIME_SIGNATURE,
  METRONOME_DEFAULT_LENGTH,
  METRONOME_DEFAULT_VOLUME,
  METRONOME_DEFAULT_MUTED,
} from '../config';
import { MinifiedSection } from './MinifiedSection';

export class MinifiedMetronome extends MinifiedSection {
  public b: number;
  public tS: [beats: number, value: number];
  public lIB: number;
  public v: number;
  public m: boolean;

  constructor(options?: Partial<MinifiedMetronome>) {
    super({
      t: 'm',
    });
    this.b = options?.b ?? METRONOME_DEFAULT_BPM;
    this.tS = options?.tS ?? METRONOME_DEFAULT_TIME_SIGNATURE;
    this.lIB = options?.lIB ?? METRONOME_DEFAULT_LENGTH;
    this.v = options?.v ?? METRONOME_DEFAULT_VOLUME;
    this.m = options?.m ?? METRONOME_DEFAULT_MUTED;
  }
}
