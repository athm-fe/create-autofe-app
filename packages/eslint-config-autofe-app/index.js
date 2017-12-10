'use strict';

const customExtends = [
  './rules/best-practices',
  './rules/errors',
  './rules/node',
  './rules/style',
  './rules/variables',
  './rules/es6',
  './rules/imports',
].map(require.resolve);

module.exports = {
  extends: [
    // 'eslint:recommended',
  ].concat(customExtends),
  env: {
    browser: true,
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
    strict: 'off',
  },
};
