module.exports = {
  root: true,
  extends: [
    'eslint-config-autofe-app',
    'eslint-config-autofe-app/typescript',
  ],
  globals: {
    AHAPP: 'readonly',
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
