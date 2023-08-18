import { IButton } from '../core/Button';

interface ITemplate extends IButton {
  title: string;
}

export const Template = ({ title, onClick, children }: ITemplate) => {
  return (
    <button
      onClick={onClick}
      className="relative flex h-full w-full select-none flex-col items-center gap-2 overflow-hidden rounded-md border-[1px] border-neutral-300 bg-white p-4 duration-75 hover:-translate-y-1 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-black dark:hover:bg-neutral-900 sm:gap-4 sm:p-8"
    >
      <i className="bi-music-note-list absolute text-9xl opacity-10" />
      <h1 className="text-center text-2xl sm:text-3xl">{title}</h1>
      <p className="text-center text-base">{children}</p>
    </button>
  );
};
