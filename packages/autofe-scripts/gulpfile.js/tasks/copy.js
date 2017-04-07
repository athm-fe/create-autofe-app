var gulp = require('gulp');
var config = require('../config');
var browserSync = require('../lib/browserSync');

var copyTask = function () {
  return gulp.src(config.copy.src)
    .pipe(gulp.dest(config.copy.dest))
    .pipe(browserSync.stream());
};

gulp.task('copy', copyTask);
module.exports = copyTask;
