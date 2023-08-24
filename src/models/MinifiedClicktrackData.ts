import {
  CLICKTRACK_DEFAULT_NOTE,
  CLICKTRACK_DEFAULT_MASTER_VOLUME,
  CLICKTRACK_DEFAULT_MUTED,
  CLICKTRACK_DEFAULT_NOTE_DURATION,
  CLICKTRACK_DEFAULT_PLAY_EXTRA_BEAT,
  CLICKTRACK_DEFAULT_FADE_OUT,
} from '../config';
import { MinifiedMetronome } from './MinifiedMetronome';
import { MinifiedRepeat } from './MinifiedRepeat';

export class MinifiedClicktrackData {
  public s: (MinifiedMetronome | MinifiedRepeat)[];
  public n: [note: string, octave: number];
  public v: number;
  public nD: number;
  public m: boolean;
  public pEB: boolean;
  public fOS: boolean;
  public sSI: boolean;
  public aSI: boolean;
  public fPB: boolean

  constructor(options?: Partial<MinifiedClicktrackData>) {
    this.s = options?.s ?? [new MinifiedMetronome(), new MinifiedRepeat()];
    this.n = options?.n ?? CLICKTRACK_DEFAULT_NOTE;
    this.v = options?.v ?? CLICKTRACK_DEFAULT_MASTER_VOLUME;
    this.m = options?.m ?? CLICKTRACK_DEFAULT_MUTED;
    this.nD = options?.nD ?? CLICKTRACK_DEFAULT_NOTE_DURATION;
    this.pEB = options?.pEB ?? CLICKTRACK_DEFAULT_PLAY_EXTRA_BEAT;
    this.fOS = options?.fOS ?? CLICKTRACK_DEFAULT_FADE_OUT;
    this.sSI = options?.sSI ?? true;
    this.aSI = options?.aSI ?? true;
    this.fPB = options?.fPB ?? true
  }
}
