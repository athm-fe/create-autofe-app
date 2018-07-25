// Use all plugins
const defaultTargets = {
  // React parses on ie 9, so we should too
  ie: '9',
};

function buildTargets(options) {
  return Object.assign({}, defaultTargets, options.additionalTargets);
}

/**
 * @param options.targets 重新指定 targets
 * @param options.additionalTargets 合并 defaultTargets 和 additionalTargets
 * @param options.debug 开启 babel-preset-env 的调试模式
 * @param options.exclude 去掉 babel-preset-env 的部分插件
 */
module.exports = function buildPreset(context, options = {}) {
  const transpileTargets = (options && options.targets) ||
    buildTargets(options || {});

  const debug = (options && typeof options.debug === 'boolean') ? !!options.debug : false;

  const excludeList = options.exclude || [];

  return {
    presets: [
      require('babel-preset-env').default(null, {
        // Set the debug
        debug,
        // Set the targets
        targets: transpileTargets,
        // Do not transform modules to CJS
        // use webpack modules solution
        modules: false,
        // Disable polyfill transforms
        useBuiltIns: false,
        // disable some transform
        exclude: [
          // Need set spec for this plugin
          'transform-es2015-template-literals',
          // Need set loose for this plugin
          'transform-es2015-computed-properties',
          // Need set loose for this plugin
          'transform-es2015-classes',
          // Need custom config for this plugin
          'transform-regenerator',
          ...excludeList,
        ],
      }),
      // require('babel-preset-react'),
    ],
    plugins: [
      // [Stage-2 to Stage-3] Transforms class properties, property and static
      require('babel-plugin-transform-class-properties'),

      // [Stage-2 to Stage-3] Adds syntax support for import()
      require('babel-plugin-syntax-dynamic-import'),

      // [Stage-3 to ES2018] object rest and spread
      [require('babel-plugin-transform-object-rest-spread'), {
        // Do not use `Object.assign` directly
        useBuiltIns: false,
      }],

      // [Stage-3 to ES2018] Async generator functions are converted to generators
      require('babel-plugin-transform-async-generator-functions'),

      // https://github.com/babel/babel/issues/1065
      [require('babel-plugin-transform-es2015-template-literals'), {
        spec: true,
      }],

      // use simple assignments instead of Object.defineProperty.
      [require('babel-plugin-transform-es2015-computed-properties'), {
        loose: true,
      }],

      // For classes that have supers, the super class won’t resolve correctly.(IE10 and below)
      // so enable loose mode
      [require('babel-plugin-transform-es2015-classes'), {
        loose: true,
      }],

      // regenerator config
      [require('babel-plugin-transform-regenerator'), {
        // Async generator functions are converted to generators by
        // babel-plugin-transform-async-generator-functions
        asyncGenerators: false,
        // Async functions are converted to generators by babel-preset-env
        // which has babel-plugin-transform-async-to-generator
        async: false,
        // Generators are converted to regeneratorRuntime
        generators: true,
      }],

      // Polyfills the runtime needed for async/await and generators
      [require('babel-plugin-transform-runtime'), {
        helpers: false,
        polyfill: false,
        regenerator: true,
      }],

      // it lets you create code that isn’t a syntax error in ES3
      // even though the functions might not exist, the file would parse in ES3
      // without that transform, the whole file would crap out
      require('babel-plugin-transform-es5-property-mutators'),
      // Reserved words as property names, for <=IE8
      require('babel-plugin-transform-es3-property-literals'),
      // Reserved words as property names, for <=IE8
      require('babel-plugin-transform-es3-member-expression-literals'),
    ],
  };
};
