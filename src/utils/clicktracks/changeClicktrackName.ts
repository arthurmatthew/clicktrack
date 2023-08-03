import { Clicktrack } from '../../clicktrack';

export const changeClicktrackName = (
  clicktracks: Clicktrack[],
  name: string,
  newName: string
) => {
  const clicktracksWithoutToBeNamed = clicktracks.filter(
    (metronome) => metronome.name !== name
  );
  const clicktrackToBeNamed = clicktracks.find(
    (metronome) => metronome.name === name
  );

  if (!clicktrackToBeNamed) return clicktracks;

  return [
    ...clicktracksWithoutToBeNamed,
    {
      ...clicktrackToBeNamed,
      name: Clicktrack.generateUniqueName(name, newName, clicktracks),
    },
  ];
};
