import { IButton } from '../core/Button';

interface IAuthProvider extends IButton {
  name: string;
}

export const AuthProvider = ({ name, children, onClick }: IAuthProvider) => {
  return (
    <button
      onClick={(e) => {
        if (!!onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      className="rounded-sm bg-neutral-800 px-6 py-3 text-lg text-white disabled:opacity-50 dark:bg-white dark:text-black"
      disabled={!onClick}
    >
      <div className="flex items-center gap-5">
        <p className="text-xl opacity-80">{children}</p>
        <p className="text-center">Continue with {name}</p>
      </div>
    </button>
  );
};
