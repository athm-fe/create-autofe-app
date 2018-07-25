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
    node: true,
    commonjs: true,
    amd: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    strict: 'off',
  },
};
