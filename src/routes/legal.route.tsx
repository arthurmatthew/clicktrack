import { Route } from 'react-router';
import { TermsIndex } from '../pages/legal/terms';
import Layout from '../components/app/Layout';
import NotFound from '../pages/not-found';

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
