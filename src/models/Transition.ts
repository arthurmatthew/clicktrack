import {
  METRONOME_DEFAULT_TIME_SIGNATURE,
  TRANSITION_DEFAULT_CURVE,
  TRANSITION_DEFAULT_LENGTH,
} from '../config';
import { TCurveTypes } from '../types';
import { Metronome } from './Metronome';
import { Section } from './Section';

export class Transition extends Section {
  public fromMetronome: Metronome | undefined;
  public toMetronome: Metronome | undefined;
  public lengthInBars: number;
  public timeSignature: [beats: number, value: number];
  public curveType: TCurveTypes;

  constructor(options?: Partial<Transition>) {
    super({
      id: options?.id,
      type: 'transition',
    });
    this.fromMetronome = options?.fromMetronome ?? undefined;
    this.toMetronome = options?.toMetronome ?? undefined;
    this.lengthInBars = options?.lengthInBars ?? TRANSITION_DEFAULT_LENGTH;
    this.timeSignature =
      options?.timeSignature ?? METRONOME_DEFAULT_TIME_SIGNATURE;
    this.curveType = options?.curveType ?? TRANSITION_DEFAULT_CURVE;
  }
}
