import { Section } from '../pages/app/metronomes';

export default function sortByPos(array: Section[]) {
  return array.sort((a, b) => a.position - b.position);
}
