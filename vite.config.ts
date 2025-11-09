import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCompression(), sentryVitePlugin({
    org: "clicktrack",
    project: "javascript-react"
  })],

  build: {
    sourcemap: true
  }
});