const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('build', function (cb) {
  runSequence(
    ['clean'],
    ['fonts', 'images'],
    ['sass', 'js', 'html', 'markdown'],
    'html-bundle',
    'rev-assets',
    'rev-update-references',
    cb);
});