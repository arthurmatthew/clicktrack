import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import tailwindcss from "@tailwindcss/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteCompression(), sentryVitePlugin({
    org: "clicktrack",
    project: "javascript-react"
  })],

  build: {
    sourcemap: true
  }
});