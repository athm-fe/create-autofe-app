'use strict';

const gulp = require('gulp');
const config = require('../config');
const browserSync = require('../lib/browserSync');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const assets = require('postcss-assets');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');

const isProd = process.env.NODE_ENV === 'production';

const sassTask = function () {
  return gulp.src(config.sass.src)
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass({
      outputStyle: isProd ? 'compressed' : 'nested',
    }).on('error', sass.logError))
    .pipe(postcss([
      assets(config.postcssAssets.option),
      autoprefixer(config.autoprefixer.option),
    ]))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(browserSync.stream());
};

gulp.task('sass', sassTask);
module.exports = sassTask;
