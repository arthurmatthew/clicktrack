import Clicktrack from '../metronome/classes/clicktrack';

/**
 *
 * @param name Original name
 * @param newName Proposed new name
 * @param prev Array of `Sections` to check uniqueness
 * @returns Unique name that works in given array `prev`
 */
export default function makeUnique(
  name: string,
  newName: string,
  prev: Clicktrack[]
) {
  let trials = 0;
  let uniqueName = newName;

  while (trials < 1000) {
    const exist = [
      ...prev.filter((metronome) => metronome.name != name),
      {
        ...prev.filter((metronome) => metronome.name == name)[0],
        name: uniqueName,
      },
    ].filter((metronome) => metronome.name == uniqueName).length;
    if (exist <= 1) {
      uniqueName = trials == 0 ? newName : `${newName} (#${trials})`;
      break;
    }
    trials++;
    uniqueName = `${newName} (#${trials})`;
  }

  return uniqueName;
}
