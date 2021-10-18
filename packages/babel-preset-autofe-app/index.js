const path = require('path');

/**
 * @param options.debug 开启 babel-preset-env 的调试模式
 * @param options.exclude 去掉 babel-preset-env 的部分插件
 */
module.exports = function buildPreset(api, options = {}) {
  const runtimePath = path.dirname(require.resolve('@babel/runtime/package.json'));
  const runtimeVersion = require('@babel/runtime/package.json').version;
  const {
    debug = false,
    targets,
    include = [],
    exclude = [],
    // 不管用哪一种，如果使用 async/await、generator 或者 import()，都需要自己添加 Promise 依赖
    // @babel/runtime 里的 API 需要的 Polyfills 可以被 usage 和 entry 自动处理
    useBuiltIns = false,
    forceAllTransforms,
    configPath,
    ignoreBrowserslistConfig,
    shippedProposals,
    // for @babel/plugin-transform-runtime
    helpers = true,
    absoluteRuntime = runtimePath,
  } = options;

  const presets = [
    [require('@babel/preset-env'), {
      // Outout the debug info
      debug,
      // Describes the environments
      targets,
      // Disable more spec compliant
      spec: false,
      // Disable loose for any plugins in this preset that allow them.
      loose: false,
      // use webpack modules solution
      modules: false,
      // An array of plugins to always include.
      include,
      // disable some transform
      exclude: [
        // 该插件导致正常 typeof 代码也变慢了
        'transform-typeof-symbol',
        ...exclude,
      ],
      // 默认不开启 Polyfills
      useBuiltIns,
      // 指定 corejs 版本
      corejs: useBuiltIns ? 3 : undefined,
      forceAllTransforms,
      configPath,
      ignoreBrowserslistConfig,
      shippedProposals,
    }],
  ];

  // 添加一些 preset-env 没有的插件
  const proposalPlugins = [


    
    // Stage 0
    // ==============
    // "@babel/plugin-proposal-function-bind",

    // Stage 1
    // ==============
    // "@babel/plugin-proposal-export-default-from",
    // "@babel/plugin-proposal-logical-assignment-operators",
    // "@babel/plugin-proposal-pipeline-operator"
    // "@babel/plugin-proposal-do-expressions"

    // Adds syntax support for optional chaining (?.)
    // start @babel/preset-env": "^7.15.8" 有此插件了
    // require('@babel/plugin-proposal-optional-chaining'),

    // Adds syntax support for default value using ?? operator
    // require('@babel/plugin-proposal-nullish-coalescing-operator'),
    //  end 
    
    // Stage 2
    // ==============
    // "@babel/plugin-proposal-function-sent"
    // "@babel/plugin-proposal-export-namespace-from"
    // "@babel/plugin-proposal-numeric-separator"
    // "@babel/plugin-proposal-throw-expressions"

    // comes before @babel/plugin-proposal-class-properties.
    // if legacy: true mode, @babel/plugin-proposal-class-properties must be used in loose mode
    // [require("@babel/plugin-proposal-decorators").default, {
    //   legacy: true,
    // }],

    // Stage 3
    // ==============
    // "@babel/plugin-syntax-import-meta"

    // TODO: 已经出现在 preset-env
    // "@babel/plugin-proposal-json-strings"

    // TODO: 已经出现在 preset-env
    // Adds syntax support for import()
    // start @babel/preset-env": "^7.15.8" 有此插件了
    // require('@babel/plugin-syntax-dynamic-import'),

    // Enable loose mode to use assignment instead of defineProperty
    [require('@babel/plugin-proposal-class-properties'), {
      loose: true,
    }],


  ];

  // 覆盖一些 preset-env 的插件
  const normalPlugins = [
    // TODO: preset-env 针对 modules 不为 false 或 targets node 时使用
    // TODO: 与 babel-plugin-dynamic-import-node 有点类似
    // "@babel/plugin-proposal-dynamic-import"

    // object rest and spread
    // use Babel's extends helper, and don't use Object.assign.
    // TODO: objectSpread 兼容性？看起来没问题，弱依赖 Object.getOwnPropertySymbols
    [require('@babel/plugin-proposal-object-rest-spread'), {
      loose: true,
      useBuiltIns: false,
    }],

    // Methods are defined on the class prototype with simple assignments instead of being defined
    // Please note that in loose mode class methods are enumerable.
    [require('@babel/plugin-transform-classes'), {
      loose: true,
    }],

    // use simple assignments instead of Object.defineProperty.
    [require('@babel/plugin-transform-computed-properties'), {
      loose: true,
    }],
  ];

  // 配置 @babel/plugin-transform-runtime 插件
  const runtimePlugins = [
    // A plugin that enables the re-use of Babel's injected helper code to save on codesize.
    [require('@babel/plugin-transform-runtime'), {
      // 关闭 Polyfills
      corejs: false,
      // 默认处理 Helpers，减少体积
      helpers,
      // 当 preset-env 不提供时，提供 regeneratorRuntime
      regenerator: useBuiltIns !== 'usage',
      // use webpack, don't run through @babel/plugin-transform-modules-commonjs
      useESModules: true,
      // 默认使用该 preset 已内置的 @babel/runtime
      absoluteRuntime,
      // use the version of the built-in @babel/runtime
      version: runtimeVersion,
    }],
  ];

  // ES5 + ES3 插件
  // preset-env 也内置了这些，但是要根据 targets 才决定是否使用
  // TODO: 下面这些太老了，可以考虑去掉
  const legacyPlugins = [
    // @babel/plugin-transform-reserved-words

    // it lets you create code that isn’t a syntax error in ES3
    // even though the functions might not exist, the file would parse in ES3
    // without that transform, the whole file would crap out
    require('@babel/plugin-transform-property-mutators'),

    // Reserved words as property names, for <=IE8
    require('@babel/plugin-transform-property-literals'),

    // Reserved words as property names, for <=IE8
    require('@babel/plugin-transform-member-expression-literals'),
  ];

  return {
    sourceType: 'unambiguous',
    presets,
    plugins: [
      ...proposalPlugins,
      ...normalPlugins,
      ...runtimePlugins,
      ...legacyPlugins,
    ],
  };
};

// a special flag to tell Creator to include @babel/runtime for transpilation
// otherwise the above `include` option won't take effect
process.env.CREATOR_TRANSPILE_BABEL_RUNTIME = true;
