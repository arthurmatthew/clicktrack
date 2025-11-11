import { useRef, useState } from 'react';
import { Clicktrack } from '../../models/Clicktrack';
import { IComponent } from '../IComponent';
import { Button } from '../core/Button';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';

interface IClicktrackListItem extends IComponent {
  clicktrack: Clicktrack;
  limitSaves: boolean;
  handleRemove: () => void;
  handleNameChange: (name: string, newName: string) => void;
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
  const [editing, setEditing] = useState<boolean>(false);

  const nameRef = useRef<HTMLHeadingElement>(null);

  return (
    <div className="w-full select-none rounded-sm border border-zinc-200 bg-white p-4 dark:border-zinc-900 dark:bg-black">
      <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <i
            className="bi-list cursor-grab text-3xl text-zinc-600 dark:text-zinc-400"
            {...dragHandle}
          />
          <h1
            className={`flex cursor-default items-center break-all text-3xl focus:outline-0 ${
              editing && 'cursor-text underline'
            }`}
            suppressContentEditableWarning
            contentEditable={editing}
            spellCheck={false}
            ref={nameRef}
          >
            {clicktrack.name}
          </h1>
          <i
            onClick={() => {
              if (editing) {
                const nameCheck = /(.|\s)*\S(.|\s)*/gm;
                const newName = (nameRef.current?.innerText as string).trim();
                if (!nameCheck.test(newName)) {
                  (nameRef.current as HTMLHeadingElement).innerText =
                    clicktrack.name;
                  setEditing((previouslyEditing) => !previouslyEditing);
                  return;
                }
                handleNameChange(clicktrack.id, newName);
              }
              setEditing((previouslyEditing) => !previouslyEditing);
            }}
            className={`bi-${
              editing ? 'check-lg' : 'pencil-fill'
            } mx-2 cursor-pointer text-sm opacity-50`}
          />
        </div>
        <div className="my-2 block h-px w-full bg-linear-to-r from-zinc-300 to-transparent dark:from-zinc-700 sm:hidden" />
        <div className="flex gap-4">
          <a href={`/app/clicktracks/${encodeURIComponent(clicktrack.id)}`}>
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
        <div className="mt-2 flex items-center gap-4">
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
          <p className="text-sm opacity-50 ">id: {clicktrack.id}</p>
        </div>
      )}
    </div>
  );
};
