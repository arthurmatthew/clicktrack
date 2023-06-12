import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Index from './pages/index';
import NotFound from './components/Error';
import App from './pages/app';
import Login from './pages/users.login';
import Register from './pages/users.register';

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
  {
    path: '/users/login',
    element: <Login />,
  },
  {
    path: '/users/register',
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </React.StrictMode>
);
