import { Link } from 'react-router';
import { DarkModeButton } from '../core/DarkModeButton';

export interface IHeader {
  toggleDark: () => void;
  dark: boolean;
}

export const Header = ({ toggleDark, dark }: IHeader) => {
  return (
    <header className="sticky top-0 z-10 shrink grow-0 basis-auto bg-gray-100 p-5 backdrop-blur-sm dark:bg-neutral-900">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link to="/" className="text-4xl  ">
          clicktrack
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/app/"
            className="rounded-md border-2 border-gray-200 bg-white px-6 py-2 text-sm"
          >
            Open App
          </Link>
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
