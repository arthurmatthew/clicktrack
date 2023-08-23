import { AccountAction } from './AccountAction';
import { unauthenticateUser } from '../../lib/firebase/unauthenticateUser';
import { getSubscriptionCheckout } from '../../lib/stripe/getSubscriptionCheckout';
import { useUser } from '../../hooks/useUser';
import { useState } from 'react';
import { AccountUpgrade } from './AccountUpgrade';

export const AccountActions = () => {
  const [upgradeLoading, setUpgradeLoading] = useState(false);

  const { premium } = useUser();

  const handleSignOut = async () => {
    await unauthenticateUser();
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
          <AccountUpgrade
            onClick={handleUpgrade}
            upgradeLoading={upgradeLoading}
          />
        )}
        <AccountAction onClick={handleSignOut}>Sign Out</AccountAction>
      </div>
    </div>
  );
};
