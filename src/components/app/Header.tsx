import { Link } from 'react-router';
import { IHeader } from '../index/Header';
import { DarkModeButton } from '../core/DarkModeButton';

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
        <div className="flex gap-2">
          <Link
            to="/app/clicktracks"
            className="flex items-center gap-1 rounded-md border-[1px] border-neutral-200 px-4 py-1 dark:border-neutral-900"
          >
            My Clicktracks
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/app/account">
            <i className="bi-person-circle text-xl" />
          </Link>
          <DarkModeButton
            onClick={toggleDark}
            dark={dark}
            className="text-xl"
          />
        </div>
      </div>
    </header>
  );
};
