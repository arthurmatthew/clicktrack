import React from 'react';
import { Route } from 'react-router-dom';
import ClicktrackPage from '../pages/app/clicktracks/clicktrack';
import { AccountIndex } from '../pages/app/account';
import { LibraryIndex } from '../pages/app/library';
import { AccountRegister } from '../pages/app/account/register';
import { AccountLogin } from '../pages/app/account/login';
import { VerifyIndex } from '../pages/app/account/verify';

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
    <Route path="/app/clicktracks/:id" element={<ClicktrackPage />} />
    <Route path="/app/account/" element={<AccountIndex />} />
    <Route path="/app/account/register" element={<AccountRegister />} />
    <Route path="/app/account/login" element={<AccountLogin />} />
    <Route path="/app/account/verify" element={<VerifyIndex />} />
    <Route path="/app/library/" element={<LibraryIndex />} />
  </Route>
);
