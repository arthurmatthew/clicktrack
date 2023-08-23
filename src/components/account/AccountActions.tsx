import { AccountAction } from './AccountAction';
import { unauthenticateUser } from '../../lib/firebase/unauthenticateUser';
import { useUser } from '../../hooks/useUser';
import { AccountUpgrade } from './AccountUpgrade';

export const AccountActions = () => {
  const { premium } = useUser();

  const handleSignOut = async () => {
    await unauthenticateUser();
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl opacity-50">Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        {premium ? (
          <AccountAction>Manage Subscription</AccountAction>
        ) : (
          <AccountUpgrade />
        )}
        <AccountAction onClick={handleSignOut}>Sign Out</AccountAction>
      </div>
    </div>
  );
};
