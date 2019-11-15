'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('default', cb => {
  runSequence(['clean'], ['sprite'], ['copy', 'fonts', 'svg', 'images'], ['sass', 'js', 'webpack', 'html', 'markdown'], ['watch'], ['browserSync'], cb);
});
