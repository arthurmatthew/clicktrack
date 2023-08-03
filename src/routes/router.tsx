import {
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { AppRoute } from './app.route';
import { IndexRoute } from './index.route';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {IndexRoute}
      {AppRoute}
    </>
  )
);
