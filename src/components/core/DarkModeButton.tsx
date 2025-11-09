import { IButton } from './Button';

interface IDarkModeButton extends IButton {
  dark: boolean;
}

export const DarkModeButton = ({
  dark,
  onClick,
  className,
}: IDarkModeButton) => {
  return (
    <button onClick={onClick}>
      <i className={`${dark ? 'bi-moon' : 'bi-sun'} ${className}`} />
    </button>
  );
};
