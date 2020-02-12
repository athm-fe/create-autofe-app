module.exports = {
  root: true,
  extends: [
    'eslint-config-autofe-app',
  ],
  globals: {
    AHAPP: 'readonly',
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
