import { Link } from 'react-router-dom';
import { IHeader } from '../index/Header';

export const AppHeader = ({ toggleDark, dark }: IHeader) => {
  return (
    <header className="backdrop- sticky top-0 z-[9999999] shrink grow-0 basis-auto border-b-[1px] border-neutral-200 bg-white/90 px-3 py-2 backdrop-blur-md dark:border-neutral-900 dark:bg-black/90">
      <div className="mx-auto flex w-full items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter text-purple-700 dark:text-purple-400"
        >
          ct.
        </Link>
        <Link
          to="/app/clicktracks"
          className="flex items-center gap-1 rounded-md border-[1px] border-neutral-200 px-4 py-1 text-black dark:border-neutral-900 dark:text-white"
        >
          My Clicktracks
        </Link>
        <div className="flex gap-4">
          <i
            className={`${
              dark ? 'bi-moon' : 'bi-sun'
            } text-xl text-black  hover:text-neutral-600 dark:text-white dark:hover:text-neutral-400`}
            onClick={toggleDark}
          />
        </div>
      </div>
    </header>
  );
};
