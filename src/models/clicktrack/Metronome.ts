import {
  METRONOME_DEFAULT_BPM,
  METRONOME_DEFAULT_LENGTH,
  METRONOME_DEFAULT_TIME_SIGNATURE,
} from '../../config';
import { Section } from './Section';

export class Metronome extends Section {
  public bpm: number;
  public timeSignature: [beats: number, value: number];
  public lengthInBars: number;

  constructor(options?: Partial<Metronome>) {
    super({
      id: options?.id,
      type: 'metronome',
    });
    this.bpm = options?.bpm ?? METRONOME_DEFAULT_BPM;
    this.timeSignature =
      options?.timeSignature ?? METRONOME_DEFAULT_TIME_SIGNATURE;
    this.lengthInBars = options?.lengthInBars ?? METRONOME_DEFAULT_LENGTH;
  }

  public static convertTempoToTempoIndicator(bpm: number) {
    return convertTempoToTempoIndicator(bpm);
  }
}
