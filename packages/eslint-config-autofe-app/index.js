'use strict';
const restrictedGlobals = require('eslint-restricted-globals');

module.exports = {
  extends: [
    'eslint:recommended',
  ],
  plugins: [
    'import',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true,
    amd: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    'no-restricted-globals': ['error', 'isFinite', 'isNaN'].concat(restrictedGlobals),
    "no-console": "warn",
  },
};
