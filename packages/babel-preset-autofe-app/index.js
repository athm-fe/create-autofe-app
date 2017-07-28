module.exports = {
  presets: [
    ['env', {
      target: {
        // React parses on ie 9, so we should too
        // ie: '9',
        ie: '7',
        // We currently minify with uglify
        // Remove after https://github.com/mishoo/UglifyJS2/issues/448
        // uglify: true,
      },
      // Do not transform modules to CJS
      // use webpack modules solution
      modules: false,
      // Disable polyfill transforms
      // useBuiltIns: false,
      // transform-es2015-classes
      // transform-es2015-computed-properties
      // transform-es2015-for-of
      // transform-es2015-spread
      // transform-es2015-template-literals
      // transform-es2015-modules-commonjs
      // loose: true,
      // transform-es2015-arrow-functions
      // transform-es2015-template-literals
      // spec: true,
    }],
  ],
  plugins: [
    // for <=IE8
    // var foo = {
    //   default: function () {}
    // };
    // ---->
    // var foo = {
    //   'default': function () {}
    // };
    'transform-es3-property-literals',
    // for <=IE8
    // foo.default; ----> foo['default'];
    'transform-es3-member-expression-literals',
    // Adds syntax support for import()
    // import() now is in stage
    'syntax-dynamic-import',
    // object rest and spread
    // TODO useBuiltIns: true
    // use Object.assign directly, instead of Babel's extends helper.
    // Note that this assumes `Object.assign` is available.
    'transform-object-rest-spread',
    // Transforms class properties, property and static
    // class { handleClick = () => { } }
    // TODO spec: true
    'transform-class-properties',
    // Polyfills the runtime needed for async/await and generators
    // TODO transform-runtime
    // helpers: false,
    // polyfill: false,
    // regenerator: true,
    // function* () { yield 42; yield 43; }
    // TODO transform-regenerator,
    // Async functions are converted to generators by babel-preset-env
    // async: false

    // Compiles import() to a deferred require()
    // 应该是没必要的，不过也研究一下吧
    // dynamic-import-node,
  ],
};
