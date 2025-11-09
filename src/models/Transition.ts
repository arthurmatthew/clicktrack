import { TRANSITION_DEFAULT_CURVE, TRANSITION_DEFAULT_LENGTH } from '../config';
import { TCurveTypes } from '../types';
import { Metronome } from './Metronome';
import { Section } from './Section';

export class Transition extends Section {
  public fromMetronome: Metronome | undefined;
  public toMetronome: Metronome | undefined;
  public lengthInBars: number;
  public inheritTimeSignature: 'next' | 'previous';
  public inheritAccentMap: 'next' | 'previous';
  public curveType: TCurveTypes;

  constructor(options?: Partial<Transition>) {
    super({
      id: options?.id,
      type: 'transition',
    });
    this.fromMetronome = options?.fromMetronome ?? undefined;
    this.toMetronome = options?.toMetronome ?? undefined;
    this.lengthInBars = options?.lengthInBars ?? TRANSITION_DEFAULT_LENGTH;
    this.inheritTimeSignature = options?.inheritTimeSignature ?? 'previous';
    this.inheritAccentMap = options?.inheritAccentMap ?? 'previous';
    this.curveType = options?.curveType ?? TRANSITION_DEFAULT_CURVE;
  }

  get timeSignature() {
    if (this.inheritTimeSignature === 'previous')
      return this.fromMetronome?.timeSignature;
    if (this.inheritTimeSignature === 'next')
      return this.toMetronome?.timeSignature;
  }

  get accentMap() {
    if (this.inheritAccentMap === 'previous')
      return this.fromMetronome?.accentMap;
    if (this.inheritAccentMap === 'next') return this.toMetronome?.accentMap;
  }
}
