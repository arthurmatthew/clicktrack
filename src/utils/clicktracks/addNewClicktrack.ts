import { Clicktrack } from '../../models/clicktrack/Clicktrack';

export const addNewClicktrack = (clicktracksToAddTo: Clicktrack[]) => {
  return [
    ...clicktracksToAddTo,
    new Clicktrack({
      name: `New Metronome ${clicktracksToAddTo.length + 1}`,
      position: clicktracksToAddTo.length + 1,
    }),
  ];
};