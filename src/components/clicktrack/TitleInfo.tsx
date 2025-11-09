import { useRef, useState } from 'react';
import { useClicktracks } from '../../hooks/useClicktracks';
import { DataViewItem } from './DataViewItem';
import { Clicktrack } from '../../models/Clicktrack';

export interface ITitleInfo {
  clicktrack: Clicktrack;
}

export const TitleInfo = ({ clicktrack }: ITitleInfo) => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [editing, setEditing] = useState<boolean>(false);

  const { handleNameChange } = useClicktracks(); // ! this doesnt work

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-3">
        <h1
          className={`flex cursor-default items-center break-all text-center text-3xl focus:outline-0 ${
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

      <ul className="hidden text-sm md:flex">
        <DataViewItem title={'ID'}>{clicktrack.id}</DataViewItem>
      </ul>
    </div>
  );
};
