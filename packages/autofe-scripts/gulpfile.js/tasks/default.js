const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('default', (cb) => {
  runSequence(
    ['clean'],
    // ['fonts', 'iconFont', 'images', 'svgSprite'],
    ['copy', 'fonts', 'images'],
    ['sass', 'js', 'html', 'markdown'],
    ['watch'],
    cb);
});
