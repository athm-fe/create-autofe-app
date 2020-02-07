module.exports = {
  root: true,
  extends: [
    'eslint-config-autofe-app',
  ],
  globals: {
    AHAPP: 'readonly',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },

  // for typescript
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },

        // typescript-eslint specific options
        warnOnUnsupportedTypeScriptVersion: true,
      },
      plugins: ['@typescript-eslint'],
      // extends: [
      //   // 'eslint:recommended',
      //   'plugin:@typescript-eslint/eslint-recommended',
      //   'plugin:@typescript-eslint/recommended',
      // ],
    },
  ],
};
