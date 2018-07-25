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

const webpackTask = function (cb) {
  const config = webpackConfig();

  if (isEmpty(config.entry)) {
    log('webpack:', chalk.red('no entries'));
    cb();
    return;
  }

  webpack(config).run((err, stats) => {
    if (err) {
      throw new PluginError('webpack', err);
    }

    log('webpack:', stats.toString({
      colors: true,
    }));

    cb();
    browserSync.reload();
  });
};

gulp.task('webpack', webpackTask);
module.exports = webpackTask;
