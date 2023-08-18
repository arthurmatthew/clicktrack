import { AccountActions } from './AccountActions';

export const AccountTitle = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold sm:text-5xl">Welcome, USER</h1>
        <h2 className="text-2xl opacity-70">Need help? Contact support</h2>
      </div>

      <AccountActions />
      <div className="flex flex-col gap-2">
        <h3 className="text-xl opacity-50">Account Overview</h3>
      </div>
    </div>
  );
};
