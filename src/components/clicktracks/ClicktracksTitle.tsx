import { Link } from 'react-router';

export const ClicktracksTitle = ({ loggedIn }: { loggedIn: boolean }) => {
  return (
    <div className="flex max-w-xs flex-col gap-2 sm:max-w-none">
      <h1 className="text-3xl font-semibold sm:text-5xl">Your Clicktracks</h1>
      {!loggedIn && (
        <h2 className="max-w-3xl text-lg leading-tight opacity-80 sm:text-2xl">
          <Link className="underline" to="/app/account/login">
            Log in
          </Link>{' '}
          to save your Clicktracks to the cloud. Your data will be saved locally
          until you log in.
        </h2>
      )}
    </div>
  );
};
