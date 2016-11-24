var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', function (cb) {
  runSequence(
    ['clean'],
    // ['fonts', 'iconFont', 'images', 'svgSprite'],
    ['fonts', 'images'],
    ['sass', 'js', 'html', 'markdown'],
    ['watch'],
    cb);
});
