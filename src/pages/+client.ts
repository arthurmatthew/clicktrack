import * as Sentry from '@sentry/react';
import { inject } from '@vercel/analytics';

inject();
Sentry.init({
  dsn: 'https://519e7759711c52e07ab5d25cb1da7886@o4510334017208320.ingest.us.sentry.io/4510334018846720',
  sendDefaultPii: true,
});
