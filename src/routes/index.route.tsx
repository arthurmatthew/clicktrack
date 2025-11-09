import { Route } from 'react-router';
import { Index } from '../pages/index';
import Layout from '../components/index/Layout';
import NotFound from '../pages/not-found';
import { WriteupIndex } from '../pages/writeup';

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
    <Route path="/writeup" element={<WriteupIndex />} />
  </Route>
);
