import {
  CLICKTRACK_DEFAULT_NAME,
  CLICKTRACK_DEFAULT_POSITION,
  CLICKTRACK_DEFAULT_PERMANANT,
} from '../../config';
import { generateUniqueName } from '../../utils/generateUniqueName';
import { ClicktrackData } from './ClicktrackData';
import { v4 as uuidv4 } from 'uuid';

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
