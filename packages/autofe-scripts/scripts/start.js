var gulp = require('gulp');
require('../gulpfile.js');
require('../gulpfile.js/log')(gulp);

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var args = process.argv.slice(2);

console.log('cwd:', process.cwd());
console.log('argv:', args);

gulp.start('default', function () {
  // do nothing...
});
