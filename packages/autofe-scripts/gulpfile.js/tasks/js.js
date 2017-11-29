'use strict';

const gulp = require('gulp');
const config = require('../config');
const browserSync = require('../lib/browserSync');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const gutil = require('gulp-util');

const jsTask = function () {
  return gulp.src(config.js.src)
    .pipe(gulpif(process.env.NODE_ENV === 'production', uglify({
      output: {
        ascii_only: true,
      },
    })))
    .on('error', function(err) {
      var message = new gutil.PluginError('js', err).toString();
      process.stderr.write(`${message}\n`);
      process.exit(1);
    })
    .pipe(rename((path) => {
      path.basename = path.basename.replace(/\.old$/, '');
    }))
    .pipe(gulp.dest(config.js.dest))
    .on('end', browserSync.reload);
};

gulp.task('js', jsTask);
module.exports = jsTask;
