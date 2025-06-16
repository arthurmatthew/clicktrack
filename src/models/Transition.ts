import {
  TRANSITION_DEFAULT_CURVE,
  TRANSITION_DEFAULT_FROMBPM,
  TRANSITION_DEFAULT_LENGTH,
  TRANSITION_DEFAULT_TOBPM,
} from '../config';
import { Section } from './Section';

export class Transition extends Section {
  public fromBpm: number;
  public toBpm: number;
  public lengthInBars: number;
  public curveType: 'linear' | 'ease-in' | 'ease-out' | 'custom';

  constructor(options?: Partial<Transition>) {
    super({
      id: options?.id,
      type: 'repeat',
    });
    this.fromBpm = options?.fromBpm ?? TRANSITION_DEFAULT_FROMBPM;
    this.toBpm = options?.toBpm ?? TRANSITION_DEFAULT_TOBPM;
    this.lengthInBars = options?.lengthInBars ?? TRANSITION_DEFAULT_LENGTH;
    this.curveType = options?.curveType ?? TRANSITION_DEFAULT_CURVE;
  }
}
