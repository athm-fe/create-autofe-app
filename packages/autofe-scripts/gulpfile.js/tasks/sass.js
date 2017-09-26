'use strict';

const gulp = require('gulp');
const config = require('../config');
const browserSync = require('../lib/browserSync');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const assets = require('postcss-assets');
const autoprefixer = require('autoprefixer');
const clean = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');

const sassTask = function () {
  return gulp.src(config.sass.src)
    .pipe(gulpif(process.env.NODE_ENV !== 'production', sourcemaps.init()))
    .pipe(sass(config.sass.option).on('error', sass.logError))
    .pipe(postcss([
      assets(config.postcssAssets.option),
      autoprefixer(config.autoprefixer.option),
    ]))
    .pipe(gulpif(process.env.NODE_ENV !== 'production', sourcemaps.write('.')))
    .pipe(gulpif(process.env.NODE_ENV === 'production', clean({ compatibility: 'ie7' })))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(browserSync.stream());
};

gulp.task('sass', sassTask);
module.exports = sassTask;
