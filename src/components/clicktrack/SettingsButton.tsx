import { IComponent } from '../IComponent';

interface ISettingsButton extends IComponent {
  onClick: React.MouseEventHandler;
  disabled?: boolean;
}

export const SettingsButton = ({
  onClick,
  children,
  disabled,
}: ISettingsButton) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="min-w-20 grow rounded-md border border-zinc-300 bg-zinc-200 py-2 sm:grow-0 dark:border-zinc-700 dark:bg-zinc-900"
    >
      {children}
    </button>
  );
};
