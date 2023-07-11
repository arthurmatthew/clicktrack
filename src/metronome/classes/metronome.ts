import { v4 as uuidv4 } from 'uuid';

export default class Metronome {
  bpm: number;
  timeSignature: [beats: number, value: number];
  lengthInBars: number;
  id: string;

  constructor(options?: Partial<Metronome>) {
    this.bpm = options?.bpm || 120;
    this.timeSignature = options?.timeSignature || [4, 4];
    this.lengthInBars = options?.lengthInBars || 2;
    this.id = uuidv4();
  }
}
