var gulp = require('gulp');
require('require-dir')('../tasks');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var args = process.argv.slice(2);

console.log('cwd:', process.cwd());
console.log('argv:', args);

gulp.start('build', function () {
  // do nothing...
});
