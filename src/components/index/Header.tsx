import { Link } from 'react-router-dom';

export const Header = ({
  darkToggle,
  dark,
}: {
  darkToggle: React.Dispatch<React.SetStateAction<boolean>>;
  dark: boolean;
}) => {
  return (
    <header className="sticky top-0 z-10 shrink grow-0 basis-auto bg-gradient-radial from-white to-neutral-300 bg-[length:100%_200%] bg-[100%_0] p-5 backdrop-blur-sm backdrop-saturate-50 dark:from-neutral-950 dark:to-black">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link to="/" className="text-4xl  ">
          clicktrack
        </Link>
        <div className="flex gap-4">
          <i
            className={`${
              dark ? 'bi-moon' : 'bi-sun'
            } text-3xl text-black  hover:text-neutral-600 dark:text-white dark:hover:text-neutral-400`}
            onClick={() => {
              darkToggle((previouslyDark) => !previouslyDark);
            }}
          />
        </div>
      </div>
    </header>
  );
};
