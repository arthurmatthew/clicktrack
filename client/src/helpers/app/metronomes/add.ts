import Section from '../../../types/app/metronomes/Section';
import { v4 as uuidv4 } from 'uuid';

/**
 * Handle creation of a new `Section` object.
 * @param template Template to base `Section` off of
 * @param previous Previous array of `Section`s
 * @returns New `Section`
 */
const add = (template: Section, previous: Section[]) => {
  return {
    ...template,
    permanant: false,
    name: 'New Metronome ' + (previous.length + 1),
    id: uuidv4(),
    position: previous.length + 1,
  };
};

export default add;
