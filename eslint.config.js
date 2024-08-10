// @ts-check
const eslint = require('@eslint/js');
const tsEslint = require('typescript-eslint');
const angularEslint = require('angular-eslint');
const pluginImport = require('eslint-plugin-import');
const pluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = tsEslint.config(
  {
    ignores: ['.angular/', 'coverage/', 'dist/', 'tmp/', 'out-tsc/', 'bazel-out/'],
  },
  {
    files: ['**/*.ts'],
    plugins: {
      import: { rules: pluginImport.rules },
    },
    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.recommended,
      ...tsEslint.configs.stylistic,
      ...angularEslint.configs.tsRecommended,
      pluginPrettierRecommended,
    ],
    processor: angularEslint.processInlineTemplates,
    rules: {
      /**
       * TypeScript Rules
       */
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public',
          },
        },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          varsIgnorePattern: '^(?:[iI]gnore|_)',
          argsIgnorePattern: '^(?:[iI]gnore|_)',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^(?:[iI]gnore|_)',
          destructuredArrayIgnorePattern: '^(?:[iI]gnore|_)',
          ignoreRestSiblings: true,
        },
      ],
      /**
       * Import/Export Rules
       */
      'import/first': 'error',
      'import/no-unresolved': 'off',
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external', 'unknown'], 'internal', 'parent', ['sibling', 'index'], 'object', 'type'],
          pathGroups: [
            {
              pattern: '@angular/!(cdk|cdk-*|material|material-*){/**,}',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@angular/{cdk,material}{-*,}{/**,}',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@ngx-mat-time-input/**',
              group: 'internal',
            },
            {
              pattern: 'ngx-mat-time-input',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          distinctGroup: true,
          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
          },
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          allowSeparatedGroups: true,
        },
      ],
      /**
       * Angular Rules
       */
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
    extends: [...angularEslint.configs.templateRecommended, ...angularEslint.configs.templateAccessibility],
    rules: {},
  },
);
