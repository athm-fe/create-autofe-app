var gulp = require('gulp');
var config = require('../config');
var browserSync = require('../lib/browserSync');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');

var jsTask = function () {
  return gulp.src(config.js.src)
    .pipe(gulpif(process.env.NODE_ENV === 'production', uglify({
      output: {
        ascii_only: true
      }
    })))
    .pipe(gulp.dest(config.js.dest))
    .pipe(browserSync.stream());
};

gulp.task('js', jsTask);
module.exports = jsTask;
