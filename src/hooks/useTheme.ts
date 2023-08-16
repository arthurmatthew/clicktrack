import { ThemeContext } from '../components/core/ThemeProvider';
import { useContext } from 'react';

export const useTheme = () => {
  const { dark, toggleDark } = useContext(ThemeContext);
  return { dark, toggleDark };
};
