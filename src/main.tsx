import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import { AppRoute } from './routes/app.route';
import { IndexRoute } from './routes/index.route';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {IndexRoute}
      {AppRoute}
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
