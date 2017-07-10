const gulp = require('gulp');
const config = require('../config');
const include = require('gulp-include');

const htmlBundleTask = function () {
  return gulp.src(config.htmlBundle.src)
    .pipe(include())
    .pipe(gulp.dest(config.htmlBundle.dest));
};

gulp.task('html-bundle', htmlBundleTask);
module.exports = htmlBundleTask;
