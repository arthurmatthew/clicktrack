import { CLICKTRACK_DEFAULT_NAME } from '../../config';
import { MinifiedClicktrackData } from '.././minified/MinifiedClicktrackData';
import { v4 as uuidv4 } from 'uuid';

export class MinifiedClicktrack {
  public n: string; // Display name
  public id: string;
  public d: MinifiedClicktrackData; // Clicktrack data, like settings and sections

  constructor(options?: Partial<MinifiedClicktrack>) {
    this.n = options?.n ?? CLICKTRACK_DEFAULT_NAME;
    this.id = options?.id ?? uuidv4();
    this.d = options?.d ?? new MinifiedClicktrackData({});
  }
}
