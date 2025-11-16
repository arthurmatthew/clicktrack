import {
  CLICKTRACK_DEFAULT_NAME,
  CLICKTRACK_DEFAULT_PERMANANT,
} from '../config';
import { ClicktrackData } from './ClicktrackData';
import { v4 as uuidv4 } from 'uuid';
import { constructSection } from '../utils/constructSection';

export class Clicktrack {
  static readonly CURRENT_VERSION = 1;

  public name: string; // Display name
  public readonly id: string; // Unique UUID
  public permanant: boolean; // Deletable
  public opened: boolean; // Opened, in its 'show more' state in the clicktrack list
  public data: ClicktrackData; // Clicktrack data, like settings and
  public version?: number;
  public lastModified?: number;

  constructor(options?: Partial<Clicktrack>) {
    this.name = options?.name ?? CLICKTRACK_DEFAULT_NAME;
    this.id = options?.id ?? uuidv4();
    this.permanant = options?.permanant ?? CLICKTRACK_DEFAULT_PERMANANT;
    this.data = options?.data ?? new ClicktrackData({});
    this.opened = options?.opened ?? false;
    this.version = options?.version || Clicktrack.CURRENT_VERSION;
    this.lastModified = options?.lastModified || Date.now();
  }

  public static parseInternals(clicktrack: Clicktrack) {
    const version = clicktrack.version || 1;
    let migratedClicktrack = clicktrack;

    if (version < Clicktrack.CURRENT_VERSION) {
      migratedClicktrack = this.migrate(clicktrack, version);
    }

    return new Clicktrack({
      ...migratedClicktrack,
      data: new ClicktrackData({
        ...migratedClicktrack.data,
        sections: migratedClicktrack.data.sections
          .map((section) => constructSection(section))
          .filter((section) => section !== undefined),
      }),
      version: Clicktrack.CURRENT_VERSION,
    });
  }

  private static migrate(clicktrack: any, _fromVersion: number): any {
    let migrated = { ...clicktrack };
    return migrated;
  }

  public static encode(clicktrack: Clicktrack) {
    return btoa(JSON.stringify(clicktrack));
  }
  public static decode(string: string) {
    return JSON.parse(atob(string)) as Clicktrack;
  }
}
