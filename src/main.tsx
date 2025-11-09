import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import * as Sentry from '@sentry/react';

import { RouterProvider } from 'react-router';
import { router } from './router';
import { NotificationProvider } from './components/core/NotificationProvider';
import { AppNotification } from './components/core/AppNotification';
import { ThemeProvider } from './components/core/ThemeProvider';
import { UserProvider } from './components/core/UserProvider';
import { Analytics } from '@vercel/analytics/react';

Sentry.init({
  dsn: 'https://519e7759711c52e07ab5d25cb1da7886@o4510334017208320.ingest.us.sentry.io/4510334018846720',
  sendDefaultPii: true,
});

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
