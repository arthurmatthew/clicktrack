import { Link } from 'react-router-dom';

export const ClicktracksTitle = () => {
  return (
    <div className="flex max-w-xs flex-col gap-2 sm:max-w-none">
      <h1 className="text-3xl font-semibold sm:text-5xl">Your Clicktracks</h1>
      <h2 className="max-w-3xl text-lg leading-tight opacity-80 sm:text-2xl">
        View all your clicktracks here. They're saved to your browser
        automatically.{' '}
        <Link to="/app/account" className="underline">
          Sign up
        </Link>{' '}
        to access them on all devices.
      </h2>
    </div>
  );
};
