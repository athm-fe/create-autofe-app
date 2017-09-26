'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('default', (cb) => {
  runSequence(
    ['clean'],
    ['copy', 'fonts', 'images'],
    ['sass', 'js', 'webpack', 'html', 'markdown'],
    ['watch'],
    cb);
});
