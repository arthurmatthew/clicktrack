import { IComponent } from '../IComponent';

export const AccountAction = ({ children }: IComponent) => {
  return (
    <button className="flex h-full w-full select-none flex-col items-center justify-center gap-4 rounded-md border-[1px] border-neutral-300 bg-white p-4 duration-75 hover:-translate-y-1 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-black dark:hover:bg-neutral-900 sm:p-8">
      <h1 className="text-center text-xl sm:text-3xl">{children}</h1>
    </button>
  );
};
