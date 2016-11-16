const gulp = require('gulp');
const config = require('../config/gulpConfig');
const browserSync = require('../config/browserSync');
const imagemin = require('gulp-imagemin');

const imagesTask = function () {
  return gulp.src(config.images.src)
    .pipe(imagemin(config.images.imagemin))
    .pipe(gulp.dest(config.images.dest))
    .pipe(browserSync.stream());
};

gulp.task('images', imagesTask);
module.exports = imagesTask;