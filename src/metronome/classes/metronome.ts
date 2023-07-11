import { v4 as uuidv4 } from 'uuid';

class Section {
  id: string;
  constructor(options?: Partial<Section>) {
    this.id = options?.id || uuidv4();
  }
}

export class Metronome extends Section {
  bpm: number;
  timeSignature: [beats: number, value: number];
  lengthInBars: number;

  constructor(options?: Partial<Metronome>) {
    super();
    this.bpm = options?.bpm || 120;
    this.timeSignature = options?.timeSignature || [4, 4];
    this.lengthInBars = options?.lengthInBars || 2;
  }
}
