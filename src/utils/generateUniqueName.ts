import { Clicktrack } from '../models/clicktrack/Clicktrack';
import { CLICKTRACK_MAX_UNSUCCESSFUL_CHECKS } from '../config';

export const generateUniqueName = (
  name: string,
  newName: string,
  prev: Clicktrack[]
) => {
  let unsuccessfulChecks = 0;
  let uniqueName = newName;

  while (unsuccessfulChecks < CLICKTRACK_MAX_UNSUCCESSFUL_CHECKS) {
    const clicktracksWithSharedName = [
      ...prev.filter((metronome) => metronome.name !== name),
      {
        ...prev.filter((metronome) => metronome.name === name)[0],
        name: uniqueName,
      },
    ].filter((metronome) => metronome.name === uniqueName);

    if (clicktracksWithSharedName.length <= 1) {
      uniqueName =
        unsuccessfulChecks === 0
          ? newName // Don't add a suffix to the name if it's already unique
          : `${newName} (#${unsuccessfulChecks})`;
      break;
    }
    unsuccessfulChecks++;
    uniqueName = `${newName} (#${unsuccessfulChecks})`;
  }

  return uniqueName;
};
