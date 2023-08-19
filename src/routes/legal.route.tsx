import { Route } from 'react-router-dom';
import { TermsIndex } from '../pages/legal/terms';
import React from 'react';

const Layout = React.lazy(() => import('../components/index/Layout'));
const NotFound = React.lazy(() => import('../pages/not-found'));

export const LegalRoute = (
  <Route
    path="/"
    element={<Layout />}
    errorElement={
      <Layout>
        <NotFound />
      </Layout>
    }
  >
    <Route path="/legal/terms" element={<TermsIndex />} />
    <Route path="/legal/privacy" element={<TermsIndex />} />
  </Route>
);
