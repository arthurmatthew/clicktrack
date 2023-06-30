import Section from '../../../types/app/metronomes/Section';

const remove = (id: string, sections: Section[]) => {
  if (!sections.find((metronome) => metronome.id == id)?.permanant)
    return sections.filter((metronome) => metronome.id != id);
  return sections;
};

export default remove;
