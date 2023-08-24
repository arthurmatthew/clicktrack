import { User } from 'firebase/auth';
import { IButton } from '../core/Button';

interface ISubscribeButton extends IButton {
  subscribed: boolean;
  user: User | null;
  loading?: boolean;
}

export const SubscribeButton = ({
  subscribed,
  loading,
  user,
  className,
  onClick,
}: ISubscribeButton) => {
  return (
    <div className="pt-4">
      {user ? (
        <>
          {subscribed ? (
            <button
              className={`w-full cursor-not-allowed rounded-full bg-neutral-300 p-4 px-6 text-xl dark:bg-neutral-800 ${className}`}
            >
              Current Plan
            </button>
          ) : (
            <button
              className={`flex w-full justify-between rounded-full bg-black p-4 px-6 text-xl text-white dark:bg-white dark:text-black ${className}`}
              onClick={onClick}
            >
              {loading ? (
                <i className="bi-arrow-clockwise block w-full animate-spin" />
              ) : (
                <>
                  Subscribe
                  <i className="bi-arrow-right" />
                </>
              )}
            </button>
          )}
        </>
      ) : (
        <button
          className={`flex w-full justify-between rounded-full p-4 px-6 text-xl dark:bg-neutral-800 dark:text-white ${className}`}
        >
          Sign in
          <i className="bi-arrow-right" />
        </button>
      )}
    </div>
  );
};
