import { useState } from 'react';
import { IAccountOverview } from './AccountOverview';
import { updateUserProfile } from '../../lib/firebase/updateUserProfile';
import { DISPLAY_NAME_MAX_LENGTH } from '../../config';
import { useNotify } from '../../hooks/useNotify';

export const EditProfile = ({ user }: IAccountOverview) => {
  const [localDisplayName, setLocalDisplayName] = useState(
    user.displayName ?? '',
  );
  const [loading, setLoading] = useState(false);
  const { notify } = useNotify();

  const handleDisplayNameChange = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    const trimmedName = localDisplayName.trim();

    if (trimmedName.length > DISPLAY_NAME_MAX_LENGTH) {
      notify('Name too long', 'error');
      setLoading(false);
      return;
    }

    if (trimmedName.length < 1) {
      notify('Name too short', 'error');
      setLoading(false);
      return;
    }

    await updateUserProfile({ displayName: localDisplayName }).catch(() =>
      setLoading(false),
    );

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
            maxLength={DISPLAY_NAME_MAX_LENGTH}
            name="display-name"
            placeholder="Enter a display name here."
            className="rounded-sm border border-zinc-300 bg-white p-3 text-lg focus:bg-zinc-100 focus:outline-none dark:border-zinc-700 dark:bg-black dark:focus:bg-zinc-900"
            required
          />
          <button
            className="rounded-sm border border-zinc-300 bg-zinc-100 p-3 text-xl dark:border-zinc-700 dark:bg-zinc-900"
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
