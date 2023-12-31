import { Route } from 'react-router-dom';
import React from 'react';

const Layout = React.lazy(() => import('../components/index/Layout'));
const NotFound = React.lazy(() => import('../pages/not-found'));

import { Index } from '../pages/index';

export const IndexRoute = (
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
  </Route>
);
