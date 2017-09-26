'use strict';

const gulp = require('gulp');
const paths = require('../../config/paths');
require('../../gulpfile.js');
require('../../gulpfile.js/log');

module.exports = function runner(command) {
  const args = process.argv.slice(2);

  process.chdir(paths.appDirectory);

  console.log('cwd:', process.cwd());
  console.log('argv:', args);

  gulp.start(command, () => {
    // do nothing...
  });
};
