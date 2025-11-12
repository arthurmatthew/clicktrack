import { Analytics } from '@vercel/analytics/react';
import { ReactNode } from 'react';
import { AppNotification } from '../components/core/AppNotification';
import { NotificationProvider } from '../components/core/NotificationProvider';
import React from 'react';

import '../main.css';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <React.StrictMode>
      <NotificationProvider>
        <Analytics />
        <AppNotification />
        <div className="text-white">{children}</div>
      </NotificationProvider>
    </React.StrictMode>
  );
};
