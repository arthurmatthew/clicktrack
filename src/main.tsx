import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';

import { RouterProvider } from 'react-router';
import { router } from './router';
import { NotificationProvider } from './components/core/NotificationProvider';
import { AppNotification } from './components/core/AppNotification';
import { ThemeProvider } from './components/core/ThemeProvider';
import { UserProvider } from './components/core/UserProvider';
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider>
        <NotificationProvider>
          <Analytics />
          <AppNotification />
          <RouterProvider router={router} />
        </NotificationProvider>
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>
);
