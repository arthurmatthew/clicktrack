import { v4 as uuidv4 } from 'uuid';

export class Section {
  id: string;
  type: 'metronome' | 'repeat';
  constructor(options?: Partial<Section>) {
    this.id = options?.id || uuidv4();
    this.type = options?.type || 'metronome';
  }
}

export class Metronome extends Section {
  bpm: number;
  timeSignature: [beats: number, value: number];
  lengthInBars: number;

  constructor(options?: Partial<Metronome>) {
    super({
      id: options?.id,
      type: 'metronome',
    });
    this.bpm = options?.bpm || 120;
    this.timeSignature = options?.timeSignature || [4, 4];
    this.lengthInBars = options?.lengthInBars || 2;
  }
}

export class Repeat extends Section {
  times: number;
  infinite: boolean;

  constructor(options?: Partial<Repeat>) {
    super({
      id: options?.id,
      type: 'repeat',
    });
    this.infinite = options?.infinite ?? true;
    this.times = options?.times || 1;
  }
}
