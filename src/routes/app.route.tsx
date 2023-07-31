import React from 'react';
import { Route } from 'react-router-dom';

const AppLayout = React.lazy(() => import('../components/layouts/app/Layout'));
const AppIndex = React.lazy(() => import('../pages/app/index'));
const ClicktracksIndex = React.lazy(() => import('../pages/app/clicktracks'));
const ClicktrackPage = React.lazy(
  () => import('../pages/app/clicktracks/clicktrack')
);
const NotFound = React.lazy(() => import('../pages/NotFound'));

export const AppRoute = (
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
    <Route path="/app/clicktracks" element={<ClicktracksIndex />} />
    <Route path="/app/clicktracks/:id/*" element={<ClicktrackPage />} />
  </Route>
);
