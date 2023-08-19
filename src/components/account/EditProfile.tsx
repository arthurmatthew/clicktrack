import { useState } from 'react';
import { IAccountOverview } from './AccountOverview';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNotify } from '../../hooks/useNotify';

export const EditProfile = ({ user }: IAccountOverview) => {
  const [localDisplayName, setLocalDisplayName] = useState(
    user.displayName ?? ''
  );
  const [loading, setLoading] = useState(false);
  const { notify } = useNotify();

  const handleDisplayNameChange = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth();
    if (auth.currentUser === null) {
      setLoading(false);
      return;
    }

    await updateProfile(auth.currentUser, {
      displayName: localDisplayName,
    }).catch((e) => {
      notify('Your display name could not be changed.', 'error');
      console.error(e);
    });

    setLoading(false);
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl opacity-50">Edit Profile</h3>
      <div className="flex rounded-sm text-xl sm:text-3xl">
        <form className="flex gap-2">
          <input
            type="text"
            value={localDisplayName}
            onChange={(e) => setLocalDisplayName(e.currentTarget.value)}
            placeholder="Enter a display name here."
            className="rounded-sm border-[1px] border-neutral-300 bg-white p-3 text-lg focus:bg-neutral-100 focus:outline-none dark:border-neutral-700 dark:bg-black dark:focus:bg-neutral-900"
            required
          />
          <button
            className="rounded-sm border-[1px] border-neutral-300 bg-neutral-100 p-3 text-xl dark:border-neutral-700 dark:bg-neutral-900"
            onClick={handleDisplayNameChange}
            disabled={loading}
          >
            {loading ? 'Working...' : 'Set Display Name'}
          </button>
        </form>
      </div>
    </div>
  );
};
