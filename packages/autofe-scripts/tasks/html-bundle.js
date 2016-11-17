var gulp = require('gulp');
var config = require('../config/gulpConfig');
var include = require('gulp-include');

var htmlBundleTask = function () {
  return gulp.src(config.htmlBundle.src)
    .pipe(include())
    .pipe(gulp.dest(config.htmlBundle.dest));
};

gulp.task('html-bundle', htmlBundleTask);
module.exports = htmlBundleTask;
