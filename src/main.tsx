import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';

import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { AnalyticsProvider } from './components/core/AnalyticsProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AnalyticsProvider>
      <RouterProvider router={router} />
    </AnalyticsProvider>
  </React.StrictMode>
);
