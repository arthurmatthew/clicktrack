import { DataViewItem } from './DataViewItem';
import { Clicktrack } from '../../models/Clicktrack';
import { TitleInfoEdit } from './TitleInfoEdit';

export interface ITitleInfo {
  clicktrack: Clicktrack;
  updateClicktrackName: (newName: string) => void;
}

export const TitleInfo = ({ clicktrack, updateClicktrackName }: ITitleInfo) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1 md:gap-3">
        <TitleInfoEdit {...{ clicktrack, updateClicktrackName }} />
      </div>

      <ul className="hidden text-sm md:flex">
        <DataViewItem title={'ID'}>{clicktrack.id}</DataViewItem>
      </ul>
    </div>
  );
};
