const gulp = require('gulp');
const gutil = require('gulp-util');
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
    gutil.log('webpack:', gutil.colors.red('no entries'));
    cb();
    return;
  }

  webpack(config).run((err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('webpack:', stats.toString({
      colors: true,
    }));

    cb();
    browserSync.reload();
  });
};

gulp.task('webpack', webpackTask);
module.exports = webpackTask;
