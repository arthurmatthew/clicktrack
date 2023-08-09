import {
  CLICKTRACK_DEFAULT_NAME,
  CLICKTRACK_DEFAULT_POSITION,
  CLICKTRACK_DEFAULT_PERMANANT,
} from '../config';
import { ClicktrackData } from './ClicktrackData';
import { v4 as uuidv4 } from 'uuid';
import { Metronome } from './Metronome';
import { Repeat } from './Repeat';

export class Clicktrack {
  public name: string; // Display name
  public readonly id: string; // Unique UUID
  public position: number; // Position in list
  public permanant: boolean; // Deletable
  public opened: boolean; // Opened, in its 'show more' state in the clicktrack list
  public data: ClicktrackData; // Clicktrack data, like settings and sections

  constructor(options?: Partial<Clicktrack>) {
    this.name = options?.name ?? CLICKTRACK_DEFAULT_NAME;
    this.id = options?.id ?? uuidv4();
    this.position = options?.position ?? CLICKTRACK_DEFAULT_POSITION;
    this.permanant = options?.permanant ?? CLICKTRACK_DEFAULT_PERMANANT;
    this.data = options?.data ?? new ClicktrackData({});
    this.opened = options?.opened ?? false;
  }

  public static parseInternals(clicktrack: Clicktrack) {
    return new Clicktrack({
      ...clicktrack,
      data: new ClicktrackData({
        ...clicktrack.data,
        sections: clicktrack.data.sections.map((section) => {
          switch (section.type) {
            case 'metronome':
              return new Metronome(section);
            case 'repeat':
              return new Repeat(section);
          }
        }),
      }),
    });
  }
}
