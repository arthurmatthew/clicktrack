import { IComponent } from '../IComponent';

interface ISettingsButton extends IComponent {
  onClick: React.MouseEventHandler;
}

export const SettingsButton = ({ onClick, children }: ISettingsButton) => {
  return (
    <button
      onClick={onClick}
      className="min-w-[5rem] flex-grow rounded-md border-[1px] border-zinc-300 bg-zinc-200 py-2 dark:border-zinc-700 dark:bg-zinc-900 sm:flex-grow-0"
    >
      {children}
    </button>
  );
};
