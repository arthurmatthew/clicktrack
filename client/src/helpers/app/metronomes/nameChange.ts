import Section from '../../../types/app/metronomes/Section';
import makeUnique from '../../makeUnique';

const nameChange = (name: string, newName: string, sections: Section[]) => {
  return [
    ...sections.filter((metronome) => metronome.name != name),
    {
      ...sections.filter((metronome) => metronome.name == name)[0],
      name: makeUnique(name, newName, sections),
    },
  ];
};

export default nameChange;
