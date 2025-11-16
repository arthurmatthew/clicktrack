import { useState } from 'react';
import { Clicktrack } from '../../models/Clicktrack';
import { IComponent } from '../IComponent';
import { Button } from '../core/Button';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import { ClicktrackListItemName } from './ClicktrackListItemName';
import { formatTimestamp } from '../../utils/formatTimestamp';

interface IClicktrackListItem extends IComponent {
  clicktrack: Clicktrack;
  limitSaves: boolean;
  handleRemove: () => void;
  handleNameChange: (id: string, newName: string) => void;
  dragHandle: DraggableProvidedDragHandleProps | null | undefined;
  handleCopy: (id: string) => void;
}

export const ClicktrackListItem = ({
  clicktrack,
  limitSaves,
  handleRemove,
  handleNameChange,
  dragHandle,
  handleCopy,
}: IClicktrackListItem) => {
  const [shown, setShown] = useState<boolean>(clicktrack.opened);

  return (
    <div className="w-full rounded-sm border border-zinc-200 bg-white p-4 select-none dark:border-zinc-900 dark:bg-black">
      <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div className="flex max-w-full min-w-0 items-center gap-3">
          <i
            className="bi-list cursor-grab text-3xl text-zinc-600 dark:text-zinc-400"
            {...dragHandle}
          />

          <ClicktrackListItemName {...{ clicktrack, handleNameChange }} />
        </div>
        <div className="my-2 block h-px w-full bg-linear-to-r from-zinc-300 to-transparent sm:hidden dark:from-zinc-700" />
        <div className="flex gap-4">
          <a
            href={`/app/clicktracks/c?id=${encodeURIComponent(clicktrack.id)}`}
          >
            <Button className="bg-zinc-200 dark:bg-zinc-900">Open</Button>
          </a>

          <p
            onClick={() => {
              setShown((previouslyShown) => !previouslyShown);
            }}
            className="group flex cursor-pointer items-center gap-2 text-zinc-600 dark:text-zinc-400"
          >
            More{' '}
            <i
              className={`bi-caret-right-fill text-sm duration-75 ${
                shown ? 'rotate-90' : 'group-hover:rotate-45'
              }`}
            />
          </p>
        </div>
      </div>

      {shown && (
        <div className="mt-2 flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
          <div className="flex gap-2 md:gap-4">
            <Button
              className="bg-zinc-200 dark:bg-zinc-900"
              disabled={limitSaves}
              onClick={() => {
                handleCopy(clicktrack.id);
              }}
            >
              Copy
            </Button>
            <Button
              onClick={handleRemove}
              className="bg-red-600 text-white"
              disabled={clicktrack.permanant}
            >
              {clicktrack.permanant ? "Can't Delete" : 'Delete'}
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm opacity-50">id: {clicktrack.id}</p>
            <p className="text-sm opacity-50">
              last modified: {formatTimestamp(clicktrack.lastModified)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
