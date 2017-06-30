const gulp = require('gulp');
const config = require('../config');
const rename = require('gulp-rename');
const del = require('del');
const vinylPaths = require('vinyl-paths');

const origJSTask = function () {
  return gulp.src(config.origJS.src)
    .pipe(vinylPaths(del))
    .pipe(rename({
      suffix: '.orig',
    }))
    .pipe(gulp.dest(config.origJS.dest));
};

gulp.task('origJS', origJSTask);
module.exports = origJSTask;
