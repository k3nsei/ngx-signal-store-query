// @ts-check
import tsEslint from 'typescript-eslint';

import rootConfig from '../../eslint.config.mjs';

const config = tsEslint.config(...rootConfig, {
  files: ['*.ts', '**/*.ts'],
  rules: {},
});

export default config;
