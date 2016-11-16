var gulp = require('gulp');
var config = require('../config/gulpConfig');
var browserSync = require('../config/browserSync');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');

var jsTask = function () {
  return gulp.src(config.js.src)
    // TODO gutil.env.env === 'prod'
    .pipe(gulpif(gutil.env.env === 'prod', uglify({
      output: {
        ascii_only: true
      }
    })))
    .pipe(gulp.dest(config.js.dest))
    .pipe(browserSync.stream());
};

gulp.task('js', jsTask);
module.exports = jsTask;
