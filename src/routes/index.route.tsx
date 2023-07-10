import { Route } from 'react-router-dom';
import React from 'react';

const Register = React.lazy(() => import('../pages/index/register'));
const Login = React.lazy(() => import('../pages/index/login'));
const Layout = React.lazy(() => import('../components/layouts/index/Layout'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

import Index from '../pages/index/index';

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
