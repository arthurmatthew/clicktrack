import { AccountTitle } from '../../../components/account/AccountTitle';
import { useUser } from '../../../hooks/useUser';

export const AccountIndex = () => {
  const { user } = useUser('/app/account/login');

  if (user)
    return (
      <div className="mx-4 my-10 flex flex-grow flex-col">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
          <AccountTitle name={user?.email} />
        </div>
      </div>
    );
};
