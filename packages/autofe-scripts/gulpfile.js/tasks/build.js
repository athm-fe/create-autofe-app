'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('build', (cb) => {
  runSequence(
    ['clean'],
    [/*'sass',*/ 'js', 'webpack', 'html', 'markdown'],
    [/*'copy',*/ /*'fonts',*/ 'svg', /*'images'*/],
    ['html-bundle'],
    cb);
});
