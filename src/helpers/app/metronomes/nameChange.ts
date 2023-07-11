import Metronome from '../../../metronome/classes/clicktrack';
import makeUnique from '../../makeUnique';

const nameChange = (name: string, newName: string, sections: Metronome[]) => {
  return [
    ...sections.filter((metronome) => metronome.name != name),
    {
      ...sections.filter((metronome) => metronome.name == name)[0],
      name: makeUnique(name, newName, sections),
    },
  ];
};

export default nameChange;
