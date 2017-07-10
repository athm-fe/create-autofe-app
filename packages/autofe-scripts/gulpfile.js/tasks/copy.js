const gulp = require('gulp');
const config = require('../config');
const browserSync = require('../lib/browserSync');

const copyTask = function () {
  return gulp.src(config.copy.src)
    .pipe(gulp.dest(config.copy.dest))
    .pipe(browserSync.stream());
};

gulp.task('copy', copyTask);
module.exports = copyTask;
