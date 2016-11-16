const gulp = require('gulp');
const config = require('../config/gulpConfig');
const include = require('gulp-include');

const htmlBundleTask = function () {
  return gulp.src(config.htmlBundle.src)
    .pipe(include())
    .pipe(config.htmlBundle.dest);
};

gulp.task('html-bundle', htmlBundleTask);
module.exports = htmlBundleTask;
