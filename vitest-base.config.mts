/// <reference types="vitest" />

import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: path.resolve(import.meta.dirname, 'node_modules/.vite'),
  define: {
    'import.meta.vitest': true,
  },
  test: {
    environment: 'jsdom',
    pool: 'threads',
    globals: true,
    passWithNoTests: true,
    watch: false,
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    reporters: process.env['GITHUB_ACTIONS'] ? ['default', 'github-actions'] : ['default'],
    coverage: {
      enabled: !!process.env['GITHUB_ACTIONS'],
    },
  },
});
