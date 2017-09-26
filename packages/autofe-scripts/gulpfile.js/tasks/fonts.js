'use strict';

const gulp = require('gulp');
const config = require('../config');
const browserSync = require('../lib/browserSync');

const fontsTask = function () {
  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.dest))
    .on('end', browserSync.reload);
};

gulp.task('fonts', fontsTask);
module.exports = fontsTask;
