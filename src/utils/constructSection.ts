import { Metronome } from '../models/Metronome';
import { Repeat } from '../models/Repeat';
import { TSection } from '../types';

export function constructSection(section: Partial<TSection>): TSection {
  switch (section.type) {
    case 'metronome':
      return new Metronome(section);
    case 'repeat':
      return new Repeat(section);
    default:
      throw new Error(`Unknown section type: ${(section as any).type}`);
  }
}
