import { Link } from 'react-router-dom';

// interface IAccountUpgrade extends IButton {
//   upgradeLoading: boolean;
// }

export const AccountUpgrade = () => {
  return (
    <Link
      to="/app/premium"
      className="flex h-full w-full select-none flex-col items-center justify-center gap-4 overflow-hidden rounded-md border-2 border-purple-400 shadow-2xl shadow-transparent duration-150 hover:-translate-y-1 hover:shadow-purple-400/50 dark:border-purple-700 dark:hover:shadow-purple-900"
    >
      <div className="w-full bg-gradient-to-t from-purple-500 to-purple-100 p-4 dark:bg-gradient-to-b dark:from-purple-950 dark:to-black sm:p-8">
        <h1 className="text-center text-xl sm:text-3xl">Upgrade to Premium</h1>
      </div>
    </Link>
  );
};
