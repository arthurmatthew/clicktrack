import { Link } from 'react-router-dom';

export const AppHeader = ({
  darkToggle,
  dark,
}: {
  darkToggle: React.Dispatch<React.SetStateAction<boolean>>;
  dark: boolean;
}) => {
  return (
    <header className="sticky top-0 z-10 shrink grow-0 basis-auto border-b-[1px] border-neutral-200 bg-inherit px-3 py-2 dark:border-neutral-900">
      <div className="mx-auto flex w-full items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter text-purple-700 dark:text-purple-400"
        >
          ct.
        </Link>
        <Link
          to="/app/metronomes"
          className="flex items-center gap-1 rounded-md border-[1px] border-neutral-200 px-4 py-1 text-black dark:border-neutral-900 dark:text-white"
        >
          Metronomes
        </Link>
        <div className="flex gap-4">
          <i
            className={`${
              dark ? 'bi-moon' : 'bi-sun'
            } text-xl text-black  hover:text-neutral-600 dark:text-white dark:hover:text-neutral-400`}
            onClick={() => darkToggle((previouslyDark) => !previouslyDark)}
          />
        </div>
      </div>
    </header>
  );
};
