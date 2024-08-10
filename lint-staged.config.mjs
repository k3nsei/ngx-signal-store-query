/**
 * @see https://www.npmjs.com/package/lint-staged
 */
const config = {
  '.husky/!(_){/**,}': 'prettier --write --parser sh',
  '*.{ts,js,mjs,cjs,json,html,css,scss,md,yml,yaml}': 'prettier --write --ignore-unknown',
  '*.{ts,html}': 'eslint --fix',
};

export default config;
