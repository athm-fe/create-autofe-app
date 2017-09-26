'use strict';

const gulp = require('gulp');
const config = require('../config');
const rename = require('gulp-rename');
const del = require('del');
const vinylPaths = require('vinyl-paths');

const oldJSTask = function () {
  return gulp.src(config.oldJS.src)
    .pipe(vinylPaths(del))
    .pipe(rename({
      suffix: '.old',
    }))
    .pipe(gulp.dest(config.oldJS.dest));
};

gulp.task('oldJS', oldJSTask);
module.exports = oldJSTask;
