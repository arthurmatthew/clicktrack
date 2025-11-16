import { useRef, useState } from 'react';
import { Clicktrack } from '../../models/Clicktrack';
import { CLICKTRACK_NAME_MAX_LENGTH } from '../../config';

export const ClicktrackListItemName = ({
  clicktrack,
  handleNameChange,
}: {
  clicktrack: Clicktrack;
  handleNameChange: (id: string, newName: string) => void;
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
    handleNameChange(clicktrack.id, trimmed);
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
          maxLength={CLICKTRACK_NAME_MAX_LENGTH}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
          }}
          className="max-w-full min-w-0 flex-1 border-b-2 border-zinc-400 bg-transparent text-3xl break-all focus:border-purple-600 focus:outline-none dark:border-zinc-600"
        />
      ) : (
        <h1 className="flex cursor-default items-center text-3xl break-all">
          {clicktrack.name}
        </h1>
      )}
      <i
        onClick={editing ? handleSave : handleEditClick}
        className={`bi-${
          editing ? 'check-lg' : 'pencil-fill'
        } mx-2 cursor-pointer text-sm opacity-50`}
      />
    </>
  );
};
