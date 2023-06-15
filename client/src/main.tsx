import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

const NotFound = lazy(() => import('./components/NotFound'));
const App = lazy(() => import('./pages/app'));
const Login = lazy(() => import('./pages/login'));
const Register = lazy(() => import('./pages/register'));

import Layout from './layouts/Layout';
import Index from './pages/index';

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
