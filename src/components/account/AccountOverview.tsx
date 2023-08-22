import { User } from 'firebase/auth';
import { AccountDataValue } from './AccountDataValue';

export interface IAccountOverview {
  user: User;
}

export const AccountOverview = ({ user }: IAccountOverview) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl opacity-50">Account Overview</h3>
      <div className="grid grid-cols-2 rounded-sm bg-neutral-200 p-4 text-xl dark:bg-neutral-900 sm:text-3xl">
        <h4 className="w-max">Display Name</h4>
        <AccountDataValue>{user.displayName}</AccountDataValue>
        <h4 className="w-max">Email</h4>
        <AccountDataValue>{user.email}</AccountDataValue>
        <h4 className="w-max">Phone Number</h4>
        <AccountDataValue>{user.phoneNumber}</AccountDataValue>
        <h4 className="w-max">Account Creation Time</h4>
        <AccountDataValue>{user.metadata.creationTime}</AccountDataValue>
      </div>
    </div>
  );
};
