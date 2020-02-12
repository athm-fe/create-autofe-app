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
// TODO: remove eslint-plugin-import
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
      // Notice: 这里不允许使用 extends
      // Unexpected top-level property "overrides[0].extends".
      // extends: [
      //   // 'eslint:recommended',
      //   'plugin:@typescript-eslint/eslint-recommended',
      //   'plugin:@typescript-eslint/recommended',
      // ],
      // If adding a typescript-eslint version of an existing ESLint rule,
      // make sure to disable the ESLint rule here.
      rules: {
        // from 'plugin:@typescript-eslint/eslint-recommended'
        // --------------
        // Checked by Typescript - ts(2378)
        'getter-return': 'off',
        // Checked by Typescript - ts(2300)
        'no-dupe-args': 'off',
        // Checked by Typescript - ts(1117)
        'no-dupe-keys': 'off',
        // Checked by Typescript - ts(7027)
        'no-unreachable': 'off',
        // Checked by Typescript - ts(2367)
        'valid-typeof': 'off',
        // Checked by Typescript - ts(2588)
        'no-const-assign': 'off',
        // Checked by Typescript - ts(2588)
        'no-new-symbol': 'off',
        // Checked by Typescript - ts(2376)
        'no-this-before-super': 'off',
        // This is checked by Typescript using the option `strictNullChecks`.
        'no-undef': 'off',
        // This is already checked by Typescript.
        'no-dupe-class-members': 'off',
        // This is already checked by Typescript.
        'no-redeclare': 'off',


        // from 'plugin:@typescript-eslint/recommended'
        // --------------
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/ban-ts-ignore": "error",
        "@typescript-eslint/ban-types": "error",
        "camelcase": "off",
        "@typescript-eslint/camelcase": "error",
        "@typescript-eslint/class-name-casing": "error",
        "@typescript-eslint/consistent-type-assertions": "error",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/interface-name-prefix": "error",
        "@typescript-eslint/member-delimiter-style": "error",
        "no-array-constructor": "off",
        "@typescript-eslint/no-array-constructor": "error",
        "no-empty-function": "off",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-inferrable-types": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-non-null-assertion": "warn",
        "@typescript-eslint/no-this-alias": "error",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": "error",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/triple-slash-reference": "error",
        "@typescript-eslint/type-annotation-spacing": "error",


        // others
        // --------------

        // Add TypeScript specific rules (and turn off ESLint equivalents)
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true,
          },
        ],
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'warn',
      },
    },
  ],
};
