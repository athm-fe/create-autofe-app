'use strict';

const path = require('path');
const glob = require('glob');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AutoFEWebpack = require("autofe-webpack");
const paths = require('./paths');
const config = require('./index');

const isProd = process.env.NODE_ENV === 'production';

const context = paths.appDirectory;

function getEntries() {
  const entries = {};

  const entryFiles = glob.sync('**/*.entry.js', {
    cwd: path.join(context, 'src'),
  });
  for (let i = 0; i < entryFiles.length; i += 1) {
    const filePath = entryFiles[i];
    const key = path.join(path.dirname(filePath), path.basename(filePath, '.entry.js'));
    entries[key] = `.${path.sep}${path.join('src', filePath)}`;
  }

  const entryStyleFiles = glob.sync('**/!(_)*.scss', {
    cwd: path.join(context, 'src'),
  });
  for (let i = 0; i < entryStyleFiles.length; i += 1) {
    const filePath = entryStyleFiles[i];
    const key = path.join(path.dirname(filePath), path.basename(filePath, '.scss'));
    entries[key] = `.${path.sep}${path.join('src', filePath)}`;
  }
  // TODO: 可能存在 key 相同的情况

  return entries;
}

function getOutputPath(url, resourcePath, context) {
  // `resourcePath` is original absolute path to asset
  // `context` is directory where stored asset (`rootContext`) or `context` option

  // To get relative path you can use
  // const relativePath = path.relative(context, resourcePath);

  // TODO: src 改为可配置
  const output = path.relative('src', url);

  // console.log('outputPath', url);

  return output;
}

function getPublicPath(url, resourcePath, context) {
  // `resourcePath` is original absolute path to asset
  // `context` is directory where stored asset (`rootContext`) or `context` option

  // To get relative path you can use
  // const relativePath = path.relative(context, resourcePath);

  // TODO: src 改为可配置
  const output = path.relative('src', url);

  // console.log('publicPath', url);

  return output;
}

module.exports = () => {
  const entries = getEntries();

  return {
    mode: isProd ? 'production' : 'development',
    // dev:
    //   推荐 cheap-module-eval-source-map: use style-loader, MiniCssExtractPlugin.loader don't support
    //   inline-cheap-module-source-map: MiniCssExtractPlugin.loader support
    // prod: source-map
    devtool: isProd ? 'false' : 'inline-cheap-module-source-map',
    context,
    entry: entries,
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.join(context, 'build'),
      publicPath: '/',
    },
    externals: config.externals,
    resolve: {
      alias: {
        // Resolve Babel runtime relative to autofe-scripts.
        // It usually still works on npm 3 without this but it would be
        // unfortunate to rely on, as autofe-scripts could be symlinked,
        // and thus babel-runtime might not be resolvable from the source.
        'babel-runtime': path.dirname(
          require.resolve('babel-runtime/package.json')
        ),
      },
    },
    module: {
      rules: [
        // eslint
        {
          test: /\.js$/,
          enforce: 'pre',
          use: [
            {
              options: {
                emitWarning: true,
                eslintPath: require.resolve('eslint'),
                baseConfig: {
                  extends: [require.resolve('eslint-config-autofe-app')],
                },
              },
              loader: require.resolve('eslint-loader'),
            },
          ],
          include: paths.appSrc,
        },
        // js
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [require.resolve('babel-preset-autofe-app')],
            },
          },
        },
        // ts
        // vue
        // css
        // scss
        {
          // TODO: 还没处理 css
          test: /\.scss$/,
          use: [
            {
              // output based on entry
              // https://github.com/webpack-contrib/file-loader/issues/114
              // https://github.com/webpack-contrib/mini-css-extract-plugin#extracting-css-based-on-entry
              // function findEntry(mod) {
              //   if (mod.reasons.length > 0 && mod.reasons[0].module.resource) {
              //       return findEntry(mod.reasons[0].module)
              //   }
              //   return mod.resource;
              // }
              loader: MiniCssExtractPlugin.loader,
              options: {
                // Type: String|Function Default: the publicPath in webpackOptions.output
                // Specifies a custom public path for the target file(s).
                // publicPath: './',
                // publicPath: (resourcePath, context) => {
                //   // publicPath is the relative path of the resource to the context
                //   // e.g. for ./css/admin/main.css the publicPath will be ../../
                //   // while for ./css/main.css the publicPath will be ../
                //   return path.relative(path.dirname(resourcePath), context) + '/';
                // },
                // hmr: process.env.NODE_ENV === 'development',
                // if hmr does not work, this is a forceful method.
                // reloadAll: true,
              },
            },
            {
              loader: require.resolve('css-loader'),
              options: {
                sourceMap: true,
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                // 传递 map 内容给上一级
                sourceMap: true,
              },
            },
            {
              loader: require.resolve('resolve-url-loader'),
              options: {
                keepQuery: true,
                // 传递 map 给上一级 loader
                sourceMap: true,
              },
            },
            {
              loader: require.resolve('sass-loader'),
              options: {
                // Notice: resolve-url-loader need this!
                // 该配置不产生 map 文件, 只产生 map 内容
                sourceMap: true,
                // 参考 vue-cli
                // prependData: '@import "@/assets/athm/tools.scss";'
              },
            },
          ]
        },
        // images
        // TODO: ico, cur 考虑是否分离
        // TODO: cur 转化为 data-uri 时, 丢失 mimetype
        // TODO: ico 转化为 data-uri 未验证
        {
          test: /\.(png|jpe?g|gif|webp|ico|cur)(\?.*)?$/,
          oneOf: (() => {
            const imageDataUriLoaderConfig = {
              loader: require.resolve('url-loader'),
              options: {
                limit: true, // no limit
              },
            };

            const imageUrlLoaderConfig = {
              loader: require.resolve('url-loader'),
              options: {
                // url-loader options
                limit: 1024, // limit 1kb
                // file-loader options
                name: '[path][name].[contenthash].[ext]',
                outputPath: getOutputPath,
                // 最终路径不能是绝对路径, 否则 CssUrlRelativePlugin 没办法处理成相对路径
                publicPath: getPublicPath,
              },
            };

            return [
              {
                resourceQuery: /datauri/,
                use: [imageDataUriLoaderConfig],
              },
              {
                use: [imageUrlLoaderConfig],
              },
            ];
          })(),
        },
        // svg
        {
          test: /\.svg$/,
          oneOf: (() => {
            const svgoLoaderConfig = {
              loader: require.resolve('svgo-loader'),
              options: {
                plugins: [
                  { removeViewBox: false },
                  { cleanupIDs: false }
                ]
              },
            };

            const svgInlineLoaderConfig = {
              loader: require.resolve('svg-inline-loader'),
              options: {
                removeSVGTagAttrs: false,
              },
            };

            const svgDataUriLoaderConfig = {
              loader: require.resolve('svg-url-loader'),
              options: {
                limit: 0, // no limit
                stripdeclarations: true,
              },
            };

            const svgUrlLoaderConfig = {
              loader: require.resolve('svg-url-loader'),
              options: {
                // svg-url-loader options
                limit: 1024, // limit 1kb
                stripdeclarations: true,
                // file-loader options
                name: '[path][name].[contenthash].[ext]',
                outputPath: getOutputPath,
                // 最终路径不能是绝对路径, 否则 CssUrlRelativePlugin 没办法处理成相对路径
                publicPath: getPublicPath,
              },
            };

            const baseLoaderConfig = [];
            if (isProd) {
              baseLoaderConfig.push(svgoLoaderConfig);
            }

            return [
              {
                resourceQuery: /inline/,
                use: [svgInlineLoaderConfig].concat(baseLoaderConfig),
              },
              {
                resourceQuery: /datauri/,
                use: [svgDataUriLoaderConfig].concat(baseLoaderConfig),
              },
              {
                use: [svgUrlLoaderConfig].concat(baseLoaderConfig),
              },
            ];
          })(),
        },
        // fonts
        {
          test: /\.(eot|ttf|otf|woff2?)(\?.*)?$/,
          use: [
            {
              loader: require.resolve('url-loader'),
              options: {
                // url-loader options
                limit: 1024, // limit 1kb
                // file-loader options
                name: '[path][name].[contenthash].[ext]',
                outputPath: getOutputPath,
                // 最终路径不能是绝对路径, 否则 CssUrlRelativePlugin 没办法处理成相对路径
                publicPath: getPublicPath,
              },
            },
          ],
        },
        // media
        {
          test: /\.(mp4|webm|ogv|flv|mp3|ogg|wav|flac|acc)$/,
          use: [
            {
              loader: require.resolve('file-loader'),
              options: {
                name: '[path][name].[contenthash].[ext]',
                outputPath: getOutputPath,
                // TODO: 最终路径不能是绝对路径, 否则 CssUrlRelativePlugin 没办法处理成相对路径
                publicPath: getPublicPath,
              },
            },
          ],
        },
        // others
        // TODO: swf,json,txt, 考虑 copy-webpack-plugin
      ],
    },
    optimization: {
      minimizer: [
        // new TerserPlugin({
        //   parallel: true,
        //   terserOptions: {
        //     safari10: true,
        //     compress: {
        //       warnings: false,
        //       drop_debugger: true,
        //       drop_console: true,
        //     },
        //     output: {
        //       ascii_only: true,
        //       quote_style: 1,
        //     },
        //   },
        // }),
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              ascii_only: true,
            },
          },
        }),
        // new OptimizeCSSAssetsPlugin({}),
      ],
    },
    plugins: [
      new AutoFEWebpack.OmitJsForCssOnlyPlugin(),
      new AutoFEWebpack.CssUrlRelativePlugin(), // TODO: 丢失了 sourcemap
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        // filename: devMode ? '[name].css' : '[name].[hash].css',
        // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      }),
    ]
  };
};
