import { IButton } from '../core/Button';

interface ITemplate extends IButton {
  title: string;
}

export const Template = ({ title, onClick, children }: ITemplate) => {
  return (
    <button
      onClick={onClick}
      className="flex h-full w-full select-none flex-col items-center gap-4 rounded-md border-[1px] border-neutral-300 bg-white p-8 duration-75 hover:-translate-y-1 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-black dark:hover:bg-neutral-900"
    >
      <h1 className="text-center text-3xl">{title}</h1>
      <p className="text-center">{children}</p>
    </button>
  );
};
