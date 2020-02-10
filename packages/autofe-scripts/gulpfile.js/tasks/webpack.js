'use strict';

const PluginError = require('plugin-error');
const log = require('fancy-log');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('../../config/webpack.config');
const {
  isCreatorDev,
} = require('../../config/index');

function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

const isProd = process.env.NODE_ENV === 'production';

const statsOptions = isCreatorDev ? { colors: true } : {
  colors: true,
  assets: false,
  entrypoints: false,
  modules: false,
  children: false,
  cached: false,
  cachedAssets: false,
  chunks: false,
  chunkGroups: false,
};

let isFirst = true;

function webpackTask(cb) {
  const config = webpackConfig();

  if (isEmpty(config.entry)) {
    log('webpack:', chalk.red('no entries'));
    cb();
    return;
  }

  const compiler = webpack(config);
  if (isProd) {
    compiler.run((err, stats) => {
      if (err) {
        throw new PluginError('webpack', err);
      }

      log('webpack:', stats.toString(statsOptions));

      cb();
    });
  } else {
    compiler.watch({
      ignored: [/node_modules/, /\.(html|old\.js|md)$/],
    }, (err, stats) => {
      if (err) {
        throw new PluginError('webpack', err);
      }

      log('webpack:', stats.toString(statsOptions));

      // Notice: only call cb() once, otherwise error will happen.
      if (isFirst) {
        cb();
        isFirst = false;
      }
    });
  }
}
webpackTask.displayName = 'webpack';

exports.webpack = webpackTask;
