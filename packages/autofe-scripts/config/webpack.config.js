'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const merge = require('webpack-merge');
const Config = require('webpack-chain');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const babel = require('@babel/core');
const {
  CssUrlRelativePlugin,
  OmitJsForCssOnlyPlugin,
} = require("autofe-shared-utils");
const {
  isWindows,
  resolveModule,
  // loadModule,
} = require('@vue/cli-shared-utils');
const config = require('./index');
const resolveClientEnv = require('../util/resolveClientEnv');

const isProd = process.env.NODE_ENV === 'production';
const mode = isProd ? 'production' : 'development';
const context = config.appDirectory;

// Check if TypeScript is setup
const useTypeScript = fs.existsSync(path.join(context, 'tsconfig.json'));

/**
 * 获取入口文件
 */
function getEntries() {
  const entries = {};

  // for js
  const entryFiles = glob.sync('**/*.entry.js', {
    cwd: config.appSrc,
  });
  for (let i = 0; i < entryFiles.length; i += 1) {
    const filePath = entryFiles[i];
    const key = path.join(path.dirname(filePath), path.basename(filePath, '.entry.js'));
    const value = `.${path.sep}${path.join('src', filePath)}`;
    entries[key] = value;
  }

  // for ts
  const entryTSFiles = glob.sync('**/*.entry.ts', {
    cwd: config.appSrc,
  });
  for (let i = 0; i < entryTSFiles.length; i += 1) {
    const filePath = entryTSFiles[i];
    const key = path.join(path.dirname(filePath), path.basename(filePath, '.entry.ts'));
    const value = `.${path.sep}${path.join('src', filePath)}`;

    // 这里考虑了同名的情况，比如 main.entry.js 和 main.scss，处理办法办法就是把他们合并到一个数组
    if (entries[key]) {
      if (Array.isArray(entries[key])) {
        entries[key].push(value);
      } else {
        entries[key] = [entries[key], value];
      }
    } else {
      entries[key] = value;
    }
  }

  // for style
  const entryStyleFiles = glob.sync('**/!(_)*.{scss,css}', {
    cwd: config.appSrc,
  });
  for (let i = 0; i < entryStyleFiles.length; i += 1) {
    const filePath = entryStyleFiles[i];
    const key = path.join(path.dirname(filePath), path.parse(filePath).name);
    const value = `.${path.sep}${path.join('src', filePath)}`;

    // 这里考虑了同名的情况，比如 main.entry.js 和 main.scss，处理办法办法就是把他们合并到一个数组
    if (entries[key]) {
      if (Array.isArray(entries[key])) {
        entries[key].push(value);
      } else {
        entries[key] = [entries[key], value];
      }
    } else {
      entries[key] = value;
    }
  }

  return entries;
}

/**
 * 配置 file-loader 资源文件名
 */
function getNameForFileLoader() {
  return isProd
    ? '[path][name].[ext]?[contenthash:8]'
    : '[path][name].[ext]';
}

/**
 * 获取 file-loader 资源输出路径，与 src 下目录保持一致
 * @param {String} url file-loader 的 name 配置，`[path][name].[ext]`
 * @param {String} resourcePath 资源的绝对路径
 * @param {String} context 上下文，参考 webpack 的 context 配置
 */
function getOutputPathForFileLoader(url) {
  // To get relative path you can use
  // const relativePath = path.relative(context, resourcePath);

  let output;
  if (url.indexOf('src') === 0) {
    output = path.relative('src', url);
  } else if (url.indexOf('node_modules') === 0) {
    output = path.relative('node_modules', url);
  } else {
    output = url;
  }

  return output;
}

function getDevtool() {
  // dev
  // 推荐 cheap-module-eval-source-map，vue-cli 也是用这个
  // 但是配合 style-loader 使用比较好，MiniCssExtractPlugin.loader 不支持
  // 因此使用 inline-cheap-module-source-map
  // 因为 MiniCssExtractPlugin.loader 支持

  // prod
  // 推荐 false
  // 可以使用 source-map

  if (isProd) {
    return false;
  }
  return 'inline-cheap-module-source-map';
}

function genTranspileDepRegex(transpileDependencies) {
  const deps = transpileDependencies.map(dep => {
    if (typeof dep === 'string') {
      const depPath = path.join('node_modules', dep, '/');
      return isWindows
        ? depPath.replace(/\\/g, '\\\\') // double escape for windows style path
        : depPath;
    } else if (dep instanceof RegExp) {
      return dep.source;
    }
  });
  return deps.length ? new RegExp(deps.join('|')) : null;
}

function getPrependDataForSassLoader(prependData = '') {
  let data = '';
  const env = resolveClientEnv(config, true);
  for (const key in env) {
    data += `$${key}: "${env[key]}";\n`;
  }

  if (typeof prependData === 'function') {
    return (loaderContext) => {
      const result = prependData(loaderContext);
      return `${data}\n${result}`;
    }
  }

  return `${data}\n${prependData}`;
}

module.exports = () => {
  const transpileDepRegex = genTranspileDepRegex(config.transpileDependencies);

  // try to load the project babel config;
  // if the default preset is used,
  // there will be a CREATOR_TRANSPILE_BABEL_RUNTIME env var set.
  babel.loadPartialConfig();

  const chainableConfig = new Config();

  chainableConfig
    .mode(mode)
    .context(context)
    .devtool(getDevtool())
    .output
      .path(config.appBuild)
      .publicPath(config.publicPath)
      .filename('[name].js')
      .chunkFilename('[name].js');

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  chainableConfig.merge({
    node: {
      setImmediate: false,
      process: 'mock',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
  });

  chainableConfig.resolve
    .extensions
      .merge(['.tsx', '.ts', '.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'])
      .end()
    .modules
      .add('node_modules')
      .add(path.join(context, 'node_modules'))
      .add(path.join(__dirname, '../node_modules'))
      .add(path.join(path.dirname(require.resolve('babel-preset-autofe-app/package.json')), 'node_modules'))
      .end()
    .alias
      .set('@', config.appSrc);

  chainableConfig.resolveLoader
    .modules
      .add('node_modules')
      .add(path.join(context, 'node_modules'))
      .add(path.join(__dirname, '../node_modules'));

  chainableConfig.module
    .noParse(/^(vue|vue-router|vuex|vuex-router-sync)$/);

  chainableConfig.module
    .rule('eslint')
      .test(/\.(vue|mjs|js|jsx|ts|tsx)$/)
      .pre()
      .include
        .add(config.appSrc)
        .end()
      .use('eslint-loader')
        .loader(require.resolve('eslint-loader'))
        .options({
          // TODO: cache，参考 vue-cli
          // cache: true,
          // cacheIdentifier: '0443c91d',
          // TODO: 不确定是否需要配置这个
          // extensions: [
          //   '.vue',
          //   '.mjs',
          //   '.js',
          //   '.jsx',
          //   '.ts',
          //   '.tsx',
          // ],
          emitWarning: true,
          emitError: false,
          eslintPath: path.dirname(
            resolveModule('eslint/package.json', context) ||
            resolveModule('eslint/package.json', __dirname)
          ),
          // TODO: 修改 eslint plugin 查找路径，应该不需要这个
          // resolvePluginsRelativeTo: __dirname
        });

  // TODO: babel 支持 jsx
  chainableConfig.module
    .rule('js')
      .test(/\.(mjs|js|jsx)$/)
      .exclude
        .add((filepath) => {
          // Notice: 处理 @babel/runtime 会导致很多没必要的 Polyfills，暂时去掉
          // only include @babel/runtime when the babel-preset-autofe-app preset is used
          // if (
          //   process.env.CREATOR_TRANSPILE_BABEL_RUNTIME &&
          //   filepath.includes(path.join('@babel', 'runtime'))
          // ) {
          //   return false;
          // }

          // check if this is something the user explicitly wants to transpile
          if (transpileDepRegex && transpileDepRegex.test(filepath)) {
            return false;
          }

          // Don't transpile node_modules
          return /node_modules/.test(filepath);
        })
        .end()
      .use('babel-loader')
        .loader(require.resolve('babel-loader'));

  chainableConfig.module
    .rule('ts')
      .test(/\.ts$/)
      .use('babel-loader')
        .loader(require.resolve('babel-loader'))
        .end()
      .use('ts-loader')
        .loader(require.resolve('ts-loader'))
        .options({
          transpileOnly: true,
          appendTsSuffixTo: [
            '\\.vue$'
          ],
          // happyPackMode: true,
        });

  chainableConfig.module
    .rule('tsx')
      .test(/\.tsx$/)
      .use('babel-loader')
        .loader(require.resolve('babel-loader'))
        .end()
      .use('ts-loader')
        .loader(require.resolve('ts-loader'))
        .options({
          transpileOnly: true,
          appendTsxSuffixTo: [
            '\\.vue$'
          ],
          // happyPackMode: true,
        });

  // output based on entry
  // https://github.com/webpack-contrib/file-loader/issues/114
  // https://github.com/webpack-contrib/mini-css-extract-plugin#extracting-css-based-on-entry
  // function findEntry(mod) {
  //   if (mod.reasons.length > 0 && mod.reasons[0].module.resource) {
  //       return findEntry(mod.reasons[0].module)
  //   }
  //   return mod.resource;
  // }

  const projectCssLoaderOptions = config.css.loaderOptions.css || {};
  const projectPostcssLoaderOptions = config.css.loaderOptions.postcss || {};
  const projectSassLoaderOptions = config.css.loaderOptions.scss || {};

  const extractCssLoaderOptions = {
    // hmr: process.env.NODE_ENV === 'development',
    // if hmr does not work, this is a forceful method.
    // reloadAll: true,
  };

  const cssLoaderOptions = Object.assign({
    // something...
  }, projectCssLoaderOptions, {
    sourceMap: !isProd,
  });

  const postcssLoaderOptions = Object.assign({
    // something...
  }, projectPostcssLoaderOptions, {
    sourceMap: !isProd,
  });

  const prependData = getPrependDataForSassLoader(projectSassLoaderOptions.prependData);
  const sassLoaderOptions = Object.assign({
    // 参考 vue-cli
    // prependData: '@import "@/assets/athm/tools.scss";'
    // Prefer `dart-sass`, you need to install sass and fibers
    // implementation: require('sass'),
  }, projectSassLoaderOptions, {
    // Notice: resolve-url-loader need this! so set sourceMap true always
    // 该配置不产生 map 文件, 只产生 map 内容
    sourceMap: true,
    prependData,
  });

  chainableConfig.module
    .rule('css')
      .test(/\.css$/)
      .use('extract-css-loader')
        .loader(MiniCssExtractPlugin.loader)
        .options(extractCssLoaderOptions)
        .end()
      .use('css-loader')
        .loader(require.resolve('css-loader'))
        .options(cssLoaderOptions)
        .end()
      .use('postcss-loader')
        .loader(require.resolve('postcss-loader'))
        .options(postcssLoaderOptions)
        .end()

  chainableConfig.module
    .rule('scss')
      .test(/\.scss$/)
      .use('extract-css-loader')
        .loader(MiniCssExtractPlugin.loader)
        .options(extractCssLoaderOptions)
        .end()
      .use('css-loader')
        .loader(require.resolve('css-loader'))
        .options(cssLoaderOptions)
        .end()
      .use('postcss-loader')
        .loader(require.resolve('postcss-loader'))
        .options(postcssLoaderOptions)
        .end()
      // TODO 处理 image-set( "cat.png" 1x, "cat-2x.png" 2x);
      .use('resolve-url-loader')
        .loader(require.resolve('resolve-url-loader'))
        .options({
          keepQuery: true, // for loader resourceQuery
          removeCR: true, // for windows CRLF
          sourceMap: !isProd,
        })
        .end()
      .use('sass-loader')
        .loader(require.resolve('sass-loader'))
        .options(sassLoaderOptions)
        .end()

  chainableConfig.module
    .rule('images')
      .test(/\.(png|jpe?g|gif|webp|cur)(\?.*)?$/)
      .oneOf('image-datauri')
        .resourceQuery(/datauri/)
        .use('url-loader')
          .loader(require.resolve('url-loader'))
          .options({
            limit: true, // no limit
          })
          .end()
        .end()
      .oneOf('image-url')
        .use('url-loader')
          .loader(require.resolve('url-loader'))
          .options({
            // url-loader options
            limit: 1024, // limit 1kb
            // file-loader options
            name: getNameForFileLoader,
            outputPath: getOutputPathForFileLoader,
          })
          .end()

  chainableConfig.module
    .rule('svg')
      .test(/\.svg$/)
      .oneOf('svg-inline')
        .resourceQuery(/inline/)
        .use('svg-inline-loader')
          .loader(require.resolve('svg-inline-loader'))
          .options({
            removeSVGTagAttrs: false,
          })
          .end()
        .end()
      .oneOf('svg-datauri')
        .resourceQuery(/datauri/)
        .use('svg-url-loader')
          .loader(require.resolve('svg-url-loader'))
          .options({
            limit: 0, // no limit
            stripdeclarations: true,
          })
          .end()
        .end()
      .oneOf('svg-url')
        .use('svg-url-loader')
          .loader(require.resolve('svg-url-loader'))
          .options({
            // svg-url-loader options
            limit: 1024, // limit 1kb
            stripdeclarations: true,
            // file-loader options
            name: getNameForFileLoader,
            outputPath: getOutputPathForFileLoader,
          })
          .end()

  if (isProd) {
    chainableConfig.module
      .rule('svg')
        .test(/\.svg$/)
        .pre()
        .use('svgo-loader')
          .loader(require.resolve('svgo-loader'))
          .options({
            plugins: [
              { removeViewBox: false },
              { cleanupIDs: false }
            ]
          })
  }

  chainableConfig.module
    .rule('fonts')
      .test(/\.(eot|ttf|otf|woff2?)(\?.*)?$/)
      .use('url-loader')
        .loader(require.resolve('url-loader'))
        .options({
          // url-loader options
          limit: 1024, // limit 1kb
          // file-loader options
          name: getNameForFileLoader,
          outputPath: getOutputPathForFileLoader,
        })

  chainableConfig.module
    .rule('media')
      .test(/\.(mp4|webm|ogv|flv|mp3|ogg|wav|flac|acc)$/)
      .use('url-loader')
        .loader(require.resolve('url-loader'))
        .options({
          // url-loader options
          limit: 1024, // limit 1kb
          // file-loader options
          name: getNameForFileLoader,
          outputPath: getOutputPathForFileLoader,
        })

  chainableConfig.optimization
    .minimizer('terser')
      .use(TerserPlugin, [{
        parallel: true,
        // sourceMap: true,
        // cache: true,
        terserOptions: {
          mangle: {
            safari10: true,
          },
          compress: {
            warnings: false,
            drop_debugger: true,
            // drop_console: true,
          },
          output: {
            ascii_only: true,
            quote_style: 1,
          },
        },
      }])

  chainableConfig.optimization
    .minimizer('optimize-css')
      .use(OptimizeCSSAssetsPlugin, [{
        cssProcessorPluginOptions: {
          preset: ['default', {
            cssDeclarationSorter: false,
            discardComments: { removeAll: true },
            mergeLonghand: false,
          }],
        },
      }])

  chainableConfig
    .plugin('define')
      .use(require('webpack').DefinePlugin, [
        resolveClientEnv(config)
      ])

  chainableConfig
    .plugin('copy')
      .use(CopyPlugin, [
        [
          {
            from: path.join(context, 'public'),
            to: config.appBuild,
            toType: 'dir',
            ignore: [
              '.DS_Store'
            ],
          },
          {
            from: 'src/**/*.{eot,ttf,otf,woff,woff2}',
            to: getNameForFileLoader(),
            toType: 'template',
            transformPath(targetPath) {
              return path.relative('src', targetPath);
            },
          },
          {
            from: 'src/**/*.{png,jpg,jpeg,gif,webp,cur}',
            to: getNameForFileLoader(),
            toType: 'template',
            transformPath(targetPath) {
              return path.relative('src', targetPath);
            },
          },
          {
            from: 'src/**/*.{mp4,webm,ogv,flv,mp3,ogg,wav,flac,acc}',
            to: getNameForFileLoader(),
            toType: 'template',
            transformPath(targetPath) {
              return path.relative('src', targetPath);
            },
          },
          {
            from: 'src/**/*.{ico,json,txt,swf}',
            to: getNameForFileLoader(),
            toType: 'template',
            transformPath(targetPath) {
              return path.relative('src', targetPath);
            },
          },
        ],
      ])

  chainableConfig
    .plugin('omit-js-for-css-only')
      .use(OmitJsForCssOnlyPlugin)

  chainableConfig
    .plugin('css-url-relative')
      // url(...) 不能是绝对路径, 否则 CssUrlRelativePlugin 没办法处理成相对路径
      // TODO 处理 image-set( "cat.png" 1x, "cat-2x.png" 2x);
      .use(CssUrlRelativePlugin, [{ root: '/' }])

  chainableConfig
    .plugin('mini-css-extract')
      .use(MiniCssExtractPlugin, [{
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: '[name].css',
      }])

  if (useTypeScript) {
    chainableConfig
      .plugin('fork-ts-checker')
        .use(ForkTsCheckerWebpackPlugin, [{
          typescript: path.dirname(
            resolveModule('typescript/package.json', context) ||
            resolveModule('typescript/package.json', __dirname)
          ),
          // vue: true,
          formatter: 'codeframe',
          checkSyntacticErrors: true,
          // diagnostic: 18003 'No inputs were found in config file...
          ignoreDiagnostics: [18003],
        }])
  }

  // 合并项目 chainWebpack 配置
  const projectChainWebpack = config.chainWebpack;
  if (typeof projectChainWebpack === 'function') {
    projectChainWebpack(chainableConfig);
  }

  // 转换为 Webpack 配置
  let webpackConfig = chainableConfig.toConfig();

  // Notice: use Function for watching entry files
  webpackConfig.entry = getEntries;

  // 合并项目 configureWebpack 配置
  const projectWebpackConfig = config.configureWebpack;
  if (typeof projectWebpackConfig === 'function') {
    const result = projectWebpackConfig(webpackConfig);
    if (result) {
      webpackConfig = merge(webpackConfig, result);
    }
  } else if (projectWebpackConfig) {
    webpackConfig = merge(webpackConfig, projectWebpackConfig);
  }

  // 兼容原有的 externals 配置方式
  if (config.externals) {
    // TODO 抛出过期警告，推荐使用 configureWebpack.externals 配置
    webpackConfig = merge(webpackConfig, { externals: config.externals });
  }

  return webpackConfig;
};
