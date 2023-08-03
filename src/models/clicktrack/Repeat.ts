import { REPEAT_DEFAULT_INFINITE, REPEAT_DEFAULT_TIMES } from '../../config';
import { Section } from './Section';

export class Repeat extends Section {
  times: number;
  infinite: boolean;

  constructor(options?: Partial<Repeat>) {
    super({
      id: options?.id,
      type: 'repeat',
    });
    this.infinite = options?.infinite ?? REPEAT_DEFAULT_INFINITE;
    this.times = options?.times ?? REPEAT_DEFAULT_TIMES;
  }
}
