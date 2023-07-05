export default class Metronome {
  name: string;
  id: string;
  position: number;
  permanant: boolean;
  data: Data;
  opened: boolean;
  constructor(options?: Partial<Metronome>) {
    this.name = options?.name || 'Default Metronome';
    this.id = options?.id || 'default';
    this.position = options?.position || -1;
    this.permanant = options?.permanant || false;
    this.data = options?.data || new Data({});
    this.opened = options?.opened || false;
  }
}

export class Data {
  // Time Related
  bpm: number;

  // Frequency Related
  note: [note: string, octave: number];

  // Playback Related
  volume: number; // %
  noteDuration: number;
  constructor(options?: Partial<Data>) {
    this.bpm = options?.bpm || 120;
    this.note = options?.note || ['C', 5];
    this.volume = options?.volume || 100;
    this.noteDuration = options?.noteDuration || 1;
  }
}
