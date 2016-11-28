var gulp = require('gulp');
var config = require('../config');
var browserSync = require('../lib/browserSync');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var assets  = require('postcss-assets');
var autoprefixer = require('autoprefixer');
var clean = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');

var sassTask = function () {
  return gulp.src(config.sass.src)
    .pipe(gulpif(process.env.NODE_ENV !== 'production', sourcemaps.init()))
    .pipe(sass(config.sass.option).on('error', sass.logError))
    .pipe(postcss([
      assets(config.postcssAssets.option),
      autoprefixer(config.autoprefixer.option)
    ]))
    .pipe(gulpif(process.env.NODE_ENV !== 'production', sourcemaps.write('./maps')))
    .pipe(gulpif(process.env.NODE_ENV === 'production', clean({ compatibility: 'ie7' })))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(browserSync.stream());
};

gulp.task('sass', sassTask);
module.exports = sassTask;
