import { useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { useNotify } from '../../hooks/useNotify';
import { useNavigate } from 'react-router-dom';

export const AccountFooter = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { notify } = useNotify();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (user === null) return;
    setLoading(true);

    try {
      await user.delete();
      setLoading(false);
      window.location.assign(window.location.origin);
    } catch (error) {
      notify(
        'You need to verify your ownership of the account before performing this action.',
        'info'
      );
      navigate('/app/account/verify');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl opacity-50">Advanced</h3>
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-6">
        <button
          onClick={handleDelete}
          className={`flex w-full select-none flex-col items-center justify-center gap-4 rounded-md border-[1px] border-neutral-300 bg-white p-2 duration-75 hover:bg-red-500 hover:text-white dark:border-neutral-700 dark:bg-black dark:hover:bg-red-700`}
        >
          <h1 className="text-center text-xl">
            {loading ? 'Deleting...' : 'Delete Account'}
          </h1>
        </button>
        <p className="opacity-70 sm:py-2">
          Deleting your account will delete all user data associated. This
          includes your saved clicktracks. This process is instant. Support
          cannot assist in data recovery.
        </p>
      </div>
    </div>
  );
};
