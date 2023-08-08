import { Clicktrack } from '../../models/Clicktrack';

export const changeClicktrackName = (
  setClicktracks: (value: React.SetStateAction<Clicktrack[]>) => void,
  name: string,
  newName: string
) => {
  setClicktracks((previousClicktracks) => {
    const clicktracksWithoutToBeNamed = previousClicktracks.filter(
      (metronome) => metronome.name !== name
    );
    const clicktrackToBeNamed = previousClicktracks.find(
      (metronome) => metronome.name === name
    );

    if (!clicktrackToBeNamed) return previousClicktracks;

    return [
      ...clicktracksWithoutToBeNamed,
      {
        ...clicktrackToBeNamed,
        name: Clicktrack.generateUniqueName(name, newName, previousClicktracks),
      },
    ];
  });
};
