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
      className="w-full select-none rounded-md border-2 border-dashed border-neutral-200 bg-white/50 px-3 py-2 duration-75 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:bg-neutral-900"
    >
      <h1 className="flex items-center text-xl font-semibold">
        <i
          className={`bi-${icon} mr-3 text-2xl text-neutral-600 dark:text-neutral-400`}
        />
        {children}
      </h1>
    </button>
  );
};
