import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

export const ClicktracksTitle = () => {
  const { user } = useUser();

  return (
    <div className="flex max-w-xs flex-col gap-2 sm:max-w-none">
      <h1 className="text-3xl font-semibold sm:text-5xl">Your Clicktracks</h1>
      {user ? (
        <h2 className="max-w-3xl text-lg leading-tight opacity-80 sm:text-2xl">
          View all your clicktracks here. They're saved to your account
          automatically.
        </h2>
      ) : (
        <h2 className="max-w-3xl text-lg leading-tight opacity-80 sm:text-2xl">
          View all your clicktracks here.{' '}
          <Link to="/app/account/" className="underline">
            Sign in
          </Link>{' '}
          to save them and access them across your devices.
        </h2>
      )}
    </div>
  );
};
