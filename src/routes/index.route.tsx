import { Route } from 'react-router';
import { Index } from '../pages/index';
import Layout from '../components/index/Layout';
import NotFound from '../pages/not-found';

export const IndexRoute = (
  <Route
    element={<Layout />}
    errorElement={
      <Layout>
        <NotFound />
      </Layout>
    }
    path="/"
  >
    <Route index element={<Index />} />
  </Route>
);
