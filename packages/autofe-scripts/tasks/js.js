const gulp = require('gulp');
const config = require('../config/gulpConfig');
const browserSync = require('../config/browserSync');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');

const jsTask = function () {
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
