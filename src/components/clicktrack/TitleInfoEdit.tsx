import { useState, useRef } from 'react';
import { Clicktrack } from '../../models/Clicktrack';
import { CLICKTRACK_NAME_MAX_LENGTH } from '../../config';

export const TitleInfoEdit = ({
  clicktrack,
  updateClicktrackName,
}: {
  clicktrack: Clicktrack;
  updateClicktrackName: (newName: string) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(clicktrack.name);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const trimmed = editValue.trim();
    if (trimmed.length === 0) {
      setEditValue(clicktrack.name);
      setEditing(false);
      return;
    }
    updateClicktrackName(trimmed);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditValue(clicktrack.name);
    setEditing(false);
  };

  const handleEditClick = () => {
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <>
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
          }}
          onBlur={handleSave}
          maxLength={CLICKTRACK_NAME_MAX_LENGTH}
          className="min-w-0 border-b-2 border-zinc-400 bg-transparent break-all focus:border-purple-600 focus:outline-none md:text-3xl dark:border-zinc-600"
        />
      ) : (
        <h1 className="flex cursor-default items-center text-center break-all md:text-3xl">
          {clicktrack.name}
        </h1>
      )}

      <i
        onClick={editing ? handleSave : handleEditClick}
        className={`bi-${
          editing ? 'check-lg' : 'pencil-fill'
        } mx-2 shrink-0 cursor-pointer text-sm opacity-50 hover:opacity-100`}
      />
    </>
  );
};
