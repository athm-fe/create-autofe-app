const config = require('../config/paths');
const gulp = require('gulp');
require('../gulpfile.js');
require('../gulpfile.js/log')(gulp);

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const args = process.argv.slice(2);

process.chdir(config.appDirectory);

console.log('cwd:', process.cwd());
console.log('argv:', args);

gulp.start('origJS', () => {
  // do nothing...
});
