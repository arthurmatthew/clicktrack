import { Clicktrack } from '../../models/clicktrack/Clicktrack';

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
