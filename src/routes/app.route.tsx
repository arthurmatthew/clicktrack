import { Route } from 'react-router';
import ClicktrackPage from '../pages/app/clicktracks/clicktrack';
import { AccountIndex } from '../pages/app/account';
import { LibraryIndex } from '../pages/app/library';
import { RegisterIndex } from '../pages/app/account/register';
import { LoginIndex } from '../pages/app/account/login';
import { VerifyIndex } from '../pages/app/account/verify';
import { ResetIndex } from '../pages/app/account/reset';
import AppLayout from '../components/app/Layout';
import AppIndex from '../pages/app';
import ClicktracksIndex from '../pages/app/clicktracks';
import NotFound from '../pages/not-found';
// import { PremiumIndex } from '../pages/app/premium';

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
    <Route path="/app/account/register" element={<RegisterIndex />} />
    <Route path="/app/account/login" element={<LoginIndex />} />
    <Route path="/app/account/verify" element={<VerifyIndex />} />
    <Route path="/app/account/reset" element={<ResetIndex />} />
    <Route path="/app/library/" element={<LibraryIndex />} />
    {/*<Route path="/app/premium/" element={<PremiumIndex />} />*/}
  </Route>
);
