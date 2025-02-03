import { useUser } from '../../hooks/useUser';
import { AccountActions } from './AccountActions';
import { FreeBadge } from './FreeBadge';
import { PremiumBadge } from './PremiumBadge';

interface IAccountTitle {
  name: string | null | undefined;
}

export const AccountTitle = ({ name }: IAccountTitle) => {
  const { premium } = useUser();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-4">
          <h1 className="text-3xl font-semibold sm:text-5xl">
            Welcome, {name}
          </h1>
          {premium ? <PremiumBadge /> : <FreeBadge />}
        </div>

        <h2 className="text-2xl opacity-70">
          Need help? Contact support: useclicktrack@gmail.com
        </h2>
      </div>

      <AccountActions />
    </div>
  );
};
