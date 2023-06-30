import { Section } from '../types/app/metronomes/Section';

/**
 *  Sort array of objects by position property, non-mutating
 * @param array Array to sort
 * @returns Sorted copy of array
 */
export default function sortByPos(array: Section[]) {
  const arrayCopy = array;
  return arrayCopy.sort((a, b) => a.position - b.position);
}
