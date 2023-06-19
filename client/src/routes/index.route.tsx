import { Route } from 'react-router-dom';
import React from 'react';

const Register = React.lazy(() => import('../pages/register'));
const Login = React.lazy(() => import('../pages/login'));
const Layout = React.lazy(() => import('../layouts/Layout'));
const NotFound = React.lazy(() => import('../components/routes/NotFound'));

import Index from '../pages';

const IndexRoute = (
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
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
  </Route>
);

export default IndexRoute;
