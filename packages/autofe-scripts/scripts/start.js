var gulp = require('gulp');
require('require-dir')('../tasks');

console.log('argv: ', process.argv);
console.log('cwd: ', process.cwd());

gulp.start('default', function () {
  // do nothing...
});
