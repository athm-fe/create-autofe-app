'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('default', (cb) => {
  runSequence(
    ['clean'],
    ['js', 'webpack', 'html', 'markdown'],
    ['svg',],
    ['watch'],
    ['browserSync'],
    cb);
});
