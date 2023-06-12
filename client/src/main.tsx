import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Index from './pages/index';
import NotFound from './components/Error';
import App from './pages/app';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    errorElement: <NotFound />,
  },
  {
    path: '/app',
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </React.StrictMode>
);
