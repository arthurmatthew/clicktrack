import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { Clicktrack } from '../../models/clicktrack/Clicktrack';
import { IComponent } from '../IComponent';
import { Button } from '../core/Button';

interface IClicktrackListItem extends IComponent {
  metronome: Clicktrack;
  dragHandle: DraggableProvidedDragHandleProps | null | undefined;
  remove: () => void;
  changeName: (name: string, newName: string) => void;
}

export const ClicktrackListItem = ({
  metronome,
  remove,
  changeName,
  dragHandle,
}: IClicktrackListItem) => {
  const [shown, setShown] = useState<boolean>(metronome.opened ?? false);
  const [editing, setEditing] = useState<boolean>(false);

  const nameRef = useRef<HTMLHeadingElement>(null);

  return (
    <div className="w-full rounded-sm border-[1px] border-neutral-200 p-4 dark:border-neutral-900">
      <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <i
            className="bi-list cursor-grab text-3xl text-neutral-600 dark:text-neutral-400"
            {...dragHandle}
          />
          <h1
            className={`flex cursor-default items-center text-3xl font-semibold focus:outline-0 ${
              editing && 'cursor-text underline'
            }`}
            suppressContentEditableWarning
            contentEditable={editing}
            spellCheck={false}
            ref={nameRef}
          >
            {metronome.name}
          </h1>
          <i
            onClick={() => {
              if (editing) {
                const nameCheck = /(.|\s)*\S(.|\s)*/gm;
                const newName = (nameRef.current?.innerText as string).trim();
                if (!nameCheck.test(newName)) {
                  (nameRef.current as HTMLHeadingElement).innerText =
                    metronome.name;
                  setEditing((previouslyEditing) => !previouslyEditing);
                  return;
                }
                changeName(metronome.name, newName);
              }
              setEditing((previouslyEditing) => !previouslyEditing);
            }}
            className={`bi-${
              editing ? 'check-lg' : 'pencil-fill'
            } mx-2 cursor-pointer text-sm opacity-50`}
          />
        </div>
        <div className="my-2 block h-px w-full bg-gradient-to-r from-neutral-300 to-transparent dark:from-neutral-700 sm:hidden" />
        <div className="flex gap-4">
          <Link
            to={`/app/clicktracks/${encodeURIComponent(
              metronome.id
            )}/sequencer`}
          >
            <Button className="bg-neutral-500">Open</Button>
          </Link>

          <p
            onClick={() => setShown((previouslyShown) => !previouslyShown)}
            className="flex cursor-pointer items-center gap-1 text-neutral-600 dark:text-neutral-400"
          >
            More{' '}
            <i
              className={`${
                shown ? 'bi-caret-down-fill' : 'bi-caret-right-fill'
              } text-sm`}
            />
          </p>
        </div>
      </div>

      {shown && (
        <div className="mt-2 flex items-center gap-4">
          <Button
            onClick={remove}
            className="bg-red-700 disabled:bg-neutral-500"
            disabled={metronome.permanant}
          >
            {metronome.permanant ? "Can't Delete" : 'Delete'}
          </Button>
          <p className="text-sm opacity-50 ">id: {metronome.id}</p>
        </div>
      )}
    </div>
  );
};
