var gulp = require('gulp');
var config = require('../config/gulpConfig');
var browserSync = require('../config/browserSync');

var fontsTask = function () {
  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.dest))
    .pipe(browserSync.stream());
};

gulp.task('fonts', fontsTask);
module.exports = fontsTask;
