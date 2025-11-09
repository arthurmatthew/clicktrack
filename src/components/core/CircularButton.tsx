import { IButton } from './Button';

export const CircularButton = ({ onClick, children }: IButton) => {
  return (
    <button
      onClick={onClick}
      className="flex aspect-square h-7 items-center justify-center rounded-full bg-zinc-200 duration-75 hover:bg-zinc-900 hover:text-white dark:bg-zinc-900 dark:hover:bg-zinc-200 dark:hover:text-black"
    >
      {children}
    </button>
  );
};
