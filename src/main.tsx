import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';

import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { AnalyticsProvider } from './components/core/AnalyticsProvider';
import { NotificationProvider } from './components/core/NotificationProvider';
import { AppNotification } from './components/core/AppNotification';
import { ThemeProvider } from './components/core/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AnalyticsProvider>
      <ThemeProvider>
        <NotificationProvider>
          <AppNotification />
          <RouterProvider router={router} />
        </NotificationProvider>
      </ThemeProvider>
    </AnalyticsProvider>
  </React.StrictMode>
);
