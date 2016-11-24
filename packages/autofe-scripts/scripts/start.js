var gulp = require('gulp');
require('../gulpfile.js');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var args = process.argv.slice(2);

console.log('cwd:', process.cwd());
console.log('argv:', args);

gulp.start('default', function () {
  // do nothing...
});
