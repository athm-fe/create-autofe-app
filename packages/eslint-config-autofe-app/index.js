const customExtends = [
  './rules/best-practices',
  './rules/errors',
  './rules/node',
  './rules/style',
  './rules/variables',
  './rules/es6',
  './rules/imports',
].map(require.resolve);

// TODO: vue, react, jsx-a11y, react-hooks
// TODO: use https://github.com/AlloyTeam/eslint-config-alloy

module.exports = {
  extends: [
    // 'eslint:recommended',
  ].concat(customExtends),
  env: {
    browser: true,
    commonjs: true,
    amd: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  // NOTE: When adding rules here, you need to make sure they are compatible with
  // `typescript-eslint`, as some rules such as `no-array-constructor` aren't compatible.
  rules: {
    strict: 'off',
  },
};
