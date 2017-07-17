const gulp = require('gulp');
const gutil = require('gulp-util');
// const config = require('../config');
const browserSync = require('../lib/browserSync');
const webpack = require('webpack');
const webpackConfig = require('../../config/webpack.config');

const webpackTask = function (cb) {
  webpack(webpackConfig()).run((err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);

    gutil.log('Webpack:', stats.toString({
      colors: true,
    }));

    cb();
    browserSync.reload();
  });
};

gulp.task('webpack', webpackTask);
module.exports = webpackTask;
