import { IHeader } from '../index/Header';
import { DarkModeButton } from '../core/DarkModeButton';

export const AppHeader = ({ toggleDark, dark }: IHeader) => {
  return (
    <header className="backdrop- sticky top-0 z-[9999999] shrink grow-0 basis-auto border-b-[1px] border-zinc-200 bg-white/90 px-3 py-2 backdrop-blur-md dark:border-zinc-900 dark:bg-black/90">
      <div className="mx-auto flex w-full items-center justify-between">
        <a
          href="/"
          className="text-2xl font-black tracking-tighter text-purple-700 dark:text-purple-400"
        >
          ct.
        </a>
        <div className="flex gap-2">
          <a
            href="/app/clicktracks"
            className="flex items-center gap-1 rounded-md border-[1px] border-zinc-200 px-4 py-1 dark:border-zinc-900"
          >
            My Clicktracks
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a href="/app/account">
            <i className="bi-person-circle text-xl" />
          </a>
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
