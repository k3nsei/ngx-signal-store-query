/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: true,
  arrowParens: 'always',
  proseWrap: 'preserve',
  objectWrap: 'preserve',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'strict',
  experimentalOperatorPosition: 'start',
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-sh'],
};

export default config;
