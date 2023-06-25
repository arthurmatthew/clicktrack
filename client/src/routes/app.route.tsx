import React from 'react';
import { Route } from 'react-router-dom';
import Metronome from '../pages/app/metronome';

const AppLayout = React.lazy(() => import('../layouts/AppLayout'));
const AppIndex = React.lazy(() => import('../pages/app/index'));
const Metronomes = React.lazy(() => import('../pages/app/metronomes'));
const NotFound = React.lazy(() => import('../components/routes/NotFound'));

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
    <Route path="/app/metronomes" element={<Metronomes />} />
    <Route path="/app/metronomes/:id" element={<Metronome />} />
  </Route>
);

export default AppRoute;
