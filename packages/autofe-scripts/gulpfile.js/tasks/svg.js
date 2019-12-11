'use strict';

const gulp = require('gulp');
const config = require('../config');
const browserSync = require('../lib/browserSync');
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
    .on('end', browserSync.reload);
};

gulp.task('svg', svgTask);
module.exports = svgTask;
