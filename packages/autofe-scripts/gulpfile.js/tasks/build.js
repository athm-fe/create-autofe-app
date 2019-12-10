'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('build', (cb) => {
  runSequence(
    ['clean'],
    ['js', 'webpack', 'html', 'markdown'],
    ['svg',],
    ['html-bundle'],
    cb);
});
