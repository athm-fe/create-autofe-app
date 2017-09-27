'use strict';

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
 */
module.exports = function buildPreset(context, options) {
  const transpileTargets = (options && options.targets) ||
    buildTargets(options || {});

  return {
    presets: [
      require('babel-preset-env').default(null, {
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
          // Don't polyfill generators
          'transform-regenerator',
        ],
      }),
      // require('babel-preset-react'),
    ],
    plugins: [
      // https://github.com/babel/babel/issues/1065
      [require('babel-plugin-transform-es2015-template-literals'), {
        spec: true,
      }],
      // use simple assignments instead of Object.defineProperty.
      [require('babel-plugin-transform-es2015-computed-properties'), {
        loose: true,
      }],
      // Transforms class properties, property and static
      require('babel-plugin-transform-class-properties'),
      // For classes that have supers, the super class won’t resolve correctly.(IE10 and below)
      // so enable loose mode
      [require('babel-plugin-transform-es2015-classes'), {
        loose: true,
      }],
      // Adds syntax support for import()
      require('babel-plugin-syntax-dynamic-import'),
      // object rest and spread
      [require('babel-plugin-transform-object-rest-spread'), {
        // Do not use `Object.assign` directly
        useBuiltIns: false,
      }],

      // Async generator functions are converted to generators
      require('babel-plugin-transform-async-generator-functions'),

      // it lets you create code that isn’t a syntax error in ES3
      // even though the functions might not exist, the file would parse in ES3
      // without that transform, the whole file would crap out
      require('babel-plugin-transform-es5-property-mutators'),
      // Reserved words as property names, for <=IE8
      require('babel-plugin-transform-es3-property-literals'),
      // Reserved words as property names, for <=IE8
      require('babel-plugin-transform-es3-member-expression-literals'),

      // https://babeljs.io/docs/plugins/transform-jscript/
      // https://kangax.github.io/nfe/#jscript-bugs
      // TODO 这个有 Bug，https://github.com/babel/babel/issues/6040
      // 'transform-jscript',
    ],
  };
};
