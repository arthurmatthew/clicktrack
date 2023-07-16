import { Link } from 'react-router-dom';

const Header = ({
  darkToggle,
  dark,
}: {
  darkToggle: React.Dispatch<React.SetStateAction<boolean>>;
  dark: boolean;
}) => {
  return (
    <header className="sticky top-0 z-10 shrink grow-0 basis-auto bg-gradient-radial from-slate-100/75 to-slate-300 bg-[length:100%_200%] bg-[100%_0] p-5 backdrop-blur-sm backdrop-saturate-50 dark:from-slate-800/90 dark:to-slate-950">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link to="/" className="text-4xl text-slate-800 dark:text-slate-200">
          clicktrack
        </Link>
        <div className="flex gap-4">
          <i
            className={`${
              dark ? 'bi-moon' : 'bi-sun'
            } text-3xl text-slate-800  hover:text-purple-600 dark:text-slate-200 dark:hover:text-purple-400`}
            onClick={() => darkToggle((previouslyDark) => !previouslyDark)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
