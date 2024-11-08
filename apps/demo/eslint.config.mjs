// @ts-check
import tsEslint from 'typescript-eslint';

import rootConfig from '../../eslint.config.mjs';

const config = tsEslint.config(
  ...rootConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'ssq',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'ssq',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    rules: {},
  },
);

export default config;
