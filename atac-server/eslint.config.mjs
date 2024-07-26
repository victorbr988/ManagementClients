import globals from 'globals';
import tseslint from 'typescript-eslint';


export default [
  {files: ['**/*.{js,mjs,cjs,ts}']},
  {languageOptions: { globals: globals.node }},
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prefer-const': 'error',
      'semi': 'error',
      'array-callback-return': 'error',
      'no-irregular-whitespace': 'error',
      'no-unreachable': 'error',
      'no-unused-private-class-members': 'error',
      'no-useless-constructor': 'error',
      'no-use-before-define': 'error',
      'prefer-destructuring': 'error',
      'quotes': ['error', 'single', { avoidEscape: true }],
    }
  }
];