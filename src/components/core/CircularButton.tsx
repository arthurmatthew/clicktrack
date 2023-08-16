import { IButton } from './Button';

export const CircularButton = ({ onClick, children }: IButton) => {
  return (
    <button
      onClick={onClick}
      className="flex aspect-square h-7 items-center justify-center rounded-full bg-neutral-200 duration-75 hover:bg-neutral-900 hover:text-white dark:bg-neutral-900 dark:hover:bg-neutral-200 dark:hover:text-black"
    >
      {children}
    </button>
  );
};
