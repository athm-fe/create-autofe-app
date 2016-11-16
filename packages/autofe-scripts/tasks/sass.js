const gulp = require('gulp');
const config = require('../config/gulpConfig');
const browserSync = require('../config/browserSync');
const sass = require('gulp-sass');
const clean = require('gulp-clean-css');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');

const sassTask = function () {
  return gulp.src(config.sass.src)
    .pipe(sass(config.sass.option).on('error', sass.logError))
    // TODO gutil.env.env === 'prod'
    .pipe(gulpif(gutil.env.env === 'prod', clean({ compatibility: 'ie7' })))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(browserSync.stream());
};

gulp.task('sass', sassTask);
module.exports = sassTask;
