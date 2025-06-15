import { Link } from 'react-router';

export const ClicktracksTitleAccount = () => {
  return (
    <Link
      to="/app/account"
      className="hidden aspect-square items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-900 sm:flex sm:h-24 sm:w-24"
    >
      <i className="bi-person hidden text-5xl opacity-50 sm:block sm:text-7xl" />
    </Link>
  );
};
