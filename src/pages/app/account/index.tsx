import { AccountTitle } from '../../../components/account/AccountTitle';

export const AccountIndex = () => {
  return (
    <div className="mx-4 my-10 flex flex-grow flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <AccountTitle />
      </div>
    </div>
  );
};
