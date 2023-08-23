import { IButton } from '../core/Button';

interface IAccountUpgrade extends IButton {
  upgradeLoading: boolean;
}

export const AccountUpgrade = ({
  onClick,
  upgradeLoading,
}: IAccountUpgrade) => {
  return (
    <button
      onClick={onClick}
      className="flex h-full w-full select-none flex-col items-center justify-center gap-4 overflow-hidden rounded-md border-2 border-purple-400 shadow-2xl duration-150 hover:-translate-y-1 hover:shadow-purple-900 dark:border-purple-700"
    >
      <div className="w-full bg-gradient-to-b p-4 dark:from-purple-950 dark:to-black sm:p-8">
        <h1 className="text-center text-xl sm:text-3xl">
          {upgradeLoading ? (
            <i className="bi-arrow-clockwise block animate-spin text-center text-xl sm:text-3xl" />
          ) : (
            'Upgrade to Premium'
          )}
        </h1>
      </div>
    </button>
  );
};
