import { IButton } from '../core/Button';

interface IInteractableListItem extends IButton {
  icon: string;
}

export const InteractableListItem = ({
  children,
  icon,
  disabled,
  onClick,
}: IInteractableListItem) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full select-none rounded-md border-2 border-dashed border-zinc-200 bg-white/50 px-3 py-2 duration-75 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
    >
      <h1 className="flex items-center text-xl font-semibold">
        <i
          className={`bi-${icon} mr-3 text-2xl text-zinc-600 dark:text-zinc-400`}
        />
        {children}
      </h1>
    </button>
  );
};
