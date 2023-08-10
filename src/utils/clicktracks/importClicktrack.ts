import { Clicktrack } from '../../models/Clicktrack';

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
          name: importedClicktrack.name,
        }),
      ];
    } catch (error) {
      console.error(error);
      return previousClicktracks;
    }
  });
};
