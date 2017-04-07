var config = require('../config/paths');
var gulp = require('gulp');
require('../gulpfile.js');
require('../gulpfile.js/log')(gulp);

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var args = process.argv.slice(2);

process.chdir(config.appDirectory);

console.log('cwd:', process.cwd());
console.log('argv:', args);

gulp.start('build', function () {
  // do nothing...
});
