import { Clicktrack } from '../../../metronome/classes/clicktrack';
import { makeUnique } from '../../makeUnique';

export const nameChange = (
  name: string,
  newName: string,
  sections: Clicktrack[]
) => {
  return [
    ...sections.filter((metronome) => metronome.name != name),
    {
      ...sections.filter((metronome) => metronome.name === name)[0],
      name: makeUnique(name, newName, sections),
    },
  ];
};
