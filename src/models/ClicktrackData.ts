import {
  CLICKTRACK_DEFAULT_NOTE,
  CLICKTRACK_DEFAULT_MASTER_VOLUME,
  CLICKTRACK_DEFAULT_MUTED,
  CLICKTRACK_DEFAULT_NOTE_DURATION,
  CLICKTRACK_DEFAULT_PLAY_EXTRA_BEAT,
  CLICKTRACK_DEFAULT_FADE_OUT,
} from '../config';
import { Metronome } from './Metronome';
import { Repeat } from './Repeat';

export class ClicktrackData {
  public sections: (Metronome | Repeat)[];
  public note: [note: string, octave: number];
  public volume: number; // % , default is 100%
  public noteDuration: number;
  public muted: boolean;
  public playExtraBeat: boolean;
  public fadeOutSound: boolean;
  public showSaveIndicator: boolean;
  public animateSaveIndicator: boolean;
  public flashPlayButton: boolean;

  constructor(options?: Partial<ClicktrackData>) {
    this.sections = options?.sections ?? [new Metronome(), new Repeat()];
    this.note = options?.note ?? CLICKTRACK_DEFAULT_NOTE;
    this.volume = options?.volume ?? CLICKTRACK_DEFAULT_MASTER_VOLUME;
    this.muted = options?.muted ?? CLICKTRACK_DEFAULT_MUTED;
    this.noteDuration =
      options?.noteDuration ?? CLICKTRACK_DEFAULT_NOTE_DURATION;
    this.playExtraBeat =
      options?.playExtraBeat ?? CLICKTRACK_DEFAULT_PLAY_EXTRA_BEAT;
    this.fadeOutSound = options?.fadeOutSound ?? CLICKTRACK_DEFAULT_FADE_OUT;
    this.showSaveIndicator = options?.showSaveIndicator ?? true;
    this.animateSaveIndicator = options?.animateSaveIndicator ?? true;
    this.flashPlayButton = options?.flashPlayButton ?? true;
  }
}
