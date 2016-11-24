var gulp = require('gulp');
var config = require('../config');
var browserSync = require('../lib/browserSync');

var fontsTask = function () {
  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.dest))
    .pipe(browserSync.stream());
};

gulp.task('fonts', fontsTask);
module.exports = fontsTask;
