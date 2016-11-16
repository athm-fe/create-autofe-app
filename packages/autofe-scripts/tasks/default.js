const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('default', function (cb) {
  runSequence(
    ['clean'],
    // ['fonts', 'iconFont', 'images', 'svgSprite'],
    ['fonts', 'images'],
    ['sass', 'js', 'html', 'markdown'],
    ['watch'],
    cb);
});
