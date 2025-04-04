// @ts-check
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import angularEslint from 'angular-eslint';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier/recommended';

const config = tsEslint.config(
  {
    ignores: ['.angular/', 'coverage/', 'dist/', 'tmp/', 'out-tsc/', 'bazel-out/'],
  },
  ...tsEslint.config({
    files: ['**/*.?(c|m)ts?(x)'],
    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.recommended,
      ...tsEslint.configs.stylistic,
      ...angularEslint.configs.tsRecommended,
      pluginPrettier,
      pluginImport.flatConfigs.recommended,
    ],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
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
      'import/named': 'off',
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
  }),
  {
    files: ['**/*.html'],
    extends: [...angularEslint.configs.templateRecommended, ...angularEslint.configs.templateAccessibility],
    rules: {},
  },
);

export default config;
