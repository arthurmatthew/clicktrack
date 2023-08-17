import {
  CLICKTRACK_DEFAULT_NAME,
  CLICKTRACK_DEFAULT_PERMANANT,
} from '../config';
import { ClicktrackData } from './ClicktrackData';
import { v4 as uuidv4 } from 'uuid';
import { Metronome } from './Metronome';
import { Repeat } from './Repeat';
import { getClicktrackFromLocalStorageByID } from '../utils/getClicktrackFromLocalStorageByID';

export class Clicktrack {
  public name: string; // Display name
  public readonly id: string; // Unique UUID
  public permanant: boolean; // Deletable
  public opened: boolean; // Opened, in its 'show more' state in the clicktrack list
  public data: ClicktrackData; // Clicktrack data, like settings and sections

  constructor(options?: Partial<Clicktrack>) {
    this.name = options?.name ?? CLICKTRACK_DEFAULT_NAME;
    this.id = options?.id ?? uuidv4();
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

  public static localFromID(id: string | undefined) {
    return getClicktrackFromLocalStorageByID(id);
  }

  public static encode(clicktrack: Clicktrack) {
    return btoa(JSON.stringify(clicktrack));
  }
  public static decode(string: string | undefined) {
    try {
      if (string === undefined) return;
      return JSON.parse(atob(string)) as Clicktrack;
    } catch (e) {
      throw new Error(e as string);
    }
  }
}
