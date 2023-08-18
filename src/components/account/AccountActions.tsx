import { AccountAction } from './AccountAction';

export const AccountActions = () => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl opacity-50">Actions</h3>
      <div className="grid grid-cols-3 gap-2">
        <AccountAction>Manage Subscription</AccountAction>
        <AccountAction>Edit Profile</AccountAction>
        <AccountAction>Sign Out</AccountAction>
      </div>
    </div>
  );
};
