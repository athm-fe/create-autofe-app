'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('default', (cb) => {
  runSequence(
    ['clean'],
    [/*'sass',*/ 'js', 'webpack', 'html', 'markdown'],
    [/*'copy',*/ /*'fonts',*/ 'svg', /*'images'*/],
    ['watch'],
    ['browserSync'],
    cb);
});
