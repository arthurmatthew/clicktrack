import { useNavigate } from 'react-router-dom';
import { AccountAction } from './AccountAction';
import { unauthenticateUser } from '../../lib/firebase/unauthenticateUser';
import { getSubscriptionCheckout } from '../../lib/stripe/getSubscriptionCheckout';
import { useUser } from '../../hooks/useUser';
import { useState } from 'react';

export const AccountActions = () => {
  const [upgradeLoading, setUpgradeLoading] = useState(false);

  const navigate = useNavigate();
  const { premium } = useUser();

  const handleSignOut = async () => {
    await unauthenticateUser();
    navigate('/app/clicktracks');
  };

  const handleUpgrade = async () => {
    setUpgradeLoading(true);
    await getSubscriptionCheckout(() => {
      setUpgradeLoading(false);
    }).catch((error) => {
      console.error(error);
      setUpgradeLoading(false);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl opacity-50">Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        {premium ? (
          <AccountAction>Manage Subscription</AccountAction>
        ) : (
          <button
            onClick={handleUpgrade}
            className="flex h-full w-full select-none flex-col items-center justify-center gap-4 rounded-md border-[1px] border-purple-400 bg-white p-4 duration-75 hover:-translate-y-1 hover:bg-neutral-100 dark:border-purple-700 dark:bg-black dark:hover:bg-neutral-900 sm:p-8"
          >
            <h1 className="text-center text-xl sm:text-3xl">
              {upgradeLoading ? (
                <i className="bi-arrow-clockwise block animate-spin text-center text-xl sm:text-3xl" />
              ) : (
                'Upgrade to Premium'
              )}
            </h1>
          </button>
        )}
        <AccountAction onClick={handleSignOut}>Sign Out</AccountAction>
      </div>
    </div>
  );
};
