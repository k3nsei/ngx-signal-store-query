/// <reference types="vitest" />

import viteAngular from '@analogjs/vite-plugin-angular';
import path from 'node:path';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import { mergeConfig } from 'vitest/config';

import vitestBaseConfig from '../../vitest-base.config.mjs';

export default mergeConfig(vitestBaseConfig, {
  root: import.meta.dirname,
  plugins: [
    viteAngular(),
    viteTsConfigPaths({
      projects: [
        path.resolve(import.meta.dirname, '../../tsconfig.json'),
        path.resolve(import.meta.dirname, 'tsconfig.spec.json'),
      ],
    }),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  // plugins: [
  //   viteTsConfigPaths({
  //     projects: [
  //       path.resolve(import.meta.dirname, '../../tsconfig.json'),
  //       path.resolve(import.meta.dirname, 'tsconfig.spec.json'),
  //     ],
  //   }),
  // ],
  // },
  test: {
    name: 'demo',
    watch: true,
    setupFiles: ['src/test-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['clover', 'lcovonly', 'text-summary'],
      reportsDirectory: path.resolve(import.meta.dirname, '../../coverage/demo'),
    },
  },
});
