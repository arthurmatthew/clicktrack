import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Layout from './layouts/Layout';
import Index from './pages/index';
import NotFound from './components/Error';
import App from './pages/app';
import Login from './pages/users.login';
import Register from './pages/users.register';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      errorElement={
        <Layout>
          <NotFound />
        </Layout>
      }
    >
      <Route path="/" element={<Index />} />
      <Route path="/app" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
