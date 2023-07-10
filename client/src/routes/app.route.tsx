import React from 'react';
import { Route } from 'react-router-dom';

const AppLayout = React.lazy(() => import('../components/layouts/app/Layout'));
const AppIndex = React.lazy(() => import('../pages/app/index'));
const MetronomesIndex = React.lazy(() => import('../pages/app/metronomes'));
const MetronomePage = React.lazy(
  () => import('../pages/app/metronomes/metronome')
);
const NotFound = React.lazy(() => import('../pages/NotFound'));

const AppRoute = (
  <Route
    path="/app"
    element={<AppLayout />}
    errorElement={
      <AppLayout>
        <NotFound />
      </AppLayout>
    }
  >
    <Route path="/app/" element={<AppIndex />} />
    <Route path="/app/metronomes" element={<MetronomesIndex />} />
    <Route path="/app/metronomes/:id/*" element={<MetronomePage />} />
  </Route>
);

export default AppRoute;
