'use strict';

const gulp = require('gulp');
const config = require('../config');
const svgmin = require('../lib/svgmin');
const gulpif = require('gulp-if');

const svgTask = function () {
  return gulp.src(config.svg.src)
    .pipe(gulpif(
      process.env.NODE_ENV === 'production',
      svgmin({
        plugins: [
          { removeViewBox: false },
          { cleanupIDs: false }
        ]
      })
    ))
    .pipe(gulp.dest(config.svg.dest, { overwrite: false }))
};

gulp.task('svg', svgTask);
module.exports = svgTask;
