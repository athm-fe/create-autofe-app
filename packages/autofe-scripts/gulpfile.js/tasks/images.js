'use strict';

const gulp = require('gulp');
const config = require('../config');
const globalConfig = require('../../config');
const browserSync = require('../lib/browserSync');
const imagemin = require('gulp-imagemin');
const gulpif = require('gulp-if');

const imagesTask = function () {
  return gulp.src(config.images.src)
    .pipe(gulpif(
      process.env.NODE_ENV === 'production' && globalConfig.image.compress,
      imagemin([
        imagemin.gifsicle(),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng(),
        // imagemin.svgo({
        //   plugins: [
        //     {removeViewBox: false},
        //     {cleanupIDs: false}
        //   ]
        // })
      ])
    ))
    .pipe(gulp.dest(config.images.dest))
    .on('end', browserSync.reload);
};

gulp.task('images', imagesTask);
module.exports = imagesTask;
