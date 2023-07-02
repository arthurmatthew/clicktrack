import Metronome, { Data } from './metronome';

const template: Metronome = {
  name: 'Default Metronome',
  id: 'default',
  opened: false,
  permanant: true,
  position: 1,
  data: new Data({}),
};

export default template;
