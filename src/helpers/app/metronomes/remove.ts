import { Clicktrack } from '../../../metronome/classes/clicktrack';

export const remove = (id: string, sections: Clicktrack[]) => {
  if (!sections.find((metronome) => metronome.id === id)?.permanant)
    return sections.filter((metronome) => metronome.id != id);
  return sections;
};
