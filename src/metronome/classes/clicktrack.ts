import Data from './data';

export default class Clicktrack {
  name: string;
  id: string;
  position: number;
  permanant: boolean;
  data: Data;
  opened: boolean;
  constructor(options?: Partial<Clicktrack>) {
    this.name = options?.name || 'Default Metronome';
    this.id = options?.id || 'default';
    this.position = options?.position || -1;
    this.permanant = options?.permanant || false;
    this.data = options?.data || new Data({});
    this.opened = options?.opened || false;
  }
}
