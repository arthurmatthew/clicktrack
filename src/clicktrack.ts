import { v4 as uuidv4 } from 'uuid';
import {
  CLICKTRACK_DEFAULT_MASTER_VOLUME,
  CLICKTRACK_DEFAULT_MUTED,
  CLICKTRACK_DEFAULT_NAME,
  CLICKTRACK_DEFAULT_NOTE,
  CLICKTRACK_DEFAULT_NOTE_DURATION,
  CLICKTRACK_DEFAULT_PERMANANT,
  CLICKTRACK_DEFAULT_PLAY_EXTRA_BEAT,
  CLICKTRACK_DEFAULT_POSITION,
  CLICKTRACK_DEFAULT_SECTION_TYPE,
  METRONOME_DEFAULT_BPM,
  METRONOME_DEFAULT_LENGTH,
  METRONOME_DEFAULT_TIME_SIGNATURE,
  REPEAT_DEFAULT_INFINITE,
  REPEAT_DEFAULT_TIMES,
} from './config';
import { generateUniqueName } from './utils/generateUniqueName';

export class Clicktrack {
  name: string; // Display name
  id: string; // Unique UUID
  position: number; // Position in list
  permanant: boolean; // Deletable
  opened: boolean; // Opened, in its 'show more' state in the clicktrack list
  data: ClicktrackData; // Clicktrack data, like settings and sections

  constructor(options?: Partial<Clicktrack>) {
    this.name = options?.name ?? CLICKTRACK_DEFAULT_NAME;
    this.id = options?.id ?? uuidv4();
    this.position = options?.position ?? CLICKTRACK_DEFAULT_POSITION;
    this.permanant = options?.permanant ?? CLICKTRACK_DEFAULT_PERMANANT;
    this.data = options?.data ?? new ClicktrackData({});
    this.opened = options?.opened ?? false;
  }

  static generateUniqueName(
    name: string,
    newName: string,
    clicktracks: Clicktrack[]
  ) {
    return generateUniqueName(name, newName, clicktracks);
  }
}

export class ClicktrackData {
  children: (Metronome | Repeat)[];

  note: [note: string, octave: number];

  volume: number; // % , default is 100%
  noteDuration: number;

  muted: boolean;
  playExtraBeat: boolean;

  constructor(options?: Partial<ClicktrackData>) {
    this.children = options?.children ?? [new Metronome()];
    this.note = options?.note ?? CLICKTRACK_DEFAULT_NOTE;
    this.volume = options?.volume ?? CLICKTRACK_DEFAULT_MASTER_VOLUME;
    this.muted = options?.muted ?? CLICKTRACK_DEFAULT_MUTED;
    this.noteDuration =
      options?.noteDuration ?? CLICKTRACK_DEFAULT_NOTE_DURATION;
    this.playExtraBeat =
      options?.playExtraBeat ?? CLICKTRACK_DEFAULT_PLAY_EXTRA_BEAT;
  }
}

export class Section {
  id: string;
  type: 'metronome' | 'repeat';
  constructor(options?: Partial<Section>) {
    this.id = options?.id ?? uuidv4();
    this.type = options?.type ?? CLICKTRACK_DEFAULT_SECTION_TYPE;
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
    this.bpm = options?.bpm ?? METRONOME_DEFAULT_BPM;
    this.timeSignature =
      options?.timeSignature ?? METRONOME_DEFAULT_TIME_SIGNATURE;
    this.lengthInBars = options?.lengthInBars ?? METRONOME_DEFAULT_LENGTH;
  }
  static convertTempoToTempoIndicator(bpm: number) {
    return convertTempoToTempoIndicator(bpm);
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
    this.infinite = options?.infinite ?? REPEAT_DEFAULT_INFINITE;
    this.times = options?.times ?? REPEAT_DEFAULT_TIMES;
  }
}
