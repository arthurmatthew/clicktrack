import { v4 as uuidv4 } from 'uuid';
import Metronome from '../../../metronome/metronome';

/**
 * Handle creation of a new `Section` object.
 * @param template Template to base `Section` off of
 * @param previous Previous array of `Section`s
 * @returns New `Section`
 */
const add = (template: Metronome, previous: Metronome[]) => {
  return {
    ...template,
    permanant: false,
    name: 'New Metronome ' + (previous.length + 1),
    id: uuidv4(),
    position: previous.length + 1,
  };
};

export default add;
