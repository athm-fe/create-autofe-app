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
};
