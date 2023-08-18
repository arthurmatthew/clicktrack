import {
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { AppRoute } from './routes/app.route';
import { IndexRoute } from './routes/index.route';
import { PrivacyRoute } from './routes/privacy.route';
import { TermsRoute } from './routes/terms.route';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {IndexRoute}
      {AppRoute}
      {PrivacyRoute}
      {TermsRoute}
    </>
  )
);
