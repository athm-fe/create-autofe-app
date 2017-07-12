const gulp = require('gulp');
const paths = require('../config/paths');
require('../gulpfile.js');
require('../gulpfile.js/log')(gulp);

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const args = process.argv.slice(2);

process.chdir(paths.appDirectory);

console.log('cwd:', process.cwd());
console.log('argv:', args);

gulp.start('build', () => {
  // do nothing...
});
