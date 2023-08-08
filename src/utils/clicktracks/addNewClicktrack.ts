import { Clicktrack } from '../../models/Clicktrack';

export const addNewClicktrack = (
  setClicktracks: (value: React.SetStateAction<Clicktrack[]>) => void
) => {
  setClicktracks((previousClicktracks) => [
    ...previousClicktracks,
    new Clicktrack({
      name: `New Metronome ${previousClicktracks.length + 1}`,
      position: previousClicktracks.length + 1,
    }),
  ]);
  return;
};
