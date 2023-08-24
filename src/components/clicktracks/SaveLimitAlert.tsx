import { Link } from 'react-router-dom';

interface ISaveLimitAlert {
  length: number;
}

export const SaveLimitAlert = ({ length }: ISaveLimitAlert) => {
  if (length >= 3)
    return (
      <div className="w-full select-none rounded-md border-2 border-dashed border-neutral-200 bg-white/50 px-3 py-2 duration-75 dark:border-neutral-800 dark:bg-neutral-900/50">
        <p className="p-4 text-center text-xl sm:p-8 sm:text-2xl">
          Want to save more than 3 clicktracks?{' '}
          <Link to="/app/premium" className="underline">
            Upgrade to premium
          </Link>{' '}
          to save as many as you want.
        </p>
      </div>
    );
};
