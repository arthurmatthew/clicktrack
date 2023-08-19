import {
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { AppRoute } from './routes/app.route';
import { IndexRoute } from './routes/index.route';
import { LegalRoute } from './routes/legal.route';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {IndexRoute}
      {AppRoute}
      {LegalRoute}
    </>
  )
);
