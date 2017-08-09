const gulp = require('gulp');
const config = require('../config');
const browserSync = require('../lib/browserSync');
const imagemin = require('gulp-imagemin');

const imagesTask = function () {
  return gulp.src(config.images.src)
    .pipe(imagemin(config.images.imagemin))
    .pipe(gulp.dest(config.images.dest))
    .on('end', browserSync.reload);
};

gulp.task('images', imagesTask);
module.exports = imagesTask;
