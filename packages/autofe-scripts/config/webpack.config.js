'use strict';

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
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

  return entries;
}

const plugins = [];

if (isProd) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      // optimize property access: a["foo"] → a.foo
      properties: false,
      // warn about potentially dangerous optimizations/code
      warnings: false,
    },
    output: {
      // quote all keys in object literals
      quote_keys: true,
      ascii_only: true,
    },
    mangle: {
      // mangler to name function expressions
      screw_ie8: false,
    },
    sourceMap: true,
  }));
}

module.exports = () => ({
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
    ],
  },
  plugins,
});
