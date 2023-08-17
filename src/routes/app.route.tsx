import React from 'react';
import { Route } from 'react-router-dom';
import { getClicktrackFromLocalStorageByID } from '../utils/getClicktrackFromLocalStorageByID';
import ClicktrackPage from '../pages/app/clicktracks/clicktrack';

const AppLayout = React.lazy(() => import('../components/app/Layout'));
const AppIndex = React.lazy(() => import('../pages/app/index'));
const ClicktracksIndex = React.lazy(() => import('../pages/app/clicktracks'));
const NotFound = React.lazy(() => import('../pages/not-found'));

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
    <Route
      path="/app/clicktracks/:id/*"
      element={<ClicktrackPage />}
      loader={async ({ params }) => {
        return getClicktrackFromLocalStorageByID(params.id);
      }}
    />
  </Route>
);
