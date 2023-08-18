import { Route } from 'react-router-dom';
import { TermsIndex } from '../pages/terms';
import React from 'react';

const Layout = React.lazy(() => import('../components/index/Layout'));
const NotFound = React.lazy(() => import('../pages/not-found'));

export const TermsRoute = (
  <Route
    path="/"
    element={<Layout />}
    errorElement={
      <Layout>
        <NotFound />
      </Layout>
    }
  >
    <Route path="/terms" element={<TermsIndex />} />
  </Route>
);
