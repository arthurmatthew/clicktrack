import { Route } from 'react-router';
import { Index } from '../pages/index';
import Layout from '../components/app/Layout';
import NotFound from '../pages/not-found';

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
