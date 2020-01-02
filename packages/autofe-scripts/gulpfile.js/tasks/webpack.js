'use strict';

const gulp = require('gulp');
const PluginError = require('plugin-error');
const log = require('fancy-log');
const chalk = require('chalk');
// const config = require('../config');
const browserSync = require('../lib/browserSync');
const webpack = require('webpack');
const webpackConfig = require('../../config/webpack.config');

function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

const isProd = process.env.NODE_ENV === 'production';

let isFirst = true;

const webpackTask = function (cb) {
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

      log('webpack:', stats.toString({
        colors: true,
      }));

      cb();
    });
  } else {
    compiler.watch({
      ignored: [/node_modules/, /\.(html|old\.js|md)$/],
    }, (err, stats) => {
      if (err) {
        throw new PluginError('webpack', err);
      }

      log('webpack:', stats.toString({
        colors: true,
      }));

      // Notice: only call cb() once, otherwise error will happen.
      if (isFirst) {
        cb();
        isFirst = false;
      }
    });
  }
};

gulp.task('webpack', webpackTask);
module.exports = webpackTask;
