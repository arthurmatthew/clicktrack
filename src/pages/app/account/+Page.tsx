import { navigate } from 'vike/client/router';
import { AccountFooter } from '../../../components/account/AccountFooter';
import { AccountOverview } from '../../../components/account/AccountOverview';
import { AccountTitle } from '../../../components/account/AccountTitle';
import { EditProfile } from '../../../components/account/EditProfile';
import { useUser } from '../../../hooks/useUser';
import { useEffect } from 'react';

export const Page = () => {
  const { user, initialized } = useUser();

  useEffect(() => {
    if (initialized && !user) {
      navigate('/app/account/login');
    }
  }, [initialized, user]);

  if (!initialized) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-4 my-10 flex grow flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <AccountTitle name={user.displayName ?? user?.email ?? 'User'} />
        <AccountOverview user={user} />
        <EditProfile user={user} />
        <AccountFooter />
      </div>
    </div>
  );
};
