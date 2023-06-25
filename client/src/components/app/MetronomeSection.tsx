import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../../pages/app/metronomes';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

export interface IMetronomeSection {
  metronome: Section;
  remove: () => void;
  changeName: (name: string, newName: string) => void;
  dragHandle: DraggableProvidedDragHandleProps | null | undefined;
  children?: React.ReactNode;
}
export const MetronomeSection = ({
  metronome,
  remove,
  changeName,
  dragHandle,
}: IMetronomeSection) => {
  const [shown, setShown] = useState<boolean>(metronome.opened || false);
  const [editing, setEditing] = useState<boolean>(false);

  const nameRef = useRef<HTMLHeadingElement>(null);

  return (
    <div className="w-full rounded-md border-2 border-slate-300 bg-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-col items-start justify-between text-slate-900 dark:text-slate-100 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <i
            className="bi-list cursor-grab text-3xl text-slate-600 dark:text-slate-400"
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
                  setEditing((prev) => !prev);
                  return;
                }
                changeName(metronome.name, newName);
              }
              setEditing((prev) => !prev);
            }}
            className={`bi-${
              editing ? 'check-lg' : 'pencil-fill'
            } mx-2 cursor-pointer text-sm opacity-50`}
          />
        </div>
        <div className="my-2 block h-px w-full bg-gradient-to-r from-slate-300 to-transparent dark:from-slate-700 sm:hidden" />
        <div className="flex gap-4">
          <Link
            to={`/app/metronomes/${encodeURIComponent(metronome.id)}`}
            className="rounded-sm bg-slate-500 px-10 py-2 text-white"
          >
            Open
          </Link>
          <p
            onClick={() => setShown((prev) => !prev)}
            className="flex cursor-pointer items-center gap-1 text-slate-600 dark:text-slate-400"
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
          <button
            onClick={remove}
            className="rounded-sm bg-red-700 px-4 py-2 text-white"
          >
            Delete
          </button>
          <p className="text-sm opacity-50">id: {metronome.id}</p>
        </div>
      )}
    </div>
  );
};
