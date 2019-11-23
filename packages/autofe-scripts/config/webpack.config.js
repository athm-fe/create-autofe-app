'use strict';

const path = require('path');
const glob = require('glob');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const CssUrlRelativePlugin = require('css-url-relative-plugin');
const autoprefixer = require('autoprefixer');
const assets = require('../gulpfile.js/lib/postcss-assets/index');
const paths = require('./paths');
const config = require('./index');
const gulpConfig = require('../gulpfile.js/config');

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

  console.log(entries);

  return entries;
}

module.exports = () => ({
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'false' : 'eval',
  context,
  entry: getEntries(),
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
      {
        // TODO: 还没处理 css
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: require.resolve('css-loader'),
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              plugins: [
                autoprefixer(gulpConfig.autoprefixer.option),
                // assets(gulpConfig.postcssAssets.option),
              ],
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
            },
          },
        ]
      },
      // mp3,mp4,ogg,flv,swf,json,txt
      {
        test: /\.(png|jpg|gif|svg|ico|cur)$/,
        use: [
          {
            loader: require.resolve('autofe-url-loader'),
            options: {
              limit: false,
              fallback: require.resolve('file-loader'),
              // file-loader options
              name: '[path][name].[contenthash].[ext]',
              // Type: String|Function Default: undefined
              // Specify a filesystem path where the target file(s) will be placed.
              outputPath(url, resourcePath, context) {
                // `resourcePath` is original absolute path to asset
                // `context` is directory where stored asset (`rootContext`) or `context` option

                // To get relative path you can use
                // const relativePath = path.relative(context, resourcePath);

                // TODO: src 改为可配置
                const output = path.relative('src', url);

                console.log('outputPath', url);

                return output;
              },
              // 最终路径不能是绝对路径, 否则 FixStyleOnlyEntriesPlugin 没办法处理成相对路径
              publicPath(url, resourcePath, context) {
                // `resourcePath` is original absolute path to asset
                // `context` is directory where stored asset (`rootContext`) or `context` option

                // To get relative path you can use
                // const relativePath = path.relative(context, resourcePath);

                // TODO: src 改为可配置
                const output = path.relative('src', url);

                console.log('publicPath', url);

                return output;
              },
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|otf|woff|woff2)$/,
        use: [
          require.resolve('file-loader'),
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            ascii_only: true,
          },
        }
      })
    ],
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new CssUrlRelativePlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ]
});
