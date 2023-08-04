import { IComponent } from '../IComponent';

interface IButton extends IComponent {
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
}

export const Button = ({ children, className, onClick, disabled }: IButton) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={'rounded-sm px-10 py-2 ' + className}
    >
      {children}
    </button>
  );
};
