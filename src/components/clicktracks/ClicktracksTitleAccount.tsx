import { Link } from 'react-router-dom';

export const ClicktracksTitleAccount = () => {
  return (
    <Link
      to="/app/account"
      className="flex aspect-square h-24 w-24 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-900 sm:h-32 sm:w-32"
    >
      <i className="bi-person text-5xl opacity-50 sm:text-7xl" />
    </Link>
  );
};
