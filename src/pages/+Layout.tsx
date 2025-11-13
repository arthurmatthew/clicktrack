import { ReactNode } from 'react';
import { AppNotification } from '../components/core/AppNotification';
import { NotificationProvider } from '../components/core/NotificationProvider';
import React from 'react';

import '../main.css';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <React.StrictMode>
      <div className="text-black dark:text-white">
        <NotificationProvider>
          <AppNotification />
          {children}
        </NotificationProvider>
      </div>
    </React.StrictMode>
  );
};
