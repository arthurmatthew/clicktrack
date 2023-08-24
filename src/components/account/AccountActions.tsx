import { AccountAction } from './AccountAction';
import { unauthenticateUser } from '../../lib/firebase/unauthenticateUser';
import { useUser } from '../../hooks/useUser';
import { AccountUpgrade } from './AccountUpgrade';
import { useState } from 'react';
import { getCustomerPortal } from '../../lib/stripe/getCustomerPortal';

export const AccountActions = () => {
  const { premium } = useUser();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    await unauthenticateUser();
  };

  const handleManageSubscription = async () => {
    setLoading(true);
    await getCustomerPortal(() => setLoading(false));
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl opacity-50">Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        {premium ? (
          <AccountAction onClick={handleManageSubscription}>
            {loading ? (
              <i className="bi-arrow-clockwise block animate-spin" />
            ) : (
              'Manage Subscription'
            )}
          </AccountAction>
        ) : (
          <AccountUpgrade />
        )}
        <AccountAction onClick={handleSignOut} className="z-10">
          Sign Out
        </AccountAction>
      </div>
    </div>
  );
};
