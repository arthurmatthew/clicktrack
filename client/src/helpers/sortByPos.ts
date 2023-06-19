import { Section } from '../pages/app/view-projects';

export default function sortByPos(array: Section[]) {
  return array.sort((a, b) => a.position - b.position);
}
