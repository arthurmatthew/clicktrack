import { CLICKTRACK_DEFAULT_NAME } from '../config';
import { MinifiedClicktrackData } from './MinifiedClicktrackData';

export class MinifiedClicktrack {
  public n: string; // Display name
  public d: MinifiedClicktrackData; // Clicktrack data, like settings and sections

  constructor(options?: Partial<MinifiedClicktrack>) {
    this.n = options?.n ?? CLICKTRACK_DEFAULT_NAME;
    this.d = options?.d ?? new MinifiedClicktrackData({});
  }
}
