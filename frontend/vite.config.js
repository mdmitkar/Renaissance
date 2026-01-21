import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('vite-plugin-prerender');
const prerender = pkg.default || pkg;
const PuppeteerRenderer = pkg.PuppeteerRenderer;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: [
        '/',
        '/about',
        '/life',
        '/reviews',
        '/gallery',
        '/inside-renaissance',
        '/admission',
        '/contact'
      ],
      renderer: new PuppeteerRenderer({
        renderAfterElementExists: '#root div',
        headless: true,
      }),
    }),
  ],
})
