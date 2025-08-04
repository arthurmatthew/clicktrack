import {
  METRONOME_DEFAULT_BPM,
  METRONOME_DEFAULT_LENGTH,
  METRONOME_DEFAULT_MUTED,
  METRONOME_DEFAULT_TIME_SIGNATURE,
  METRONOME_DEFAULT_VOLUME,
} from '../config';
import { TAccentMap } from '../types';
import { convertTempoToTempoIndicator } from '../utils/convertTempoToTempoIndicator';
import { generateAccentMap } from '../utils/generateAccentMap';
import { Section } from './Section';

export class Metronome extends Section {
  public bpm: number;
  public timeSignature: [beats: number, value: number];
  public lengthInBars: number;
  public accentMap: TAccentMap;

  public volume: number;
  public muted: boolean;

  constructor(options?: Partial<Metronome>) {
    super({
      id: options?.id,
      type: 'metronome',
    });
    this.bpm = options?.bpm ?? METRONOME_DEFAULT_BPM;
    this.timeSignature =
      options?.timeSignature ?? METRONOME_DEFAULT_TIME_SIGNATURE;
    this.lengthInBars = options?.lengthInBars ?? METRONOME_DEFAULT_LENGTH;
    this.accentMap =
      options?.accentMap ??
      generateAccentMap(this.timeSignature[0], this.timeSignature[1]);

    this.volume = options?.volume ?? METRONOME_DEFAULT_VOLUME;
    this.muted = options?.muted ?? METRONOME_DEFAULT_MUTED;
  }

  public static bpmToIndicator(bpm: number) {
    return convertTempoToTempoIndicator(bpm);
  }
}
