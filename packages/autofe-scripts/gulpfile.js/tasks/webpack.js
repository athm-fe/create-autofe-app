const gulp = require('gulp');
const gutil = require('gulp-util');
// const config = require('../config');
const browserSync = require('../lib/browserSync');
const webpack = require('webpack');
const webpackConfig = require('../../config/webpack.config');

const webpackTask = function (cb) {
  webpack(webpackConfig).run((err, stats) => {
    if (err) {
      gutil.log('Error', err);
      if (cb) {
        cb(err);
      }
    } else {
      Object.keys(stats.compilation.assets).forEach((key) => {
        gutil.log('Webpack: output ', gutil.colors.green(key));
      });
      if (cb) {
        cb();
        browserSync.reload();
      }
    }
  });
};

gulp.task('webpack', webpackTask);
module.exports = webpackTask;
