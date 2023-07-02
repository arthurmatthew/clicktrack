import Metronome from '../../../metronome/metronome';

const remove = (id: string, sections: Metronome[]) => {
  if (!sections.find((metronome) => metronome.id == id)?.permanant)
    return sections.filter((metronome) => metronome.id != id);
  return sections;
};

export default remove;
