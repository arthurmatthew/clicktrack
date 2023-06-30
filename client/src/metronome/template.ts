import Section from '../types/app/metronomes/Section';

const template: Section = {
  name: 'Default Metronome',
  id: 'default',
  opened: false,
  permanant: true,
  position: 1,
  data: {
    bpm: 120,
  },
} as Section;

export default template;
