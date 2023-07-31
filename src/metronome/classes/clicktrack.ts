import { Data } from './data';
import { v4 as uuidv4 } from 'uuid';

export class Clicktrack {
  name: string;
  id: string;
  position: number;
  permanant: boolean;
  data: Data;
  opened: boolean;
  constructor(options?: Partial<Clicktrack>) {
    this.name = options?.name || 'Default Metronome';
    this.id = options?.id || uuidv4();
    this.position = options?.position || -1;
    this.permanant = options?.permanant || false;
    this.data = options?.data || new Data({});
    this.opened = options?.opened || false;
  }
}
