import { createContext } from 'react';
import { IComponent } from '../IComponent';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { STORAGE_KEYS_DARKMODE } from '../../config';
import { TDarkModeContext } from '../../types';

export const ThemeContext = createContext<TDarkModeContext>({
  dark: true,
  toggleDark: () => {},
});

export const ThemeProvider = ({ children }: IComponent) => {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>(
    true,
    STORAGE_KEYS_DARKMODE
  );

  const contextValue: TDarkModeContext = {
    dark: darkMode,
    toggleDark: () => setDarkMode((prevDark) => !prevDark),
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={darkMode ? 'dark' : ''}>
        <div className="text-black dark:text-white">{children}</div>
      </div>
    </ThemeContext.Provider>
  );
};
