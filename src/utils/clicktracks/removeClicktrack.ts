import { Clicktrack } from '../../clicktrack';

export const removeClicktrack = (
  clicktracksToRemoveFrom: Clicktrack[],
  id: string
) => {
  if (
    !clicktracksToRemoveFrom.find((metronome) => metronome.id === id)?.permanant
  )
    return clicktracksToRemoveFrom.filter((metronome) => metronome.id !== id);
  return clicktracksToRemoveFrom;
};
