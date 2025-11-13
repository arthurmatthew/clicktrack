import { ReactNode } from 'react';
import { AppNotification } from '../components/core/AppNotification';
import { NotificationProvider } from '../components/core/NotificationProvider';
import React from 'react';

import '../main.css';
import { ThemeProvider } from '../components/core/ThemeContext';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <div className="text-black dark:text-white">
          <NotificationProvider>
            <AppNotification />
            {children}
          </NotificationProvider>
        </div>
      </ThemeProvider>
    </React.StrictMode>
  );
};
