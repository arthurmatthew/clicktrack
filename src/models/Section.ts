import { CLICKTRACK_DEFAULT_SECTION_TYPE } from '../config';
import { v4 as uuidv4 } from 'uuid';

export class Section {
  public readonly id: string;
  public readonly type: 'metronome' | 'repeat';
  constructor(options?: Partial<Section>) {
    this.id = options?.id ?? uuidv4();
    this.type = options?.type ?? CLICKTRACK_DEFAULT_SECTION_TYPE;
  }
}
