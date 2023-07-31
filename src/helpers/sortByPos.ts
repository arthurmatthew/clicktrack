import { Clicktrack } from '../metronome/classes/clicktrack';

/**
 *  Sort array of objects by position property, non-mutating
 * @param array Array to sort
 * @returns Sorted copy of array
 */
export function sortByPos(array: Clicktrack[]) {
  const arrayCopy = array;
  return arrayCopy.sort((a, b) => a.position - b.position);
}
