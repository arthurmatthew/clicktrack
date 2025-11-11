import { IComponent } from '../IComponent';

interface ISettingsButton extends IComponent {
  onClick: React.MouseEventHandler;
}

export const SettingsButton = ({ onClick, children }: ISettingsButton) => {
  return (
    <button
      onClick={onClick}
      className="min-w-20 grow rounded-md border border-zinc-300 bg-zinc-200 py-2 dark:border-zinc-700 dark:bg-zinc-900 sm:grow-0"
    >
      {children}
    </button>
  );
};
