const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('build', (cb) => {
  runSequence(
    ['clean'],
    ['copy', 'fonts', 'images'],
    ['sass', 'js', 'html', 'markdown'],
    'html-bundle',
    cb);
});
