import React from 'react';
import { Route } from 'react-router-dom';
import Project from '../pages/app/metronome';

const AppLayout = React.lazy(() => import('../layouts/AppLayout'));
const AppIndex = React.lazy(() => import('../pages/app/index'));
const ViewProjects = React.lazy(() => import('../pages/app/view-metronomes'));
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
    <Route path="/app/metronome" element={<AppIndex />} />
    <Route path="/app/metronome/:id" element={<Project />} />
    <Route path="/app/view-metronomes" element={<ViewProjects />} />
  </Route>
);

export default AppRoute;
