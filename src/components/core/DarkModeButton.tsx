import { IButton } from './Button';
import { useTheme } from './ThemeContext';

export const DarkModeButton = ({ className }: IButton) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button aria-label="Dark Mode" onClick={toggleTheme}>
      <i
        className={`${theme === 'dark' ? 'bi-moon' : 'bi-sun'} ${className}`}
      />
    </button>
  );
};
