import { Clicktrack } from '../../models/Clicktrack';

export const changeClicktrackName = (
  setClicktracks: (value: React.SetStateAction<Clicktrack[]>) => void,
  id: string,
  newName: string
) => {
  setClicktracks((previousClicktracks) => {
    const clicktracksWithoutToBeNamed = previousClicktracks.filter(
      (metronome) => metronome.id !== id
    );
    const clicktrackToBeNamed = previousClicktracks.find(
      (metronome) => metronome.id === id
    );

    if (!clicktrackToBeNamed) return previousClicktracks;

    const clicktrackToBeNamedIndex =
      previousClicktracks.indexOf(clicktrackToBeNamed);

    clicktracksWithoutToBeNamed.splice(
      clicktrackToBeNamedIndex,
      0,
      new Clicktrack({ ...clicktrackToBeNamed, name: newName })
    );

    return clicktracksWithoutToBeNamed;
  });
};
