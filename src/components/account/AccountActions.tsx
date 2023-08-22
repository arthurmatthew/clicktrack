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
    await getSubscriptionCheckout().catch(() => {
      setUpgradeLoading(false);
    });
    setUpgradeLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl opacity-50">Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        {premium ? (
          <AccountAction>Manage Subscription</AccountAction>
        ) : (
          <AccountAction disabled={upgradeLoading} onClick={handleUpgrade}>
            {upgradeLoading ? (
              <i className="bi-arrow-clockwise block animate-spin" />
            ) : (
              'Upgrade to Premium'
            )}
          </AccountAction>
        )}
        <AccountAction onClick={handleSignOut}>Sign Out</AccountAction>
      </div>
    </div>
  );
};
