import { v4 as uuidv4 } from 'uuid';
import { CLICKTRACK_MAX_UNSUCCESSFUL_CHECKS } from './config';

export class Clicktrack {
  name: string; // Display name
  id: string; // Unique UUID
  position: number; // Position in list
  permanant: boolean; // Deletable
  opened: boolean; // Opened, in its 'show more' state in the clicktrack list
  data: ClicktrackData; // Clicktrack data, like settings and sections

  constructor(options?: Partial<Clicktrack>) {
    this.name = options?.name || 'Default Clicktrack';
    this.id = options?.id || uuidv4();
    this.position = options?.position || -1;
    this.permanant = options?.permanant ?? false;
    this.data = options?.data || new ClicktrackData({});
    this.opened = options?.opened ?? false;
  }

  static generateUniqueName(name: string, newName: string, prev: Clicktrack[]) {
    let unsuccessfulChecks = 0;
    let uniqueName = newName;

    while (unsuccessfulChecks < CLICKTRACK_MAX_UNSUCCESSFUL_CHECKS) {
      const clicktracksWithSharedName = [
        ...prev.filter((metronome) => metronome.name !== name),
        {
          ...prev.filter((metronome) => metronome.name === name)[0],
          name: uniqueName,
        },
      ].filter((metronome) => metronome.name === uniqueName);

      if (clicktracksWithSharedName.length <= 1) {
        uniqueName =
          unsuccessfulChecks === 0
            ? newName // Don't add a suffix to the name if it's already unique
            : `${newName} (#${unsuccessfulChecks})`;
        break;
      }
      unsuccessfulChecks++;
      uniqueName = `${newName} (#${unsuccessfulChecks})`;
    }

    return uniqueName;
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
    this.children = options?.children || [new Metronome()];
    this.note = options?.note || ['C', 5];
    this.volume = options?.volume || 100;
    this.muted = options?.muted ?? false;
    this.noteDuration = options?.noteDuration || 1;
    this.playExtraBeat = options?.playExtraBeat ?? true;
  }
}

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
  static convertTempoToTempoIndicator(bpm: number) {
    if (bpm > 178) {
      return 'Prestissimo';
    } else if (bpm > 168) {
      return 'Presto';
    } else if (bpm > 132) {
      return 'Vivace';
    } else if (bpm > 109) {
      return 'Allegro';
    } else if (bpm > 98) {
      return 'Allegretto';
    } else if (bpm > 86) {
      return 'Moderato';
    } else if (bpm > 73) {
      return 'Andante';
    } else if (bpm > 65) {
      return 'Adagietto';
    } else if (bpm > 55) {
      return 'Adagio';
    } else if (bpm > 45) {
      return 'Largo';
    } else if (bpm > 40) {
      return 'Lento';
    } else if (bpm > 20) {
      return 'Grave';
    } else {
      return 'Grave';
    }
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
