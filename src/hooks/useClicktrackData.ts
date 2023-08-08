import { Clicktrack } from '../models/Clicktrack';
import { ClicktrackData } from '../models/ClicktrackData';

export const useClicktrackData = (
  setClicktrack: (value: React.SetStateAction<Clicktrack>) => void
) => {
  const updateClicktrackData = (update: Partial<Clicktrack['data']>): void => {
    setClicktrack((previousClicktrack) => {
      const updatedData = new ClicktrackData({
        ...previousClicktrack.data,
        ...update,
      });
      return new Clicktrack({
        ...previousClicktrack,
        data: updatedData,
      });
    });
  };

  return { updateClicktrackData };
};
