const path = require('path');

const validateBoolOption = (name, value, defaultValue) => {
  if (typeof value === 'undefined') {
    value = defaultValue;
  }

  if (typeof value !== 'boolean') {
    throw new Error(`Preset autofe-app: '${name}' option must be a boolean.`);
  }

  return value;
};

/**
 * @param options.debug 开启 babel-preset-env 的调试模式
 * @param options.exclude 去掉 babel-preset-env 的部分插件
 */
module.exports = function buildPreset(api, options) {
  // 默认关闭 debug 模式
  const debug = validateBoolOption(
    'debug',
    options.debug,
    false,
  );
  // 需要 exclude 的包
  const excludeList = options.exclude || [];
  // 默认使用内置 @babel/runtime
  const useAbsoluteRuntime = validateBoolOption(
    'absoluteRuntime',
    options.absoluteRuntime,
    true,
  );
  const absoluteRuntimePath = useAbsoluteRuntime
    ? path.dirname(require.resolve('@babel/runtime/package.json'))
    : false;

  // 默认配置
  // const useBuiltIns = 'usage';
  const useBuiltIns = 'entry';
  // const useBuiltIns = false;

  // 使用 usage，推荐自己安装 core-js3
  // 使用 entry，可以自己安装 core-js3，并手动在 entry 中 import，这样 preset-env 会自动解析需要的 Polyfills
  // 使用 false，必须自己解决 Polyfills

  // 不管用哪一种，如果使用 async/await、generator 或者 import()，都需要自己添加 Promise 依赖
  // @babel/runtime 里的 API 需要的 Polyfills 可以被 usage 和 entry 自动处理

  // npm install core-js@3 --save
  // import "core-js/stable";
  // 需要注意的是在webpack打包文件配置的 entry 中引入的 @babel/polyfill 不会根据 useBuiltIns 配置任何转换处理。

  const presets = [
    [require('@babel/preset-env'), {
      // Set the debug
      debug,

      // Enable more spec compliant, but potentially slower,
      // transformations for any plugins in this preset that support them.
      // spec: false,

      // Enable "loose" transformations for any plugins in this preset that allow them.
      // loose: false,

      // Do not transform modules to CJS
      // use webpack modules solution
      modules: false,

      // Disable polyfill transforms
      // Allow importing core-js in entrypoint and use browserlist to select polyfills
      useBuiltIns,

      // Set the corejs version we are using to avoid warnings in console
      // 配合 useBuiltIns 使用
      corejs: 3,
      // corejs: { version: 3, proposals: true } // 配合使用 proposal 特性
      // shippedProposals: true, // 配合使用 proposal 特性

      // The include and exclude options only work with the plugins included with this preset; 
      // 如果 include 或者 exclude 不存在的 will throw errors.

      // An array of plugins to always include.
      // 1. Babel plugins, @babel/plugin-transform-spread or plugin-transform-spread
      // 2. Built-ins (both for core-js@2 and core-js@3, such as es.map, es.set, or es.object.assign.
      // Full name (string): "es.math.sign"
      // Partial name (string): "es.math.*" (resolves to all plugins with es.math prefix)
      // RegExp Object: /^transform-.*$/ or new RegExp("^transform-modules-.*")
      // include: []

      // disable some transform
      exclude: [
        // TODO: 重设插件需要 exclude 么？

        // Need custom config for this plugin
        'proposal-object-rest-spread',
        // Need set loose for this plugin
        'transform-classes',
        // Need set loose for this plugin
        'transform-computed-properties',

        // 该插件导致正常 typeof 代码也变慢了
        // https://github.com/babel/babel/blob/007bfb656502a44f6ab50cd64750cc4b38f9efff/packages/babel-helpers/src/helpers.js#L6
        'transform-typeof-symbol',

        ...excludeList,
      ],
    }],
  ];

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
    require('@babel/plugin-proposal-optional-chaining'),

    // Adds syntax support for default value using ?? operator
    require('@babel/plugin-proposal-nullish-coalescing-operator'),

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
    require('@babel/plugin-syntax-dynamic-import'),

    // Enable loose mode to use assignment instead of defineProperty
    [require('@babel/plugin-proposal-class-properties'), {
      loose: true,
    }],
  ];

  const normalPlugins = [
    // ES
    // ==============

    // TODO: preset-env 针对 modules 不为 false 或 targets node 时使用
    // TODO: 与 babel-plugin-dynamic-import-node 有点类似
    // "@babel/plugin-proposal-dynamic-import"

    // object rest and spread
    // use Babel's extends helper.
    // TODO: objectSpread 兼容性？
    [require('@babel/plugin-proposal-object-rest-spread'), {
      loose: true,
      useBuiltIns: false,
    }],

    // For classes that have supers, the super class won’t resolve correctly.(IE10 and below)
    // so enable loose mode
    [require('@babel/plugin-transform-classes'), {
      loose: true,
    }],

    // use simple assignments instead of Object.defineProperty.
    [require('@babel/plugin-transform-computed-properties'), {
      loose: true,
    }],

    // Necessary to include regardless of the environment because
    // in practice some other transforms (such as object-rest-spread)
    // don't work without it: https://github.com/babel/babel/issues/7215
    // [
    //   require('@babel/plugin-transform-destructuring').default,
    //   {
    //     // Use loose mode for performance:
    //     // https://github.com/facebook/create-react-app/issues/5602
    //     loose: false,
    //     selectiveLoose: [
    //       'useState',
    //       'useEffect',
    //       'useContext',
    //       'useReducer',
    //       'useCallback',
    //       'useMemo',
    //       'useRef',
    //       'useImperativeHandle',
    //       'useLayoutEffect',
    //       'useDebugValue',
    //     ],
    //   },
    // ],

    // Others
    // ==============

    // A plugin that enables the re-use of Babel's injected helper code to save on codesize.
    // 1. 提供 regeneratorRuntime
    // 2. 使用 core-js 提供 Polyfills
    // 3. 避免 inline Babel helpers，减少体积
    [require('@babel/plugin-transform-runtime'), {
      // no polyfills
      corejs: false,
      // inlined helpers are replaced with calls to moduleName.
      helpers: true,
      // helpers: useBuiltIns === 'usage',
      // generator functions are transformed to use a regenerator runtime
      // that does not pollute the global scope.
      regenerator: useBuiltIns !== 'usage',
      // use webpack, don't run through @babel/plugin-transform-modules-commonjs
      useESModules: true,
      // use the built-in @babel/runtime
      absoluteRuntime: absoluteRuntimePath,
      // use the version of the built-in @babel/runtime
      version: require('@babel/runtime/package.json').version,
    }],

  ];

  const legacyPlugins = [
    // ES5 + ES3
    // ==============

    // TODO: preset-env 针对 Android 4 包含了这个
    // @babel/plugin-transform-reserved-words

    // TODO: 下面这些太老了，可以考虑去掉
    // preset-env 也内置了这些，但是要根据 targets 才决定是否使用

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
      ...legacyPlugins,
    ],
  };

  // return {
  //   sourceType: 'unambiguous',
  //   overrides: [{
  //     exclude: [/@babel[\/|\\\\]runtime/, /core-js/],
  //     presets,
  //     plugins
  //   }, {
  //     // there are some untranspiled code in @babel/runtime
  //     // https://github.com/babel/babel/issues/9903
  //     include: [/@babel[\/|\\\\]runtime/],
  //     presets: [
  //       [require('@babel/preset-env'), {
  //         useBuiltIns,
  //         corejs: 3
  //       }]
  //     ]
  //   }]
  // };
};

// a special flag to tell Creator to include @babel/runtime for transpilation
// otherwise the above `include` option won't take effect
process.env.CREATOR_TRANSPILE_BABEL_RUNTIME = true;
