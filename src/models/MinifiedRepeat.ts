import { REPEAT_DEFAULT_INFINITE, REPEAT_DEFAULT_TIMES } from '../config';
import { MinifiedSection } from './MinifiedSection';

export class MinifiedRepeat extends MinifiedSection {
  public ti: number;
  public i: boolean;

  constructor(options?: Partial<MinifiedRepeat>) {
    super({
      t: 'r',
    });
    this.i = options?.i ?? REPEAT_DEFAULT_INFINITE;
    this.ti = options?.ti ?? REPEAT_DEFAULT_TIMES;
  }
}
