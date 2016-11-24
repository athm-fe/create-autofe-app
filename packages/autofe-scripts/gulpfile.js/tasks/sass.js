var gulp = require('gulp');
var config = require('../config');
var browserSync = require('../lib/browserSync');
var sass = require('gulp-sass');
var clean = require('gulp-clean-css');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');

var sassTask = function () {
  return gulp.src(config.sass.src)
    .pipe(sass(config.sass.option).on('error', sass.logError))
    .pipe(gulpif(process.env.NODE_ENV === 'production', clean({ compatibility: 'ie7' })))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(browserSync.stream());
};

gulp.task('sass', sassTask);
module.exports = sassTask;
