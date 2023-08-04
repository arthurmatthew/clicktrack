import { Clicktrack } from '../../models/clicktrack/Clicktrack';

export const importClicktrack = (
  setClicktracks: (value: React.SetStateAction<Clicktrack[]>) => void,
  clicktrackCode: string
) => {
  setClicktracks((previousClicktracks) => {
    try {
      const importedClicktrack = JSON.parse(atob(clicktrackCode)) as Clicktrack;

      return [
        ...previousClicktracks,
        new Clicktrack({
          ...importedClicktrack,
          id: undefined,
          position: previousClicktracks.length + 1,
          name: Clicktrack.generateUniqueName(
            '',
            importedClicktrack.name,
            previousClicktracks
          ),
        }),
      ];
    } catch (error) {
      console.error(error);
      return previousClicktracks;
    }
  });
};
