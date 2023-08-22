import { Navigate } from 'react-router-dom';
import { AccountFooter } from '../../../components/account/AccountFooter';
import { AccountOverview } from '../../../components/account/AccountOverview';
import { AccountTitle } from '../../../components/account/AccountTitle';
import { EditProfile } from '../../../components/account/EditProfile';
import { useUser } from '../../../hooks/useUser';

export const AccountIndex = () => {
  const { user } = useUser();

  if (user) {
    return (
      <div className="mx-4 my-10 flex flex-grow flex-col">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
          <AccountTitle name={user.displayName ?? user?.email} />
          <AccountOverview user={user} />
          <EditProfile user={user} />
          <AccountFooter />
        </div>
      </div>
    );
  } else {
    <Navigate to="/app/account/login" />;
  }
};
