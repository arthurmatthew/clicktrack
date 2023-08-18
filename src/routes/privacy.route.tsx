import { Route } from 'react-router-dom';
import { PrivacyIndex } from '../pages/privacy';
import React from 'react';

const Layout = React.lazy(() => import('../components/index/Layout'));
const NotFound = React.lazy(() => import('../pages/not-found'));

export const PrivacyRoute = (
  <Route
    path="/"
    element={<Layout />}
    errorElement={
      <Layout>
        <NotFound />
      </Layout>
    }
  >
    <Route path="/privacy" element={<PrivacyIndex />} />
  </Route>
);
