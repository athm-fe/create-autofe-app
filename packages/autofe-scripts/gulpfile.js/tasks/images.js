var gulp = require('gulp');
var config = require('../config');
var browserSync = require('../lib/browserSync');
var imagemin = require('gulp-imagemin');

var imagesTask = function () {
  return gulp.src(config.images.src)
    .pipe(imagemin(config.images.imagemin))
    .pipe(gulp.dest(config.images.dest))
    .pipe(browserSync.stream());
};

gulp.task('images', imagesTask);
module.exports = imagesTask;
