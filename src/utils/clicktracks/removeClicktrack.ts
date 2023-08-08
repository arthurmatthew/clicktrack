import { Clicktrack } from '../../models/Clicktrack';

export const removeClicktrack = (
  setClicktracks: (value: React.SetStateAction<Clicktrack[]>) => void,
  id: string
) => {
  setClicktracks((previousClicktracks) => {
    if (
      !previousClicktracks.find((metronome) => metronome.id === id)?.permanant
    )
      return previousClicktracks.filter((metronome) => metronome.id !== id);
    return previousClicktracks;
  });
};
