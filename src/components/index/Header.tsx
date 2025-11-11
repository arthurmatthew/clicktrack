import { DarkModeButton } from '../core/DarkModeButton';

export interface IHeader {
  toggleDark: () => void;
  dark: boolean;
}

export const Header = ({ toggleDark, dark }: IHeader) => {
  return (
    <header className="sticky top-0 z-10 shrink grow-0 basis-auto bg-zinc-100 p-4 backdrop-blur-sm dark:bg-zinc-800 sm:p-5">
      <div className="mx-auto flex w-full items-center justify-between px-2 xl:px-32">
        <a href="/" className="text-4xl">
          clicktrack
        </a>
        <div className="flex items-center gap-4">
          <a
            href="/app/"
            className="rounded-md border border-zinc-200 bg-white px-6 py-2 text-sm dark:border-zinc-700 dark:bg-black"
          >
            Open App
          </a>
          <DarkModeButton
            onClick={toggleDark}
            dark={dark}
            className="text-2xl"
          />
        </div>
      </div>
    </header>
  );
};
