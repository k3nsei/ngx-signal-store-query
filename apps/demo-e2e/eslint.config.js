// @ts-check
const tsEslint = require('typescript-eslint');
const rootConfig = require('../../eslint.config.js');

module.exports = tsEslint.config(...rootConfig, {
  files: ['*.ts', '**/*.ts'],
  rules: {},
});
