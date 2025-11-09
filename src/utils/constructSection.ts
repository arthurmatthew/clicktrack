import { Metronome } from '../models/Metronome';
import { Repeat } from '../models/Repeat';
import { Transition } from '../models/Transition';
import { TSection } from '../types';

export function constructSection(section: Partial<TSection>): TSection {
  switch (section.type) {
    case 'metronome':
      return new Metronome(section);
    case 'repeat':
      return new Repeat(section);
    case 'transition':
      return new Transition(section);
    default:
      throw new Error(`Unknown section type: ${(section as any).type}`);
  }
}
